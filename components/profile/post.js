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

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 0,
  },
}));
export default function Post({ post, profileData, altHeader }) {
  const classes = useStyles();
  const [commentText, setCommentText] = useState('');
  const [liked, setLiked] = useState(false);
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
    }
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
            {post.totalComments} Comments
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
            />
          }
          endAdornment={<SendIcon onClick={handleAddComment} />}
        />
      </Box>
    </Card>
  );
}
