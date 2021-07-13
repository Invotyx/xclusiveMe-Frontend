import NextLink from 'next/link';
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import ProfileImageAvatar from './profile-image-avatar';
import NormalCaseButton from '../NormalCaseButton';
import PostMedia from './post-media';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import SendIcon from '@material-ui/icons/Send';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { post as postData } from '../../actions/post/index';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CloseIcon from '@material-ui/icons/Close';
import TurnedInNotIcon from '@material-ui/icons/TurnedInNot';

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
export default function Post({ post, profileData, altHeader }) {
  const classes = useStyles();
  const [commentText, setCommentText] = useState('');
  const [liked, setLiked] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleAddComment = () => {
    if (!commentText || commentText.trim() === '') {
      return;
    }
    dispatch(
      postData.saveComment({
        id: post.id,
        commentText: {
          comment: commentText,
        },
        callback: () => {
          setCommentText('');
          dispatch(
            postData.requestSubscribed()
            // postData.getComment({
            //   id: post.id,
            // })
          );
        },
      })
    );
  };

  const handleLike = () => {
    if (liked === false) {
      dispatch(
        postData.saveLike(post.id, {
          callback: () => {
            setLiked(true);
          },
        })
      );
    } else {
      dispatch(
        postData.deleteLike(post.likes.id, {
          callback: () => {
            setLiked(false);
          },
        })
      );
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card className={classes.root}>
      {altHeader ? (
        <CardHeader
          action={
            <IconButton aria-label='settings'>
              <MoreHorizIcon />
            </IconButton>
          }
          subheader={moment(post.createdAt).fromNow()}
        />
      ) : (
        <CardHeader
          avatar={<ProfileImageAvatar user={profileData} />}
          action={
            <IconButton aria-label='settings'>
              <MoreVertIcon />
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
                {moment(post.createdAt).fromNow()}
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
      {post.postText && (
        <CardContent>
          <Typography variant='body2' color='textSecondary' component='p'>
            {post.postText}
          </Typography>
        </CardContent>
      )}
      <PostMedia media={post.media} mediaCount={post.mediaCount} />
      <CardActions disableSpacing>
        <Box flexGrow={1}>
          {post.likes.length === 0 ? (
            <NormalCaseButton
              aria-label='add to favorites'
              startIcon={<FavoriteIcon />}
              onClick={handleLike}
            >
              {post.totalLikes} Likes
            </NormalCaseButton>
          ) : (
            <NormalCaseButton
              aria-label='add to favorites'
              startIcon={<FavoriteIcon style={{ color: 'red' }} />}
              onClick={handleLike}
            >
              {post.likes.length} Likes
            </NormalCaseButton>
          )}

          <NormalCaseButton
            aria-label='share'
            startIcon={<ChatBubbleOutlineIcon />}
          >
            {post.comments.length} Comments
          </NormalCaseButton>
          <NormalCaseButton
            aria-label='tip'
            startIcon={<MonetizationOnOutlinedIcon />}
          >
            Tip
          </NormalCaseButton>
        </Box>

        {false && (
          <NormalCaseButton
            aria-label='bookmark'
            startIcon={<BookmarkBorderOutlinedIcon />}
          >
            <Box display={{ xs: 'none', sm: 'none', md: 'flex' }}>Save</Box>
          </NormalCaseButton>
        )}
      </CardActions>
      {post.comments.length > 0 ? (
        <p
          style={{
            cursor: 'pointer',
            marginLeft: '18px',
            marginTop: '0px',
            marginBottom: '9px',
            fontWeight: 'bold',
          }}
          onClick={handleOpen}
        >
          View previous comments
        </p>
      ) : (
        ''
      )}

      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
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
                  subheader={moment(post.createdAt).fromNow()}
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
                          <NextLink
                            href={`/x/${profileData?.username}`}
                            passHref
                          >
                            <Link>{profileData?.fullName || '(no name)'}</Link>
                          </NextLink>
                        </Typography>
                      </Box>
                      <Typography variant='caption' color='textSecondary'>
                        {moment(post.createdAt).fromNow()}
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
              {post.postText && (
                <CardContent>
                  <Typography
                    variant='body2'
                    color='textSecondary'
                    component='p'
                  >
                    {post.postText}
                  </Typography>
                </CardContent>
              )}
              <CardActions>
                <Box>
                  {post.likes.length === 0 ? (
                    <NormalCaseButton
                      aria-label='add to favorites'
                      startIcon={<FavoriteIcon />}
                      onClick={handleLike}
                    >
                      {post.totalLikes} Likes
                    </NormalCaseButton>
                  ) : (
                    <NormalCaseButton
                      aria-label='add to favorites'
                      startIcon={<FavoriteIcon style={{ color: 'red' }} />}
                      onClick={handleLike}
                    >
                      {post.likes.length} Likes
                    </NormalCaseButton>
                  )}

                  <NormalCaseButton
                    aria-label='share'
                    startIcon={<ChatBubbleOutlineIcon />}
                  >
                    {post.comments.length} Comments
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
                {post.comments.map(comm => (
                  <div style={{ display: 'flex' }}>
                    <div
                      style={{
                        display: 'flex',
                        marginLeft: '14px',
                      }}
                    >
                      <div style={{ display: 'flex' }}>
                        <img
                          src='/dp.png'
                          alt='profile=image'
                          width='30px'
                          height='30px'
                        />
                        <h5 style={{ marginTop: '6px', marginLeft: '10px' }}>
                          My Name
                        </h5>
                      </div>

                      <p
                        style={{
                          cursor: 'pointer',
                          marginLeft: '10px',
                          marginTop: '5px',
                          width: '190px',
                          marginRight: '15px',
                        }}
                      >
                        {comm.comment}
                      </p>
                    </div>
                    <div style={{ display: 'flex', marginRight: '14px' }}>
                      <ChatBubbleOutlineIcon
                        style={{ marginRight: '9px' }}
                        fontSize='small'
                      />
                      <FavoriteIcon fontSize='small' />
                    </div>
                  </div>
                ))}
              </div>
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
                  endAdornment={<SendIcon onClick={handleAddComment} />}
                />
              </Box>
            </div>
          </div>
        </Fade>
      </Modal>
      {post.comments.slice(0, 3).map(comm => (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', marginLeft: '14px' }}>
            <div style={{ display: 'flex' }}>
              <img
                src='/dp.png'
                alt='profile=image'
                width='30px'
                height='30px'
              />
              <p
                style={{
                  marginTop: '6px',
                  marginLeft: '10px',
                  fontWeight: 'bold',
                }}
              >
                My Name
              </p>
            </div>

            <p
              style={{
                cursor: 'pointer',
                marginLeft: '10px',
                marginTop: '5px',
                width: '350px',
              }}
            >
              {comm.comment}
            </p>
          </div>
          <div style={{ display: 'flex', marginRight: '14px' }}>
            <ChatBubbleOutlineIcon
              style={{ marginRight: '9px' }}
              fontSize='small'
            />
            <FavoriteIcon fontSize='small' />
          </div>
        </div>
      ))}
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
          endAdornment={<SendIcon onClick={handleAddComment} />}
        />
      </Box>
    </Card>
  );
}
