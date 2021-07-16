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
    width: '30%',
  },
  modelStyle: {
    display: 'flex',
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
}) => {
  const classes = useStyles();
  const [commentText, setCommentText] = useState('');
  const [commentId, setCommentId] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [isReplyField, setisReplyField] = useState(false);
  const sPost = useSelector(singlepostDataSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    const data = singlePost?.comments?.filter(c => c.parentCommentId === c.id);
    console.log(data);
  });

  const handleModelCommentLike = cId => {
    console.log(cId);
    singlePost.comments &&
      singlePost.comments.map(comm =>
        comm.likes && comm.likes.length > 0 && comm.id === cId
          ? dispatch(
              postData.delCommentLike({
                id: comm.id,
                callback: () => {
                  // dispatch(postData.request());
                  setLiked(false);
                  dispatch(postData.requestOne(sPost.id));
                },
              })
            )
          : comm.id === cId &&
            dispatch(
              postData.saveCommentLike({
                id: comm.id,
                callback: () => {
                  setLiked(true);
                  dispatch(postData.requestOne(sPost.id));
                  // dispatch(postData.request());
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
          dispatch(postData.requestOne(post.id));
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
      ? singlePost.likes.map(like =>
          dispatch(
            postData.deleteLike({
              id: singlePost.id,
              callback: () => {
                dispatch(postData.requestOne(sPost.id));
                setLiked(false);
              },
            })
          )
        )
      : dispatch(
          postData.saveLike({
            id: singlePost.id,
            callback: () => {
              setLiked(true);
              dispatch(postData.requestOne(sPost.id));
            },
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
        <div className={classes.modelStyle}>
          <div style={{ width: '40%', height: '100%' }}>
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
                        <div style={{ display: 'flex' }}>
                          <div
                            style={{
                              display: 'flex',
                              marginLeft: '14px',
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
                        <div style={{ marginLeft: '50px' }}>
                          {singlePost.comments
                            .filter(c => c.parentCommentId === c.id)
                            .map(co => (
                              <div style={{ display: 'flex' }}>
                                <img
                                  src={comm.user.profileImage}
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
                                    {co.user.username}
                                  </p>
                                  <p>{co.comment}</p>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    )
                )}
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
