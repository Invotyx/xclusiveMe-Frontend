import NextLink from 'next/link';
import Avatar from '@material-ui/core/Avatar';
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { getImage } from '../../services/getImage';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 0,
    backgroundColor: 'transparent',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
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
          avatar={
            <Avatar
              alt={profileData.fullName}
              src={
                profileData && profileData.profileImage
                  ? getImage(profileData.profileImage)
                  : 'https://material-ui.com/static/images/avatar/1.jpg'
              }
            />
          }
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
      <CardMedia
        className={classes.media}
        image='/post.jpg'
        title='Paella dish'
      />
      <CardActions disableSpacing>
        <Box flexGrow={1}>
          <Button aria-label='add to favorites' startIcon={<FavoriteIcon />}>
            {post.totalLikes} likes
          </Button>
          <Button aria-label='share' startIcon={<ChatBubbleOutlineIcon />}>
            {post.totalComments} comments
          </Button>
          <Button aria-label='tip' startIcon={<MonetizationOnOutlinedIcon />}>
            Tip
          </Button>
        </Box>
        <Button
          aria-label='bookmark'
          startIcon={<BookmarkBorderOutlinedIcon />}
        >
          <Box display={{ xs: 'none', sm: 'none', md: 'flex' }}>Save</Box>
        </Button>
      </CardActions>
    </Card>
  );
}
