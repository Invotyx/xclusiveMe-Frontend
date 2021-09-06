import NextLink from 'next/link';
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import ProfileImageAvatar from '../components/profile/profile-image-avatar';
import NormalCaseButton from '../components/NormalCaseButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { createRef, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { post as postData } from '../actions/post';
import CloseIcon from '@material-ui/icons/Close';
import { singlepostDataSelector } from '../selectors/postSelector';
import { repliesDataSelector } from '../selectors/postSelector';
import { Button } from '@material-ui/core';
import SinglePostMedia from '../components/profile/SinglePostMedia';
import styles from '../components/profile/profile.module.css';
import RepliesData from '../components/profile/RepliesData';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import { useMediaQuery } from 'react-responsive';
import { getCommentsDataSelector } from '../selectors/postSelector';
import useTipModal from '../components/profile/TipModal';
import { fetchingSelector } from '../selectors/postSelector';
import LoadingOverlay from 'react-loading-overlay';
import BounceLoader from 'react-spinners/BounceLoader';
import useEmojiPicker from '../components/useEmojiPicker';
import { useRouter } from 'next/router';
import { currentUserSelector } from '../selectors/authSelector';
import usePostPurchaseModel from '../components/profile/PostPurchaseModel';

const useStyles = makeStyles(theme => ({
  root: {},
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

const SinglePost = ({
  post,
  profileData,
  altHeader,

  setOpen,
  open,
  replyCount,
  currentUser,

  openReply,
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
  const [isCommentField, setIsCommentField] = useState(false);
  const sPost = useSelector(singlepostDataSelector);
  const replyData = useSelector(repliesDataSelector);
  const paginatedComments = useSelector(getCommentsDataSelector);
  var forComments = paginatedComments?.results;
  const [showReply, setShowReply] = useState({ idx: '', replyCheck: false });
  var [commentsData, setCommentsData] = useState([]);
  const dispatch = useDispatch();
  const [openModel, setOpenModel] = useState(false);
  const isMobile = useMediaQuery({ query: '(max-width: 760px)' });
  const middleDesktop = useMediaQuery({ query: '(max-width: 1024px)' });
  const higherDesktop = useMediaQuery({ query: '(max-width: 1440px)' });
  const [pageNumber, setPageNumber] = useState(2);
  const [openTip, setopenTip] = useState(false);
  const fetchData = useSelector(fetchingSelector);
  const [commLength, setcommLength] = useState(10);
  const { closeEmojiPicker, EmojiPicker, emojiPickerRef } = useEmojiPicker();
  const router = useRouter();
  const currUser = useSelector(currentUserSelector);
  const { postId, forCommentId } = router.query;
  const [checkRefs, setCheckRefs] = useState(false);

  const addEmoji = e => {
    let sym = e.unified.split('-');
    let codesArray = [];
    sym.forEach(el => codesArray.push('0x' + el));
    let emoji = String.fromCodePoint(...codesArray);
    setCommentText(commentText + emoji);
  };

  useEffect(() => {
    setCommentsData(commentsData => commentsData?.concat(forComments));
    return () => {
      setCommentsData([]);
    };
  }, [forComments]);

  useEffect(() => {
    postId && dispatch(postData.requestOne(postId));
  }, [postId]);

  useEffect(() => {
    postId && forCommentId && dispatch(postData.requestOne(postId));
    forCommentId && handleReplyField(forCommentId);
  }, [postId, forCommentId]);

  const handleModelCommentLike = cId => {
    //
    sPost.comments &&
      sPost.comments.map(comm =>
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
    router.push('/explore');
    setisReplyField(false);
    setissubReplyField(false);
  };

  const handleReplyField = id => {
    setCommentId(id);
    setCheckRefs(true);

    //
    //

    setisReplyField({ check: true, id });
    setissubReplyField({ check: false });
    //
  };

  const handleAddComment = event => {
    event.preventDefault();
    closeEmojiPicker();
    if (!commentText || commentText.trim() === '') {
      return;
    }
    dispatch(
      postData.saveComment({
        id: sPost.id,
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
        id: sPost?.id,
        page: pageNumber,
        limit: 10,
      })
    );
  };

  const handleLike = () => {
    sPost.likes && sPost.likes.length > 0
      ? dispatch(
          postData.deleteLike({
            id: sPost.id,
            callback: () => {
              dispatch(postData.requestOne(sPost.id));
            },
          })
        )
      : dispatch(
          postData.saveLike({
            id: sPost.id,
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

  const { TipModal } = useTipModal({
    onConfirm: (amount, callback) =>
      dispatch(
        postData.addTip({
          saveData: {
            itemTipped: sPost.id,
            itemTippedType: 'post',
            amount,
          },

          callback: () => {
            callback && callback();
          },
        })
      ),
  });

  return (
    <div
      className={classes.modal}
      closeAfterTransition
      style={{ marginTop: middleDesktop ? '20%' : higherDesktop ? '5%' : '3%' }}
    >
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
              media={sPost?.media}
              mediaCount={sPost?.mediaCount}
              sPost={sPost}
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
                subheader={moment(sPost.createdAt).fromNow()}
              />
            ) : (
              !isMobile && (
                <CardHeader
                  avatar={<ProfileImageAvatar user={sPost?.user} />}
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
                            href={`/x/${sPost?.user?.username}`}
                            passHref
                          >
                            <Link>{sPost?.user?.fullName || '(no name)'}</Link>
                          </NextLink>
                        </Typography>
                      </Box>
                      <Typography variant='caption' color='textSecondary'>
                        {moment(
                          sPost && sPost.createdAt && sPost.createdAt
                        ).fromNow()}
                      </Typography>
                    </>
                  }
                  subheader={
                    <Typography variant='caption' color='textSecondary'>
                      @{sPost?.user?.username}
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
            {sPost &&
              sPost.postText &&
              (isMobile ? (
                <div
                  style={{
                    display: 'flex',
                    marginLeft: '18px',
                    marginTop: '10px',
                  }}
                >
                  <ProfileImageAvatar user={sPost?.user} />
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
                      {sPost.postText.slice(0, 90)}
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
                    {sPost.postText.slice(0, 140)}
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
                    {sPost && sPost.likes && sPost.likes.length === 0 ? (
                      <NormalCaseButton
                        aria-label='add to favorites'
                        startIcon={<img src='/emptyHeart.png' alt='unliked' />}
                        onClick={handleLike}
                      >
                        {nFormatter(sPost?.totalLikes)}{' '}
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
                        {nFormatter(sPost?.totalLikes)}{' '}
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
                      {nFormatter(sPost?.totalComments)}{' '}
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
                          <>
                            <MonetizationOnOutlinedIcon
                              style={{ marginRight: '5px', marginLeft: '5px' }}
                            />
                            <span
                              className={styles.hideOnMobile}
                              style={{ marginLeft: '0px' }}
                            >
                              Tip
                            </span>
                          </>
                        ) : (
                          <>
                            <TipModal
                              profileImage={sPost?.user?.profileImage}
                              name={sPost?.user?.fullName}
                            >
                              <NormalCaseButton
                                aria-label='Buy Post'
                                startIcon={<MonetizationOnOutlinedIcon />}
                              >
                                Tip
                              </NormalCaseButton>
                            </TipModal>
                          </>
                        )}
                      </span>
                    }
                  </Box>
                </div>
                <div style={{ marginRight: '6px' }}>
                  {sPost?.media.length === 0 && (
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

              {sPost?.totalComments < 10 ||
              commLength >= sPost?.totalComments ? (
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

            {/* <div
              style={{
                marginLeft: '10px',
                marginBottom: '5px',
                cursor: 'pointer',
              }}
              onClick={increasePage}
            >
              View more comments
            </div> */}

            <div
              // className={styles.commentBox}
              style={{
                overflowY: 'scroll',
                overflowX: 'hidden',
                height: isMobile ? '65vh' : '280px',
                marginLeft: '15px',
              }}
            >
              {sPost?.comments?.map(
                (comm, index) =>
                  comm?.parentCommentId === null && (
                    <div key={`abcdef${index}`}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginTop: sPost?.totalComments < 10 ? '15px' : '',
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
                          {/* <ChatBubbleOutlineIcon
                              style={{ marginRight: '9px' }}
                              id={comm.id}
                              fontSize='small'
                              onClick={() => handleReplyField(comm.id)}
                            /> */}

                          <div
                            key={index}
                            // onClick={() =>
                            //   handleFocusReply(replyInput.current[index])
                            // }
                          >
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
                            // <FavoriteIcon
                            //   fontSize='small'
                            //   onClick={() => handleModelCommentLike(comm.id)}
                            // />
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
                            // <FavoriteIcon
                            //   fontSize='small'
                            //   style={{ color: 'red' }}
                            //   onClick={() => handleModelCommentLike(comm.id)}
                            // />
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
                            singlePost={sPost}
                            currentUser={currentUser}
                            isReplyField={isReplyField}
                            setisReplyField={setisReplyField}
                            issubReplyField={issubReplyField}
                            setissubReplyField={setissubReplyField}
                            commentId={commentId}
                            setCommentId={setCommentId}
                            currUser={currUser}
                            checkRefs={checkRefs}
                            setCheckRefs={setCheckRefs}
                          />

                          {/* {comm.totalReplies > 0  ? (
                              <ViewReplies />
                            ) : (
                              ' '
                            )} */}
                        </div>
                      </div>
                    </div>
                  )
              )}

              {sPost?.totalComments > 10 &&
                commentsData?.map(
                  (comm, index) =>
                    comm?.parentCommentId === null && (
                      <div key={`abcdef${index}`}>
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
                          <div style={{ display: 'flex', marginRight: '14px' }}>
                            {/* <ChatBubbleOutlineIcon
                              style={{ marginRight: '9px' }}
                              id={comm.id}
                              fontSize='small'
                              onClick={() => handleReplyField(comm.id)}
                            /> */}

                            <div
                              key={index}
                              // onClick={() =>
                              //   handleFocusReply(replyInput.current[index])
                              // }
                            >
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
                              // <FavoriteIcon
                              //   fontSize='small'
                              //   onClick={() => handleModelCommentLike(comm.id)}
                              // />
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
                              // <FavoriteIcon
                              //   fontSize='small'
                              //   style={{ color: 'red' }}
                              //   onClick={() => handleModelCommentLike(comm.id)}
                              // />
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
                              singlePost={sPost}
                              currentUser={currentUser}
                              isReplyField={isReplyField}
                              setisReplyField={setisReplyField}
                              issubReplyField={issubReplyField}
                              setissubReplyField={setissubReplyField}
                              commentId={commentId}
                              setCommentId={setCommentId}
                              currUser={currUser}
                              checkRefs={checkRefs}
                              setCheckRefs={setCheckRefs}
                            />

                            {/* {comm.totalReplies > 0  ? (
                              <ViewReplies />
                            ) : (
                              ' '
                            )} */}
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
                      user={currUser}
                      style={{ marginLeft: '2px', marginRight: '5px' }}
                    />
                  }
                  endAdornment={
                    <>
                      <span ref={emojiPickerRef}>
                        <EmojiPicker onSelect={addEmoji} />
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
    </div>
  );
};

export default SinglePost;
