import React from 'react';
import Head from 'next/head';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import CardHeader from '@material-ui/core/CardHeader';
import SortIcon from '@material-ui/icons/Sort';
import SearchIcon from '@material-ui/icons/Search';
import CardMedia from '@material-ui/core/CardMedia';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FeaturedPlayListOutlinedIcon from '@material-ui/icons/FeaturedPlayListOutlined';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import VideocamOutlinedIcon from '@material-ui/icons/VideocamOutlined';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Post from '../components/post';
import CreateIcon from '@material-ui/icons/Create';
import { currentUserSelector } from '../selectors/authSelector';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Layout from '../components/layout-auth';

const useStyles = makeStyles((theme) => ({
  root: {
    // marginTop: '150px',
  },
  header: {
    zIndex: 2,
  },
  header2: {
    zIndex: 2,
  },
  media: {
    zIndex: 1,
    height: 0,
    paddingTop: '33%',
    marginTop: '-72px',
    // position: 'relative',
    '&::after': {
      // content: '" "',
      position: 'absolute',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      backgroundColor: 'rgba(0,0,0,0.7)',
    },
  },
  userAvatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    marginTop: '-80px',
  },
}));

export default function Home() {
  const [tab, setTab] = React.useState(0);
  const classes = useStyles();

  const currentUser = useSelector(currentUserSelector);

  return (
    <Layout>
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
      <Container maxWidth='md' disableGutters>
        {currentUser && (
          <Grid container className={classes.root}>
            <Grid item xs={12}>
              <Card>
                <CardHeader
                  className={classes.header}
                  action={
                    <>
                      <IconButton aria-label='create'>
                        <CreateIcon />
                      </IconButton>
                      <IconButton aria-label='settings'>
                        <MoreVertIcon />
                      </IconButton>
                    </>
                  }
                />
                <CardMedia
                  className={classes.media}
                  image='/cover.jpg'
                  title='Paella dish'
                />
                <CardHeader
                  className={classes.header2}
                  avatar={
                    <Avatar
                      className={classes.userAvatar}
                      alt='Remy Sharp'
                      src='https://material-ui.com/static/images/avatar/1.jpg'
                    />
                  }
                  action={
                    <Box display='flex' textAlign='center'>
                      <Box mx={4}>
                        <ListItemText primary='1.2k' secondary='Posts' />
                      </Box>
                      <Box mx={4}>
                        <ListItemText primary='1.2M' secondary='Followers' />
                      </Box>
                      <Box mx={4}>
                        <ListItemText primary='499' secondary='Following' />
                      </Box>
                    </Box>
                  }
                  title={
                    <Box display={{ xs: 'none', sm: 'none', md: 'flex' }}>
                      <Typography variant='h6'>
                        {currentUser.profile.fullName || '(no name)'}
                      </Typography>
                    </Box>
                  }
                />
                <CardContent>
                  <Typography
                    variant='body2'
                    color='textSecondary'
                    component='p'
                  >
                    {currentUser.profile.headline || '(no bio)'}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <Box flexGrow={1}>
                    <Tabs
                      value={tab}
                      onChange={(e, v) => setTab(v)}
                      variant='fullWidth'
                      indicatorColor='primary'
                      textColor='primary'
                    >
                      <Tab icon={<FeaturedPlayListOutlinedIcon />} />
                      <Tab icon={<ImageOutlinedIcon />} />
                      <Tab icon={<VideocamOutlinedIcon />} />
                      <Tab icon={<MonetizationOnOutlinedIcon />} />
                    </Tabs>
                  </Box>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Box ml={{ xs: 2, sm: 2, md: 8 }} mr={{ xs: 2, sm: 2, md: 8 }}>
                <CardHeader
                  action={
                    <>
                      <IconButton aria-label='sort'>
                        <SearchIcon />
                      </IconButton>
                      <IconButton aria-label='sort'>
                        <SortIcon />
                      </IconButton>
                    </>
                  }
                  title='1.2k posts'
                />
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Post />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        )}
      </Container>
    </Layout>
  );
}
