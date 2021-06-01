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

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 0,
    backgroundColor: 'transparent',
  },
}));
export default function Post({ post, profileData, altHeader }) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      {altHeader ? (
        <CardHeader
          action={
            <IconButton aria-label='settings'>
              <MoreHorizIcon />
            </IconButton>
          }
          subheader={moment(post.createdAt).format('MMMM DD, YYYY')}
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
            <NextLink href={`/x/${profileData?.username}`} passHref>
              <Link>{profileData?.fullName || '(no name)'}</Link>
            </NextLink>
          }
          subheader={moment(post.createdAt).format('MMMM DD, YYYY')}
        />
      )}
      <CardContent>
        <Typography variant='body2' color='textSecondary' component='p'>
          {post.postText}
        </Typography>
      </CardContent>
      <PostMedia media={post.media} />
      <CardActions disableSpacing>
        <Box flexGrow={1}>
          <NormalCaseButton
            aria-label='add to favorites'
            startIcon={<FavoriteIcon />}
          >
            {post.totalLikes} Likes
          </NormalCaseButton>
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
        <NormalCaseButton
          aria-label='bookmark'
          startIcon={<BookmarkBorderOutlinedIcon />}
        >
          <Box display={{ xs: 'none', sm: 'none', md: 'flex' }}>Save</Box>
        </NormalCaseButton>
      </CardActions>
    </Card>
  );
}
