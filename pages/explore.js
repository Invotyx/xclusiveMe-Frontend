import Head from 'next/head';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import LogoAuth from './components/logo-auth';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '150px',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <Container maxWidth='md'>
      <Head>
        <title>xclusiveme</title>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
        <link rel='icon' href='/favicon.ico' />
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
        />
      </Head>
      <LogoAuth />
      <Grid container spacing={2} className={classes.root}>
        <Grid item xs={12}>
          <Card className={classes.root}>
            <CardHeader
              avatar={<Avatar aria-label='recipe'>R</Avatar>}
              action={
                <IconButton aria-label='settings'>
                  <MoreVertIcon />
                </IconButton>
              }
              title='Shrimp and Chorizo Paella'
              subheader='September 14, 2016'
            />
            <CardContent>
              <Typography variant='body2' color='textSecondary' component='p'>
                This impressive paella is a perfect party dish and a fun meal to
                cook together with your guests. Add 1 cup of frozen peas along
                with the mussels, if you like.
              </Typography>
            </CardContent>
            <CardMedia
              className={classes.media}
              image='/post.jpg'
              title='Paella dish'
            />
            <CardActions disableSpacing>
              <Box flexGrow={1}>
                <Button
                  aria-label='add to favorites'
                  startIcon={<FavoriteIcon />}
                >
                  12k likes
                </Button>
                <Button
                  aria-label='share'
                  startIcon={<ChatBubbleOutlineIcon />}
                >
                  2,090 comments
                </Button>
                <Button
                  aria-label='tip'
                  startIcon={<MonetizationOnOutlinedIcon />}
                >
                  Tip
                </Button>
              </Box>
              <Button
                aria-label='bookmark'
                startIcon={<BookmarkBorderOutlinedIcon />}
              >
                Save
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
