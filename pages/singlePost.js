import NextLink from 'next/link';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import ProfileImageAvatar from '../components/profile/profile-image-avatar';
import NormalCaseButton from '../components/NormalCaseButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { post as postData } from '../actions/post';
import CloseIcon from '@material-ui/icons/Close';
import { singlepostDataSelector } from '../selectors/postSelector';
import { Button } from '@material-ui/core';
import SinglePostMedia from '../components/profile/SinglePostMedia';
import styles from '../components/profile/profile.module.css';
import RepliesData from '../components/profile/RepliesData';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { getCommentsDataSelector } from '../selectors/postSelector';
import TipModal from '../components/profile/TipModal';
import useEmojiPicker from '../components/useEmojiPicker';
import { useRouter } from 'next/router';
import { currentUserSelector } from '../selectors/authSelector';
import usePostPurchaseModal from '../components/profile/PostPurchaseModel';
import { nFormatter } from '../services/nFormatter';

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
  profileModalStyle: {
    width: '40vw',

    ['@media and screen and (minWidth: 600px)']: {
      maxWidth: '100%',
    },
  },
}));

const SinglePost = ({ post, altHeader, currentUser }) => {
  const { PostPurchaseModal, openPurchaseModal, setPurchased } =
    usePostPurchaseModal();
  const classes = useStyles();
  const [commentText, setCommentText] = useState('');
  const [commentId, setCommentId] = useState(null);
  const [isReplyField, setisReplyField] = useState({ id: '', check: false });
  const [issubReplyField, setissubReplyField] = useState({
    id: '',
    check: false,
  });
  const singlePost = useSelector(singlepostDataSelector);
  const paginatedComments = useSelector(getCommentsDataSelector);
  var forComments = paginatedComments?.results;
  var [commentsData, setCommentsData] = useState([]);
  const dispatch = useDispatch();
  const isMobile = useMediaQuery('(max-width: 760px)');
  const middleDesktop = useMediaQuery('(max-width: 1024px)');
  const higherDesktop = useMediaQuery('(max-width: 1440px)');
  const [pageNumber, setPageNumber] = useState(2);
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

  const handleModalCommentLike = cId => {
    //
    singlePost.comments &&
      singlePost.comments.map(comm =>
        comm.likes && comm.likes.length === 0 && comm.id === cId
          ? dispatch(
              postData.saveCommentLike({
                id: comm.id,
                callback: () => {
                  dispatch(postData.requestOne(singlePost.id));
                },
              })
            )
          : comm.id === cId &&
            dispatch(
              postData.delCommentLike({
                id: comm.id,
                callback: () => {
                  dispatch(postData.requestOne(singlePost.id));
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
        id: singlePost.id,
        commentText: {
          comment: commentText,
          isReply: false,
        },
        callback: () => {
          setCommentText('');
          dispatch(postData.requestOne(singlePost.id));
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
              dispatch(postData.requestOne(singlePost.id));
            },
          })
        )
      : dispatch(
          postData.saveLike({
            id: singlePost.id,
            callback: () => {
              dispatch(postData.requestOne(singlePost.id));
            },
          })
        );
  };

  return (
    <div
      className={classes.modal}
      style={{ marginTop: middleDesktop ? '20%' : higherDesktop ? '5%' : '3%' }}
    >
      <>
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
            className={styles.profileModalStyle}
            style={{ backgroundColor: '#101010' }}
          >
            {altHeader ? (
              <></>
            ) : (
              !isMobile && (
                <CardHeader
                  avatar={<ProfileImageAvatar user={singlePost?.user} />}
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
                        startIcon={<img src='/emptyHeart.png' alt='unliked' />}
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
                        {singlePost?.media.length === 0 ? (
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
                              profileImage={singlePost?.user?.profileImage}
                              name={singlePost?.user?.fullName}
                              onConfirm={(amount, callback) =>
                                dispatch(
                                  postData.addTip({
                                    saveData: {
                                      itemTipped: singlePost.id,
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
                                aria-label='Tip'
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
                  {singlePost?.media.length === 0 && (
                    <NormalCaseButton
                      aria-label='Buy Post'
                      startIcon={<LocalMallIcon />}
                      onClick={openPurchaseModal}
                    >
                      Buy Post
                    </NormalCaseButton>
                  )}
                </div>
                <PostPurchaseModal
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
              {singlePost?.comments?.map(
                (comm, index) =>
                  comm?.parentCommentId === null && (
                    <div key={`abcdef${index}`}>
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
                            //   onClick={() => handleModalCommentLike(comm.id)}
                            // />
                            <img
                              src='/emptyHeart.png'
                              alt='unliked'
                              style={{
                                width: '20px',
                                height: '20px',
                                cursor: 'pointer',
                              }}
                              onClick={() => handleModalCommentLike(comm.id)}
                            />
                          ) : (
                            // <FavoriteIcon
                            //   fontSize='small'
                            //   style={{ color: 'red' }}
                            //   onClick={() => handleModalCommentLike(comm.id)}
                            // />
                            <img
                              src='/filled.png'
                              alt='unliked'
                              style={{
                                width: '20px',
                                height: '20px',
                                cursor: 'pointer',
                              }}
                              onClick={() => handleModalCommentLike(comm.id)}
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

              {singlePost?.totalComments > 10 &&
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
                              //   onClick={() => handleModalCommentLike(comm.id)}
                              // />
                              <img
                                src='/emptyHeart.png'
                                alt='unliked'
                                style={{
                                  width: '20px',
                                  height: '20px',
                                  cursor: 'pointer',
                                }}
                                onClick={() => handleModalCommentLike(comm.id)}
                              />
                            ) : (
                              // <FavoriteIcon
                              //   fontSize='small'
                              //   style={{ color: 'red' }}
                              //   onClick={() => handleModalCommentLike(comm.id)}
                              // />
                              <img
                                src='/filled.png'
                                alt='unliked'
                                style={{
                                  width: '20px',
                                  height: '20px',
                                  cursor: 'pointer',
                                }}
                                onClick={() => handleModalCommentLike(comm.id)}
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
      </>
    </div>
  );
};

export default SinglePost;
