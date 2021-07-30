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
import styles from './profile.module.css';
import { currentUserSelector } from '../../selectors/authSelector';
import { singlepostDataSelector } from '../../selectors/postSelector';
import { totalreplies } from '../../selectors/postSelector';
import RemoveIcon from '@material-ui/icons/Remove';
import CommentModel from './commentModel';
import { Button } from '@material-ui/core';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import { Hidden } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 0,
    border: '1px solid #444444',
    ['@media and screen and (maxWidth: 600px)']: {
      width: '50px',
      height: '50px',
    },
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

  const nFormatter = n => {
    if (n < 1e3) return n;
    if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + 'K';
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + 'M';
    if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + 'B';
    if (n >= 1e12) return +(n / 1e12).toFixed(1) + 'T';
  };

  return (
    <Card className={styles.postCard}>
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
                <Typography
                  variant='body2'
                  component='span'
                  style={{ fontWeight: '600' }}
                >
                  <NextLink href={`/x/${profileData?.username}`} passHref>
                    <Link>{profileData?.fullName || '(no name)'}</Link>
                  </NextLink>
                </Typography>
              </Box>
              <Typography
                variant='caption'
                color='textSecondary'
                style={{ fontWeight: '900' }}
              >
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
            component='p'
            style={{
              color: 'white',
              lineHeight: '24px',
              fontWeight: '500',
              fontFamily: 'Poppins',
            }}
          >
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
                  startIcon={<img src='/emptyHeart.png' alt='unliked' />}
                  onClick={handleLike}
                >
                  {nFormatter(post.totalLikes)}{' '}
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
                  {nFormatter(post.totalLikes)}{' '}
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
                {nFormatter(post.totalComments)}{' '}
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
            </div>

            <div>
              {post.media.length === 0 ? (
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
                {/* {comm?.user?.profileImage ? (
                  <img
                    src={comm.user.profileImage}
                    alt='profile=image'
                    width='40px'
                    height='40px'
                    style={{ marginRight: '10px', borderRadius: '50%' }}
                  />
                ) : (
                  <img
                    src='/dp.png'
                    alt='profile=image'
                    width='55px'
                    height='45px'
                    style={{ marginRight: '10px', borderRadius: '50%' }}
                  />
                )} */}

                {<ProfileImageAvatar user={comm?.user} />}

                <p
                  style={{
                    marginTop: '7px',
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
                  marginTop: '7px',
                  textAlign: 'left',
                  color: '#ACACAC',
                  whiteSpace: 'normal',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {comm.comment}
              </p>
            </div>
            <div
              style={{ display: 'flex', marginRight: '14px', marginTop: '5px' }}
              id={comm.id}
              onClick={() => handleReplyField(comm.id)}
            >
              <img
                src='/comment.png'
                alt='reply button'
                style={{ width: '20px', height: '20px', marginRight: '9px' }}
                className={styles.commMobile}
              />
              {/* <ChatBubbleOutlineIcon
                style={{ marginRight: '9px' }}
                id={comm.id}
                fontSize='small'
                onClick={() => handleReplyField(comm.id)}
              /> */}

              {comm.likes && comm.likes.length === 0 ? (
                <img
                  src='/emptyHeart.png'
                  alt='unliked'
                  style={{ width: '20px', height: '20px' }}
                  onClick={() => handleCommentLike(comm.id)}
                />
              ) : (
                // <FavoriteIcon
                //   fontSize='small'
                //   onClick={() => handleCommentLike(comm.id)}
                // />
                <img
                  src='/filled.png'
                  alt='unliked'
                  style={{ width: '20px', height: '20px' }}
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
              fontSize: '13px',
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
            placeholder='Add a Reply'
            startAdornment={
              // currentUser?.profileImage ? (
              //   <img
              //     src={currentUser && currentUser.profileImage}
              //     alt='profileImage'
              //     width='50px'
              //     height='45px'
              //     style={{ marginRight: '10px', borderRadius: '50%' }}
              //   />
              // ) : (
              //   <img
              //     src='/dp.png'
              //     alt='profileImage'
              //     width='50px'
              //     height='45px'
              //     style={{ marginRight: '10px', borderRadius: '50%' }}
              //   />
              // )

              <ProfileImageAvatar
                user={currentUser}
                style={{ marginRight: '10px' }}
              />
            }
            endAdornment={
              <Button
                onClick={handleAddReply}
                style={{
                  backgroundColor: '#111111',
                  border: 'none',
                  marginRight: '-20px',
                }}
              >
                <img
                  src='/send.png'
                  alt='send button'
                  style={{ marginRight: '10px' }}
                />
              </Button>
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
              placeholder='Add a Comment'
              startAdornment={
                // currentUser?.profileImage ? (
                //   <img
                //     src={currentUser && currentUser.profileImage}
                //     alt='profileImage'
                //     width='55px'
                //     height='45px'
                //     style={{ marginRight: '10px', borderRadius: '50%' }}
                //   />
                // ) : (
                //   <img
                //     src='/dp.png'
                //     alt='profileImage'
                //     width='55px'
                //     height='45px'
                //     style={{ marginRight: '10px', borderRadius: '50%' }}
                //   />
                // )

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
                    marginRight: '-20px',
                  }}
                >
                  <img
                    src='/send.png'
                    alt='send button'
                    style={{ marginRight: '10px' }}
                  />
                </Button>
              }
            />
          </Box>
        </form>
      )}
    </Card>
  );
}
