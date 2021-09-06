import NextLink from 'next/link';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import ProfileImageAvatar from './profile-image-avatar';
import NormalCaseButton from '../NormalCaseButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { createRef, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { post as postData } from '../../actions/post/index';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CloseIcon from '@material-ui/icons/Close';
import { singlepostDataSelector } from '../../selectors/postSelector';
import { repliesDataSelector } from '../../selectors/postSelector';
import { Button, IconButton } from '@material-ui/core';
import SinglePostMedia from './SinglePostMedia';
import styles from './profile.module.css';
import RepliesData from './RepliesData';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import usePostPurchaseModel from './PostPurchaseModel';
import { useMediaQuery } from 'react-responsive';
import { getCommentsDataSelector } from '../../selectors/postSelector';
import TipModal from './TipModal';
import { fetchingSelector } from '../../selectors/postSelector';
import LoadingOverlay from 'react-loading-overlay';
import BounceLoader from 'react-spinners/BounceLoader';
import useEmojiPicker from '../useEmojiPicker';
import { currentUserSelector } from '../../selectors/authSelector';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 0,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 2, 0.9)',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
  },
  profileModelStyle: {
    width: '40vw',

    ['@media and screen and (minWidth: 600px)']: {
      maxWidth: '100%',
    },
  },
  modelStyle: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const CommentModel = ({
  post,
  profileData,
  altHeader,
  singlePost,
  setOpen,
  open,
  currentUser,
  forCommentId,
  openReply,
  checkRefs,
  setCheckRefs,
}) => {
  const { PostPurchaseModel, handleOpenModel, setPurchased } =
    usePostPurchaseModel();
  const classes = useStyles();
  const [commentText, setCommentText] = useState('');
  const [commentId, setCommentId] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [replyPostId, setReplyPostId] = useState(0);
  const [isReplyField, setisReplyField] = useState({ id: '', check: false });
  const [issubReplyField, setissubReplyField] = useState({
    id: '',
    check: false,
  });
  const sPost = useSelector(singlepostDataSelector);
  const replyData = useSelector(repliesDataSelector);
  const paginatedComments = useSelector(getCommentsDataSelector);
  var forComments = paginatedComments?.results;
  const [showReply, setShowReply] = useState({ idx: '', replyCheck: false });
  var [commentsData, setCommentsData] = useState([]);
  const dispatch = useDispatch();
  const isMobile = useMediaQuery({ query: '(max-width: 760px)' });
  const [pageNumber, setPageNumber] = useState(2);
  const fetchData = useSelector(fetchingSelector);
  const { closeEmojiPicker, EmojiPicker, emojiPickerRef } = useEmojiPicker();
  const [commLength, setcommLength] = useState(10);
  const currUser = useSelector(currentUserSelector);
  const [closeCheck, setCloseClick] = useState(false);

  const addEmoji = e => {
    let sym = e.unified.split('-');
    let codesArray = [];
    sym.forEach(el => codesArray.push('0x' + el));
    let emoji = String.fromCodePoint(...codesArray);
    setCommentText(commentText + emoji);
  };

  // function refreshPage() {
  //   window.location.reload(false);
  // }

  useEffect(() => {
    setCommentsData(commentsData => commentsData?.concat(forComments));
    return () => {
      setCommentsData([]);
    };
  }, [forComments]);

  useEffect(() => {
    if (forCommentId) {
      handleReplyField(forCommentId);
      //
    }
    //
  }, [forCommentId]);

  const handleModelCommentLike = cId => {
    //
    singlePost.comments &&
      singlePost.comments.map(comm =>
        comm.likes && comm.likes.length === 0 && comm.id === cId
          ? dispatch(
              postData.saveCommentLike({
                id: comm.id,
                callback: () => {
                  dispatch(postData.requestOne(sPost.id));
                },
              })
            )
          : comm.id === cId &&
            dispatch(
              postData.delCommentLike({
                id: comm.id,
                callback: () => {

                  dispatch(postData.requestOne(sPost.id));
                },
              })
            )
      );
  };

  const handleClose = () => {
    setCloseClick(true);
    setOpen(false);
    setisReplyField(false);
    setissubReplyField(false);
    // refreshPage();
  };

  const handleReplyField = id => {
    setCommentId(id);
    setCheckRefs && setCheckRefs(true);
    //
    //

    setisReplyField({ check: true, id });
    setissubReplyField({ check: false });
  };

  const handleAddComment = event => {
    event.preventDefault();
    closeEmojiPicker();
    if (!commentText || commentText.trim() === '') {
      return;
    }
    dispatch(
      postData.saveComment({
        id: singlePost.id,
        commentText: {
          comment: commentText,
          isReply: false,
        },
        callback: () => {
          setCommentText('');
          dispatch(postData.requestOne(sPost.id));
        },
      })
    );
  };

  const handlleGetComments = () => {
    setPageNumber(pageNumber + 1);
    setcommLength(commLength + 10);
    dispatch(
      postData.getCommentsVal({
        id: singlePost?.id,
        page: pageNumber,
        limit: 10,
      })
    );
  };

  const handleLike = () => {
    singlePost.likes && singlePost.likes.length > 0
      ? dispatch(
          postData.deleteLike({
            id: singlePost.id,
            callback: () => {

              dispatch(postData.requestOne(sPost.id));
            },
          })
        )
      : dispatch(
          postData.saveLike({
            id: singlePost.id,
            callback: () => {
              dispatch(postData.requestOne(sPost.id));
            },
          })
        );
  };

  const nFormatter = n => {
    if (n < 1e3) return n;
    if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + 'K';
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + 'M';
    if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + 'B';
    if (n >= 1e12) return +(n / 1e12).toFixed(1) + 'T';
  };

  return (
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      className={classes.modal}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      open={open}
    >
      <Fade in={open}>
        <LoadingOverlay active={fetchData} spinner={<BounceLoader />}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#101010',
            }}
          >
            <div className={styles.hideOnMobile}>
              <SinglePostMedia
                media={singlePost?.media}
                mediaCount={singlePost?.mediaCount}
                singlePost={singlePost}
              />
            </div>

            <div
              className={styles.profileModelStyle}
              style={{ backgroundColor: '#101010' }}
            >
              {altHeader ? (
                <CardHeader
                  action={
                    <IconButton aria-label='settings'>
                      <CloseIcon onClick={handleClose} />
                    </IconButton>
                  }
                  subheader={moment(singlePost.createdAt).fromNow()}
                />
              ) : (
                !isMobile && (
                  <CardHeader
                    avatar={<ProfileImageAvatar user={profileData} />}
                    action={
                      <IconButton aria-label='settings'>
                        {!isMobile && <CloseIcon onClick={handleClose} />}
                      </IconButton>
                    }
                    title={
                      <>
                        <Box clone mr={1}>
                          <Typography variant='body2' component='span'>
                            <NextLink
                              href={`/x/${singlePost?.user?.username}`}
                              passHref
                            >
                              <Link>
                                {singlePost?.user?.fullName || '(no name)'}
                              </Link>
                            </NextLink>
                          </Typography>
                        </Box>
                        <Typography variant='caption' color='textSecondary'>
                          {moment(
                            singlePost &&
                              singlePost.createdAt &&
                              singlePost.createdAt
                          ).fromNow()}
                        </Typography>
                      </>
                    }
                    subheader={
                      <Typography variant='caption' color='textSecondary'>
                        @{singlePost?.user?.username}
                      </Typography>
                    }
                  />
                )
              )}
              {isMobile && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginLeft: '25px',
                    marginRight: '40vw',
                    marginTop: '20px',
                  }}
                >
                  <img src='/backBtn.svg' alt='back' onClick={handleClose} />
                  <p
                    style={{
                      fontWeight: '500',
                      fontSize: '15px',
                      fontFamily: 'Poppins',
                    }}
                  >
                    Comments
                  </p>
                </div>
              )}
              {singlePost &&
                singlePost.postText &&
                (isMobile ? (
                  <div
                    style={{
                      display: 'flex',
                      marginLeft: '18px',
                      marginTop: '10px',
                    }}
                  >
                    <ProfileImageAvatar user={singlePost?.user} />
                    <CardContent>
                      <Typography
                        variant='body2'
                        color='textSecondary'
                        component='p'
                        style={{
                          whiteSpace: 'normal',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',

                          color: 'white',
                          fontFamily: 'Poppins',
                          fontSize: '16px',
                          marginTop: '-10px',
                        }}
                      >
                        {singlePost.postText.slice(0, 90)}
                      </Typography>
                    </CardContent>
                  </div>
                ) : (
                  <CardContent>
                    <Typography
                      variant='body2'
                      color='textSecondary'
                      component='p'
                      style={{
                        whiteSpace: 'normal',
                        overflow: 'hidden',
                        textOverflow: 'clip',
                        color: 'white',
                        fontFamily: 'Poppins',
                        fontSize: '16px',
                      }}
                    >
                      {singlePost.postText.slice(0, 140)}
                    </Typography>
                  </CardContent>
                ))}
              {!isMobile && (
                <div
                  style={{
                    marginLeft: '10px',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <Box>
                      {singlePost &&
                      singlePost.likes &&
                      singlePost.likes.length === 0 ? (
                        <NormalCaseButton
                          aria-label='add to favorites'
                          startIcon={
                            <img src='/emptyHeart.png' alt='unliked' />
                          }
                          onClick={handleLike}
                        >
                          {nFormatter(singlePost?.totalLikes)}{' '}
                          <span
                            className={styles.hideOnMobile}
                            style={{ marginLeft: '5px' }}
                          >
                            Likes
                          </span>
                        </NormalCaseButton>
                      ) : (
                        <NormalCaseButton
                          aria-label='add to favorites'
                          startIcon={<img src='/filled.png' alt='liked' />}
                          onClick={handleLike}
                        >
                          {nFormatter(singlePost?.totalLikes)}{' '}
                          <span
                            className={styles.hideOnMobile}
                            style={{ marginLeft: '5px' }}
                          >
                            Likes
                          </span>
                        </NormalCaseButton>
                      )}

                      <NormalCaseButton
                        aria-label='share'
                        startIcon={<img src='/comment.png' alt='comment' />}
                      >
                        {nFormatter(singlePost?.totalComments)}{' '}
                        <span
                          className={styles.hideOnMobile}
                          style={{ marginLeft: '5px' }}
                        >
                          {' '}
                          Comments
                        </span>
                      </NormalCaseButton>
                      {
                        <span aria-label='tip'>
                          {sPost?.media.length === 0 ? (
                            <MonetizationOnOutlinedIcon
                              style={{ marginRight: '5px', marginLeft: '5px' }}
                            />
                          ) : (
                            <TipModal
                              profileImage={post?.user?.profileImage}
                              name={post?.user?.fullName}
                              onConfirm={(amount, callback) =>
                                dispatch(
                                  postData.addTip({
                                    saveData: {
                                      itemTipped: post.id,
                                      itemTippedType: 'post',
                                      amount,
                                    },

                                    callback: () => {
                                      callback && callback();
                                    },
                                  })
                                )
                              }
                            >
                              <NormalCaseButton
                                aria-label='Buy Post'
                                startIcon={<MonetizationOnOutlinedIcon />}
                              >
                                Tip
                              </NormalCaseButton>
                            </TipModal>
                          )}
                        </span>
                      }
                    </Box>
                  </div>
                  <div style={{ marginRight: '6px' }}>
                    {singlePost?.media.length === 0 && (
                      <NormalCaseButton
                        aria-label='Buy Post'
                        startIcon={<LocalMallIcon />}
                        onClick={handleOpenModel}
                      >
                        Buy Post
                      </NormalCaseButton>
                    )}
                  </div>
                  <PostPurchaseModel
                    handlePurchase={() => {
                      dispatch(
                        postData.purchasePost({
                          id: post.id,
                          callback: () => {
                            setPurchased(true);
                          },
                        })
                      );
                    }}
                    price={post?.price}
                    user={post?.user}
                  />
                </div>
              )}
              <div>
                <img src='/border.png' alt='bar' style={{ width: '100%' }} />

                {singlePost?.totalComments < 10 ||
                commLength >= singlePost?.totalComments ? (
                  ''
                ) : (
                  <p
                    style={{
                      fontWeight: '500',
                      fontSize: '14px',
                      marginLeft: '15px',
                      cursor: 'pointer',
                    }}
                    onClick={handlleGetComments}
                  >
                    View previous comments
                  </p>
                )}
              </div>

              <div
                // className={styles.commentBox}
                style={{
                  overflowY: 'scroll',
                  overflowX: 'hidden',
                  height: isMobile ? '65vh' : '280px',
                  marginLeft: '15px',
                }}
              >
                {singlePost?.comments?.map(
                  (comm, index) =>
                    comm?.parentCommentId === null && (
                      <div>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginTop:
                              singlePost?.totalComments < 10 ? '15px' : '',
                          }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                            }}
                          >
                            <div style={{ display: 'flex' }}>
                              <NextLink
                                href={`/x/${comm?.user?.username}`}
                                passHref
                              >
                                <Link>
                                  <ProfileImageAvatar user={comm?.user} />
                                </Link>
                              </NextLink>

                              <NextLink
                                href={`/x/${comm?.user?.username}`}
                                passHref
                              >
                                <Link>
                                  <p
                                    style={{
                                      marginTop: '7px',
                                      marginLeft: '10px',
                                      fontWeight: 'bold',
                                      cursor: 'pointer',
                                    }}
                                    className={styles.userNameMobile}
                                  >
                                    {comm?.user?.fullName}
                                  </p>
                                </Link>
                              </NextLink>
                            </div>

                            <p
                              style={{
                                cursor: 'pointer',
                                marginLeft: '10px',
                                marginTop: '5px',
                                whiteSpace: 'normal',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                marginRight: '15px',
                                color: '#ACACAC',
                                fontWeight: comm.id === commentId && 'bold',
                              }}
                            >
                              {comm.comment.slice(0, 511)}
                            </p>
                          </div>
                          <div style={{ display: 'flex', marginRight: '14px' }}>
                            <div key={index}>
                              <img
                                src='/comment.png'
                                alt='reply button'
                                style={{
                                  width: '20px',
                                  height: '20px',
                                  marginRight: '9px',
                                  cursor: 'pointer',
                                }}
                                className={styles.commMobile}
                                id={comm.id}
                                onClick={() => handleReplyField(comm.id)}
                              />
                            </div>

                            {comm.likes && comm.likes.length === 0 ? (
                              <img
                                src='/emptyHeart.png'
                                alt='unliked'
                                style={{
                                  width: '20px',
                                  height: '20px',
                                  cursor: 'pointer',
                                }}
                                onClick={() => handleModelCommentLike(comm.id)}
                              />
                            ) : (
                              <img
                                src='/filled.png'
                                alt='unliked'
                                style={{
                                  width: '20px',
                                  height: '20px',
                                  cursor: 'pointer',
                                }}
                                onClick={() => handleModelCommentLike(comm.id)}
                              />
                            )}
                          </div>
                        </div>

                        <div>
                          <div
                            style={{
                              marginLeft: '50px',
                              marginTop: '-10px',
                              marginBottom: '0px',
                              cursor: 'pointer',
                              fontSize: '11px',
                            }}
                          >
                            <RepliesData
                              comm={comm}
                              post={post}
                              singlePost={singlePost}
                              currUser={currUser}
                              isReplyField={isReplyField}
                              setisReplyField={setisReplyField}
                              issubReplyField={issubReplyField}
                              setissubReplyField={setissubReplyField}
                              commentId={commentId}
                              setCommentId={setCommentId}
                              forCommentId={forCommentId}
                              openReply={openReply}
                              checkRefs={checkRefs}
                              closeCheck={closeCheck}
                            />
                          </div>
                        </div>
                      </div>
                    )
                )}

                {singlePost?.totalComments > 10 &&
                  commentsData?.map(
                    (comm, index) =>
                      comm?.parentCommentId === null && (
                        <div>
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                            }}
                          >
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                              }}
                            >
                              <div style={{ display: 'flex' }}>
                                <NextLink
                                  href={`/x/${comm?.user?.username}`}
                                  passHref
                                >
                                  <Link>
                                    <ProfileImageAvatar user={comm?.user} />
                                  </Link>
                                </NextLink>

                                <NextLink
                                  href={`/x/${comm?.user?.username}`}
                                  passHref
                                >
                                  <Link>
                                    <p
                                      style={{
                                        marginTop: '7px',
                                        marginLeft: '10px',
                                        fontWeight: 'bold',
                                        cursor: 'pointer',
                                      }}
                                      className={styles.userNameMobile}
                                    >
                                      {comm?.user?.fullName}
                                    </p>
                                  </Link>
                                </NextLink>
                              </div>

                              <p
                                style={{
                                  cursor: 'pointer',
                                  marginLeft: '10px',
                                  marginTop: '5px',
                                  whiteSpace: 'normal',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  marginRight: '15px',
                                  color: '#ACACAC',
                                  fontWeight: comm.id === commentId && 'bold',
                                }}
                              >
                                {comm.comment.slice(0, 100)}
                              </p>
                            </div>
                            <div
                              style={{ display: 'flex', marginRight: '14px' }}
                            >
                              <div key={index}>
                                <img
                                  src='/comment.png'
                                  alt='reply button'
                                  style={{
                                    width: '20px',
                                    height: '20px',
                                    marginRight: '9px',
                                    cursor: 'pointer',
                                  }}
                                  className={styles.commMobile}
                                  id={comm.id}
                                  onClick={() => handleReplyField(comm.id)}
                                />
                              </div>

                              {comm.likes && comm.likes.length === 0 ? (
                                <img
                                  src='/emptyHeart.png'
                                  alt='unliked'
                                  style={{
                                    width: '20px',
                                    height: '20px',
                                    cursor: 'pointer',
                                  }}
                                  onClick={() =>
                                    handleModelCommentLike(comm.id)
                                  }
                                />
                              ) : (
                                <img
                                  src='/filled.png'
                                  alt='unliked'
                                  style={{
                                    width: '20px',
                                    height: '20px',
                                    cursor: 'pointer',
                                  }}
                                  onClick={() =>
                                    handleModelCommentLike(comm.id)
                                  }
                                />
                              )}
                            </div>
                          </div>

                          <div>
                            <div
                              style={{
                                marginLeft: '50px',
                                marginTop: '-10px',
                                marginBottom: '0px',
                                cursor: 'pointer',
                                fontSize: '11px',
                              }}
                            >
                              <RepliesData
                                comm={comm}
                                post={post}
                                singlePost={singlePost}
                                currUser={currUser}
                                isReplyField={isReplyField}
                                setisReplyField={setisReplyField}
                                issubReplyField={issubReplyField}
                                setissubReplyField={setissubReplyField}
                                commentId={commentId}
                                setCommentId={setCommentId}
                                forCommentId={forCommentId}
                                openReply={openReply}
                                checkRefs={checkRefs}
                                closeCheck={closeCheck}
                              />
                            </div>
                          </div>
                        </div>
                      )
                  )}
              </div>

              <form onSubmit={handleAddComment}>
                <Box style={{ borderTop: '1px solid #444444' }}>
                  <OutlinedInput
                    value={commentText}
                    onChange={e => setCommentText(e.target.value)}
                    name='commentText'
                    fullWidth
                    multiline
                    onKeyDown={e => {
                      if (e.keyCode === 13) {
                        if (!event.shiftKey) {
                          handleAddComment(e);
                        }
                      }
                    }}
                    placeholder='Add Comment'
                    startAdornment={
                      <ProfileImageAvatar
                        user={currentUser}
                        style={{ marginLeft: '2px', marginRight: '5px' }}
                      />
                    }
                    endAdornment={
                      <>
                        <span ref={emojiPickerRef}>
                          <EmojiPicker
                            onSelect={addEmoji}
                            popperProps={{ style: { zIndex: 1111111 } }}
                          />
                        </span>

                        <Button
                          type='submit'
                          style={{ backgroundColor: '#111111', border: 'none' }}
                        >
                          <img src='/send.png' alt='send button' />
                        </Button>
                      </>
                    }
                  />
                </Box>
              </form>
            </div>
          </div>
        </LoadingOverlay>
      </Fade>
    </Modal>
  );
};

export default CommentModel;
