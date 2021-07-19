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
    padding: theme.spacing(2, 4, 3),
  },
  profileModelStyle: {
    width: 'auto',
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
}) => {
  const classes = useStyles();
  const [commentText, setCommentText] = useState('');
  const [commentId, setCommentId] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [replyPostId, setReplyPostId] = useState(0);
  const [isReplyField, setisReplyField] = useState(false);
  const sPost = useSelector(singlepostDataSelector);
  const replyData = useSelector(repliesDataSelector);
  const [showReply, setShowReply] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const data = singlePost?.comments?.filter(c => c.parentCommentId === c.id);
    // console.log('check', data);
  });

  const getPostId = () => {
    return sPost.id;
  };

  const handleReplyLike = repId => {
    replyData?.map(re =>
      re.likes && re.likes.length > 0 && repId === re.id
        ? dispatch(
            postData.delCommentLike({
              id: re.id,
              callback: () => {
                // dispatch(postData.request());

                dispatch(postData.requestOne(sPost.id));
              },
            })
          )
        : repId === re.id &&
          dispatch(
            postData.saveCommentLike({
              id: re.id,
              callback: () => {
                dispatch(postData.requestOne(sPost.id));
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
  };

  const handleReplyField = id => {
    setCommentId(id);
    console.log('reply id', id);
    setisReplyField(true);
  };

  const handleAddReply = () => {
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
          dispatch(postData.requestOne(singlePost.id));
          // postData.getComment({
          //   id: post.id,
          // })
        },
      })
    );
  };

  const handleAddComment = () => {
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
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div style={{ width: '50%', height: '100%' }}>
            <PostMedia media={post.media} mediaCount={post.mediaCount} />
          </div>

          <div className={classes.profileModelStyle}>
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
                <Typography variant='body2' color='textSecondary' component='p'>
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
                    startIcon={<FavoriteIcon />}
                    onClick={handleLike}
                  >
                    {singlePost && singlePost.totalLikes} Likes
                  </NormalCaseButton>
                ) : (
                  <NormalCaseButton
                    aria-label='add to favorites'
                    startIcon={<FavoriteIcon style={{ color: 'red' }} />}
                    onClick={handleLike}
                  >
                    {singlePost && singlePost.totalLikes} Likes
                  </NormalCaseButton>
                )}

                <NormalCaseButton
                  aria-label='share'
                  startIcon={<ChatBubbleOutlineIcon />}
                >
                  {singlePost && singlePost.totalComments} Comments
                </NormalCaseButton>
                <NormalCaseButton
                  aria-label='tip'
                  startIcon={<MonetizationOnOutlinedIcon />}
                >
                  Tip
                </NormalCaseButton>
                <NormalCaseButton
                  aria-label='tip'
                  startIcon={<TurnedInNotIcon />}
                >
                  Save
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
            <div
              style={{
                overflowY: 'scroll',
                overflowX: 'hidden',
                height: '350px',
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
                              <img
                                src={comm.user.profileImage}
                                alt='profile=image'
                                width='30px'
                                height='30px'
                              />
                              <h5
                                style={{ marginTop: '6px', marginLeft: '10px' }}
                              >
                                {comm.user.username}
                              </h5>
                            </div>

                            <p
                              style={{
                                cursor: 'pointer',
                                marginLeft: '10px',
                                marginTop: '5px',
                                width: '190px',
                                marginRight: '15px',
                                backgroundColor: comm.id === commentId && 'red',
                              }}
                            >
                              {comm.comment}
                            </p>
                          </div>
                          <div style={{ display: 'flex', marginRight: '14px' }}>
                            <ChatBubbleOutlineIcon
                              style={{ marginRight: '9px' }}
                              id={comm.id}
                              fontSize='small'
                              onClick={() => handleReplyField(comm.id)}
                            />

                            {comm.likes && comm.likes.length === 0 ? (
                              <FavoriteIcon
                                fontSize='small'
                                onClick={() => handleModelCommentLike(comm.id)}
                              />
                            ) : (
                              <FavoriteIcon
                                fontSize='small'
                                style={{ color: 'red' }}
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
                              fontSize: '13px',
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
                                    fontSize='small'
                                    style={{ color: 'red' }}
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
                                    fontSize='small'
                                    style={{ color: 'red' }}
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
                                      <img
                                        src={reply.user.profileImage}
                                        alt='profile=image'
                                        width='30px'
                                        height='30px'
                                      />
                                      <div
                                        style={{
                                          display: 'flex',
                                          marginTop: '-14px',
                                          marginLeft: '5px',
                                        }}
                                      >
                                        <p
                                          style={{
                                            fontWeight: 'bold',
                                            marginRight: '5px',
                                          }}
                                        >
                                          {reply.user.username}
                                        </p>
                                        <p>{reply.comment}</p>
                                      </div>
                                    </div>

                                    <div
                                      style={{
                                        marginLeft: '10px',
                                        marginTop: '5px',
                                      }}
                                    >
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
                                          style={{ color: 'red' }}
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
                                      <div style={{ marginRight: '10px' }}>
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
                                              fontSize='small'
                                              style={{ color: 'red' }}
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
                      </div>
                    )
                )}
              {showReply === true && replyData?.map(rep => console.log(rep))}
            </div>

            {isReplyField === true ? (
              <Box>
                <OutlinedInput
                  value={replyText}
                  onChange={e => setReplyText(e.target.value)}
                  name='replyText'
                  multiline
                  fullWidth
                  rows={1}
                  placeholder='Add Reply'
                  startAdornment={
                    <img
                      src={profileData.profileImage}
                      alt='profileImage'
                      width='40px'
                      height='35px'
                      style={{ marginRight: '10px', borderRadius: '3px' }}
                    />
                  }
                  endAdornment={
                    <SendIcon
                      onClick={handleAddReply}
                      style={{ cursor: 'pointer' }}
                    />
                  }
                />
              </Box>
            ) : (
              <Box>
                <OutlinedInput
                  value={commentText}
                  onChange={e => setCommentText(e.target.value)}
                  name='commentText'
                  multiline
                  fullWidth
                  rows={1}
                  placeholder='Add Comment'
                  startAdornment={
                    <img
                      src={profileData.profileImage}
                      alt='profileImage'
                      width='40px'
                      height='35px'
                      style={{ marginRight: '10px', borderRadius: '3px' }}
                    />
                  }
                  endAdornment={
                    <SendIcon
                      onClick={handleAddComment}
                      style={{ cursor: 'pointer' }}
                    />
                  }
                />
              </Box>
            )}
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default CommentModel;
