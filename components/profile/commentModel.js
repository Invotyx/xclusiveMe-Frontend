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
import ProfileImageAvatar from './profile-image-avatar';
import NormalCaseButton from '../NormalCaseButton';
import PostMedia from './post-media';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import SendIcon from '@material-ui/icons/Send';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { post as postData } from '../../actions/post/index';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CloseIcon from '@material-ui/icons/Close';
import TurnedInNotIcon from '@material-ui/icons/TurnedInNot';
import { singlepostDataSelector } from '../../selectors/postSelector';
import { repliesDataSelector } from '../../selectors/postSelector';
import { postDataSelector } from '../../selectors/postSelector';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import SinglePostMedia from './SinglePostMedia';
import styles from './profile.module.css';

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
  replyCount,
  currentUser,
  forCommentId,
  openReply,
}) => {
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
  const [showReply, setShowReply] = useState(false);
  var pageNum = 1;
  const dispatch = useDispatch();

  useEffect(() => {
    if (forCommentId) {
      handleReplyField(forCommentId);
    }
    // console.log('check', data);
  }, [forCommentId]);

  const getPostId = () => {
    return sPost.id;
  };

  // const increasePage = () => {
  //   pageNum++;
  // };

  const handleReplyLike = repId => {
    replyData?.map(re =>
      re.likes && re.likes.length > 0 && repId === re.id
        ? dispatch(
            postData.delCommentLike({
              id: re.id,
              callback: () => {
                // dispatch(postData.request());
                console.log('eee');
                dispatch(postData.requestOne(sPost.id));
              },
            })
          )
        : repId === re.id &&
          dispatch(
            postData.saveCommentLike({
              id: re.id,
              callback: () => {
                console.log('ddd');
                dispatch(postData.requestOne(sPost.id));
                console.log(dispatch(postData.requestOne(sPost.id)));
                // dispatch(postData.request());
              },
            })
          )
    );
  };

  const handleModelCommentLike = cId => {
    // console.log(cId);
    post.comments &&
      post.comments.map(comm =>
        comm.likes && comm.likes.length === 0 && comm.id === cId
          ? dispatch(
              postData.saveCommentLike({
                id: comm.id,
                callback: () => {
                  console.log('in save');

                  dispatch(postData.requestOne(sPost.id));
                },
              })
            )
          : comm.id === cId &&
            dispatch(
              postData.delCommentLike({
                id: comm.id,
                callback: () => {
                  console.log('in');

                  dispatch(postData.requestOne(sPost.id));
                },
              })
            )
      );
  };

  const handleClose = () => {
    setOpen(false);
    setisReplyField(false);
    setissubReplyField(false);
  };

  const handleReplyField = id => {
    setCommentId(id);
    console.log('reply id', id);

    setisReplyField({ check: true, id });
    setissubReplyField({ check: false });
  };

  const handleSubReplyField = id => {
    setCommentId(id);
    console.log('reply id', id);
    setissubReplyField({ check: true, id });
  };

  const handleAddReply = event => {
    event.preventDefault();
    console.log(commentId);

    if (!replyText || replyText.trim() === '') {
      console.log('commentId');
      console.log(replyText);
      return;
    }
    dispatch(
      postData.saveComment({
        id: post.id,
        commentText: {
          comment: replyText,
          isReply: true,
          parentCommentId: commentId,
        },

        callback: () => {
          setReplyText('');
          setisReplyField(false);
          setissubReplyField(false);
          dispatch(postData.requestOne(singlePost.id));
          // postData.getComment({
          //   id: post.id,
          // })
        },
      })
    );
  };

  const handleAddComment = event => {
    event.preventDefault();
    if (!commentText || commentText.trim() === '') {
      return;
    }
    dispatch(
      postData.saveComment({
        id: post.id,
        commentText: {
          comment: commentText,
          isReply: false,
        },
        callback: () => {
          setCommentText('');
          dispatch(postData.requestOne(sPost.id));
          // postData.getComment({
          //   id: post.id,
          // })
        },
      })
    );
  };

  const handleLike = () => {
    singlePost.likes && singlePost.likes.length > 0
      ? dispatch(
          postData.deleteLike({
            id: singlePost.id,
            callback: () => {
              console.log('deletw');
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

  const handleRepliesList = commId => {
    console.log(commId);
    setShowReply(true);
    console.log(showReply);
    dispatch(
      postData.requestReplies({
        postId: post.id,
        parentCommentId: commId,
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
              media={post?.media}
              mediaCount={post?.mediaCount}
              singlePost={post}
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
              <CardHeader
                avatar={<ProfileImageAvatar user={profileData} />}
                action={
                  <IconButton aria-label='settings'>
                    <CloseIcon onClick={handleClose} />
                  </IconButton>
                }
                title={
                  <>
                    <Box clone mr={1}>
                      <Typography variant='body2' component='span'>
                        <NextLink href={`/x/${profileData?.username}`} passHref>
                          <Link>{profileData?.fullName || '(no name)'}</Link>
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
                    @{profileData?.username}
                  </Typography>
                }
              />
            )}
            {singlePost && singlePost.postText && (
              <CardContent>
                <Typography
                  variant='body2'
                  color='textSecondary'
                  component='p'
                  style={{
                    whiteSpace: 'normal',
                    overflow: 'hidden',
                    textOverflow: 'clip',
                  }}
                >
                  {singlePost.postText}
                </Typography>
              </CardContent>
            )}
            <CardActions>
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
                <NormalCaseButton
                  aria-label='tip'
                  startIcon={<MonetizationOnOutlinedIcon />}
                >
                  <span className={styles.hideOnMobile}>Tip</span>
                </NormalCaseButton>
              </Box>

              {false && (
                <NormalCaseButton
                  aria-label='bookmark'
                  startIcon={<BookmarkBorderOutlinedIcon />}
                >
                  <Box display={{ xs: 'none', sm: 'none', md: 'flex' }}>
                    Save
                  </Box>
                </NormalCaseButton>
              )}
            </CardActions>
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
              style={{
                overflowY: 'scroll',
                overflowX: 'hidden',
                height: '350px',
                marginLeft: '15px',
              }}
            >
              {singlePost &&
                singlePost.comments &&
                singlePost.comments.map(
                  comm =>
                    comm.parentCommentId === null && (
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
                              {/* {comm?.user?.profileImage ? (
                                <img
                                  src={comm.user.profileImage}
                                  alt='profile=image'
                                  width='30px'
                                  height='30px'
                                />
                              ) : (
                                <img
                                  src='/dp.png'
                                  alt='profile=image'
                                  width='35px'
                                  height='35px'
                                />
                              )} */}
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
                              {comm.comment}
                            </p>
                          </div>
                          <div style={{ display: 'flex', marginRight: '14px' }}>
                            {/* <ChatBubbleOutlineIcon
                              style={{ marginRight: '9px' }}
                              id={comm.id}
                              fontSize='small'
                              onClick={() => handleReplyField(comm.id)}
                            /> */}

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
                          <p
                            style={{
                              marginLeft: '50px',
                              marginTop: '-10px',
                              marginBottom: '0px',
                              cursor: 'pointer',
                              fontSize: '11px',
                              display: 'flex',
                            }}
                            onClick={() => handleRepliesList(comm.id)}
                          >
                            <div style={{ marginRight: '10px' }}>
                              {comm.totalLikes === 0 ? (
                                <div style={{ display: 'flex' }}>
                                  <p
                                    style={{
                                      marginTop: '0px',
                                      marginRight: '5px',
                                    }}
                                  >
                                    0
                                  </p>
                                  <FavoriteIcon
                                    style={{ color: 'red', fontSize: '15px' }}
                                  />
                                </div>
                              ) : (
                                <div style={{ display: 'flex' }}>
                                  <p
                                    style={{
                                      marginTop: '0px',
                                      marginRight: '5px',
                                    }}
                                  >
                                    {comm.totalLikes}{' '}
                                  </p>
                                  <FavoriteIcon
                                    style={{ color: 'red', fontSize: '15px' }}
                                  />
                                </div>
                              )}
                            </div>
                            {comm.totalReplies > 0 ? 'VIEW REPLIES' : ' '}
                          </p>
                        </div>

                        {showReply === true &&
                          replyData?.map(
                            reply =>
                              reply.parentCommentId === comm.id && (
                                <div>
                                  <div
                                    style={{
                                      display: 'flex',
                                      justifyContent: 'space-around',
                                    }}
                                  >
                                    <div
                                      style={{
                                        display: 'flex',
                                        marginLeft: '50px',
                                        marginBottom: '10px',
                                        marginTop: '5px',
                                      }}
                                    >
                                      {
                                        <ProfileImageAvatar
                                          user={reply?.user}
                                        />
                                      }

                                      <div
                                        style={{
                                          display: 'flex',
                                          marginTop: '-6px',
                                          marginLeft: '10px',
                                        }}
                                      >
                                        <p
                                          style={{
                                            fontWeight: 'bold',
                                            marginRight: '5px',
                                          }}
                                        >
                                          {reply.user.fullName}
                                        </p>
                                        <p
                                          style={{
                                            color: '#ACACAC',
                                            whiteSpace: 'wrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                          }}
                                        >
                                          {reply.comment}
                                        </p>
                                      </div>
                                    </div>

                                    <div
                                      style={{
                                        marginTop: '10px',
                                      }}
                                    >
                                      <ChatBubbleOutlineIcon
                                        style={{ marginRight: '9px' }}
                                        id={comm.id}
                                        fontSize='small'
                                        onClick={() =>
                                          handleSubReplyField(comm.id)
                                        }
                                      />
                                      {reply.likes &&
                                      reply.likes.length === 0 ? (
                                        <FavoriteIcon
                                          fontSize='small'
                                          onClick={() =>
                                            handleReplyLike(reply.id)
                                          }
                                        />
                                      ) : (
                                        <FavoriteIcon
                                          fontSize='small'
                                          style={{
                                            color: 'red',
                                          }}
                                          onClick={() =>
                                            handleReplyLike(reply.id)
                                          }
                                        />
                                      )}
                                    </div>
                                  </div>
                                  <div
                                    style={{
                                      marginLeft: '40px',
                                      marginTop: '-10px',
                                    }}
                                  >
                                    <p
                                      style={{
                                        marginLeft: '50px',
                                        marginTop: '-10px',
                                        marginBottom: '0px',
                                        cursor: 'pointer',
                                        fontSize: '13px',
                                        display: 'flex',
                                      }}
                                    >
                                      <div
                                        style={{
                                          marginLeft: '10px',
                                          marginTop: '-3px',
                                        }}
                                      >
                                        {reply.totalLikes === 0 ? (
                                          <div style={{ display: 'flex' }}>
                                            <p
                                              style={{
                                                marginTop: '0px',
                                                marginRight: '5px',
                                              }}
                                            >
                                              0
                                            </p>
                                            <FavoriteIcon
                                              style={{
                                                color: 'red',
                                                fontSize: '15px',
                                              }}
                                            />
                                          </div>
                                        ) : (
                                          <div style={{ display: 'flex' }}>
                                            <p
                                              style={{
                                                marginTop: '0px',
                                                marginRight: '5px',
                                              }}
                                            >
                                              {reply.totalLikes}{' '}
                                            </p>
                                            <FavoriteIcon
                                              fontSize='small'
                                              style={{ color: 'red' }}
                                            />
                                          </div>
                                        )}
                                      </div>
                                    </p>
                                  </div>
                                </div>
                              )
                          )}
                        {(isReplyField.check === true &&
                          isReplyField.id === comm.id) ||
                        (issubReplyField.check === true &&
                          issubReplyField.id === comm.id) ? (
                          <form onSubmit={handleAddReply}>
                            <Box mb={2} ml={5}>
                              <OutlinedInput
                                value={replyText}
                                onChange={e => setReplyText(e.target.value)}
                                name='replyText'
                                multiline
                                onKeyDown={e => {
                                  if (e.keyCode === 13 && !e.shiftKey) {
                                    e.preventDefault();
                                  }
                                  // } else if (e.keyCode === 13) {
                                  //   handleAddReply(e);
                                  // }
                                }}
                                placeholder={
                                  issubReplyField.check === true
                                    ? 'Tagged user'
                                    : 'Add Reply'
                                }
                                startAdornment={
                                  <ProfileImageAvatar
                                    user={currentUser}
                                    style={{ marginRight: '10px' }}
                                  />
                                }
                                endAdornment={
                                  <Button
                                    type='submit'
                                    style={{
                                      backgroundColor: '#111111',
                                      border: 'none',
                                    }}
                                  >
                                    <SendIcon
                                      style={{
                                        cursor: 'pointer',
                                        color: 'white',
                                      }}
                                    />
                                  </Button>
                                }
                              />
                            </Box>
                          </form>
                        ) : (
                          ''
                        )}
                      </div>
                    )
                )}
              {showReply === true && replyData?.map(rep => console.log(rep))}
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
                    if (e.keyCode === 13 && !e.shiftKey) {
                      e.preventDefault();
                    }
                    // if (e.keyCode === 13) {
                    //   handleAddComment(e);
                    // }
                    // } else if (e.keyCode === 13) {
                    //   console.log('enter');
                    //   handleAddComment(e);
                    // }
                  }}
                  placeholder='Add Comment'
                  startAdornment={
                    <ProfileImageAvatar
                      user={currentUser}
                      style={{ marginRight: '10px' }}
                    />
                  }
                  endAdornment={
                    <Button
                      type='submit'
                      style={{ backgroundColor: '#111111', border: 'none' }}
                    >
                      <SendIcon style={{ cursor: 'pointer', color: 'white' }} />
                    </Button>
                  }
                />
              </Box>
            </form>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default CommentModel;
