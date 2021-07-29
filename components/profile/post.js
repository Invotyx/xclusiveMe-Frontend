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
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { post as postData } from '../../actions/post/index';

import Backdrop from '@material-ui/core/Backdrop';

import { currentUserSelector } from '../../selectors/authSelector';
import { singlepostDataSelector } from '../../selectors/postSelector';
import { totalreplies } from '../../selectors/postSelector';
import RemoveIcon from '@material-ui/icons/Remove';
import CommentModel from './commentModel';
import { Button } from '@material-ui/core';
import LocalMallIcon from '@material-ui/icons/LocalMall';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 0,
    border: '1px solid #444444',
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
  const [replyText, setReplyText] = useState('');
  const [liked, setLiked] = useState(false);
  const [commentedId, setCommentedId] = useState(null);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector(currentUserSelector);
  const [commentId, setCommentId] = useState(null);
  const [isReplyField, setisReplyField] = useState(false);
  const singlePost = useSelector(singlepostDataSelector);
  const replyCount = useSelector(totalreplies);

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

  const handleReplyField = id => {
    setCommentId(id);
    setisReplyField(true);
  };

  const handleAddReply = () => {
    setisReplyField(false);
    console.log(commentId);

    if (!replyText || replyText.trim() === '') {
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
    post.likes.length > 0
      ? post.likes.map(like =>
          dispatch(
            postData.deleteLike({
              id: post.id,
              callback: () => {
                dispatch(postData.request());
                dispatch(postData.requestSubscribed());
              },
            })
          )
        )
      : dispatch(
          postData.saveLike({
            id: post.id,
            callback: () => {
              dispatch(postData.request());
              dispatch(postData.requestSubscribed());
            },
          })
        );
  };

  const handleCommentLike = cId => {
    console.log(cId);
    post.comments.map(comm =>
      comm.likes && comm.likes.length > 0 && comm.id === cId
        ? dispatch(
            postData.delCommentLike({
              id: comm.id,
              callback: () => {
                dispatch(postData.request());
                dispatch(postData.requestSubscribed());
              },
            })
          )
        : comm.id === cId &&
          dispatch(
            postData.saveCommentLike({
              id: comm.id,
              callback: () => {
                dispatch(postData.request());
                dispatch(postData.requestSubscribed());
              },
            })
          )
    );
  };

  const handleOpen = forReplyId => {
    console.log('commentid', forReplyId);
    dispatch(postData.requestOne(post.id));
    // dispatch(postData.requestReplies(forReplyId, post.id));

    console.log('click');
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
      <PostMedia media={post.media} mediaCount={post.mediaCount} post={post} />
      <CardActions disableSpacing>
        <Box flexGrow={1}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
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
                  {post.totalLikes} Likes
                </NormalCaseButton>
              )}

              <NormalCaseButton
                aria-label='share'
                startIcon={<ChatBubbleOutlineIcon />}
              >
                {post.totalComments} Comments
              </NormalCaseButton>
              <NormalCaseButton
                aria-label='tip'
                startIcon={<MonetizationOnOutlinedIcon />}
              >
                Tip
              </NormalCaseButton>
            </div>

            {post.isPaid === true ? (
              <NormalCaseButton
                aria-label='Buy Post'
                startIcon={<LocalMallIcon />}
              >
                Buy Post
              </NormalCaseButton>
            ) : (
              ''
            )}
          </div>
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

      <CommentModel
        post={post}
        profileData={profileData}
        altHeader={altHeader}
        singlePost={singlePost}
        open={open}
        setOpen={setOpen}
        replyCount={replyCount}
        currentUser={currentUser}
      />
      {post.comments.map(comm => (
        <div style={{ marginBottom: '20px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{
                display: 'flex',
                marginLeft: '14px',
              }}
            >
              <div style={{ display: 'flex' }}>
                {comm?.user?.profileImage ? (
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
                )}

                <p
                  style={{
                    marginTop: '2px',
                    marginLeft: '10px',
                    fontWeight: 'bold',
                  }}
                >
                  {comm.user.fullName}
                </p>
              </div>

              <p
                style={{
                  cursor: 'pointer',
                  marginLeft: '10px',
                  marginTop: '2px',
                  width: '350px',
                  color: '#ACACAC',
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
                  onClick={() => handleCommentLike(comm.id)}
                />
              ) : (
                <FavoriteIcon
                  fontSize='small'
                  style={{ color: 'red' }}
                  onClick={() => handleCommentLike(comm.id)}
                />
              )}
            </div>
          </div>

          <p
            style={{
              marginLeft: '90px',
              marginTop: '-10px',
              marginBottom: '0px',
              cursor: 'pointer',
              fontSize: '11px',
            }}
            onClick={() => handleOpen(comm.id)}
          >
            {comm.totalReplies === 0 ? '' : 'VIEW REPLIES'}
          </p>
        </div>
      ))}
      {isReplyField === true ? (
        <Box style={{ borderTop: '1px solid #444444' }}>
          <OutlinedInput
            value={replyText}
            onChange={e => setReplyText(e.target.value)}
            name='replyText'
            multiline
            fullWidth
            onKeyDown={e => {
              if (e.keyCode === 13 && !e.shiftKey) {
                e.preventDefault();
              }
              // } else if (e.keyCode === 13) {
              //   handleAddComment(e);
              // }
            }}
            placeholder='Add Reply'
            startAdornment={
              currentUser?.profileImage ? (
                <img
                  src={currentUser && currentUser.profileImage}
                  alt='profileImage'
                  width='40px'
                  height='35px'
                  style={{ marginRight: '10px', borderRadius: '3px' }}
                />
              ) : (
                <img
                  src='/dp.png'
                  alt='profileImage'
                  width='40px'
                  height='35px'
                  style={{ marginRight: '10px', borderRadius: '3px' }}
                />
              )
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
        <form onSubmit={handleAddComment}>
          <Box style={{ borderTop: '1px solid #444444' }}>
            <OutlinedInput
              value={commentText}
              onChange={e => setCommentText(e.target.value)}
              name='commentText'
              multiline
              fullWidth
              onKeyDown={e => {
                if (e.keyCode === 13 && !e.shiftKey) {
                  e.preventDefault();
                }
                // } else if (e.keyCode === 13) {
                //   handleAddComment(e);
                // }
              }}
              placeholder='Add Comment'
              startAdornment={
                currentUser?.profileImage ? (
                  <img
                    src={currentUser && currentUser.profileImage}
                    alt='profileImage'
                    width='40px'
                    height='35px'
                    style={{ marginRight: '10px', borderRadius: '3px' }}
                  />
                ) : (
                  <img
                    src='/dp.png'
                    alt='profileImage'
                    width='40px'
                    height='35px'
                    style={{ marginRight: '10px', borderRadius: '3px' }}
                  />
                )
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
      )}
    </Card>
  );
}
