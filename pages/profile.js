import React from 'react';
import Head from 'next/head';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import CardHeader from '@material-ui/core/CardHeader';
import SortIcon from '@material-ui/icons/Sort';
import SearchIcon from '@material-ui/icons/Search';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FeaturedPlayListOutlinedIcon from '@material-ui/icons/FeaturedPlayListOutlined';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import VideocamOutlinedIcon from '@material-ui/icons/VideocamOutlined';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Post from '../components/post';
import ProfieImageAvatar from '../components/profile-image-avatar';
import ProfileImage from '../components/change-profile-image';
import CoverImage from '../components/change-cover-image';
import { currentUserSelector } from '../selectors/authSelector';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Layout from '../components/layout-auth';
import UpdateProfile from '../components/update-profile';
import Images from '../components/profile/images';

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
  userAvatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    marginTop: '-80px',
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role='tabpanel' hidden={value !== index} {...other}>
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function Home() {
  const [tab, setTab] = React.useState(0);
  const classes = useStyles();

  const currentUser = useSelector(currentUserSelector);

  return (
    <Layout profile={true}>
      <Head>
        <title>xclusiveme</title>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Container maxWidth='md' disableGutters>
        {currentUser && (
          <Grid container className={classes.root}>
            <Grid item xs={12}>
              <Card>
                <CoverImage>
                  <CardHeader
                    className={classes.header}
                    action={
                      <>
                        <UpdateProfile />
                        <IconButton aria-label='settings'>
                          <MoreVertIcon />
                        </IconButton>
                      </>
                    }
                  />
                </CoverImage>
                <CardHeader
                  className={classes.header2}
                  avatar={
                    <ProfileImage>
                      <ProfieImageAvatar className={classes.userAvatar} />
                    </ProfileImage>
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
                        {currentUser.profile && currentUser.profile.fullName
                          ? currentUser.profile.fullName
                          : '(no name)'}
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
                    {currentUser.profile && currentUser.profile.headline
                      ? currentUser.profile.headline
                      : '(no bio)'}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <List disablePadding>
                <ListSubheader disableGutters>
                  <Paper>
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
                  </Paper>
                </ListSubheader>
                <ListItem>
                  <ListItemText>
                    <TabPanel value={tab} index={0}>
                      <Box
                        ml={{ xs: 2, sm: 2, md: 8 }}
                        mr={{ xs: 2, sm: 2, md: 8 }}
                      >
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
                          <Grid item xs={12}>
                            <Post />
                          </Grid>
                          <Grid item xs={12}>
                            <Post />
                          </Grid>
                        </Grid>
                      </Box>
                    </TabPanel>
                    <TabPanel value={tab} index={1}>
                      <Images />
                    </TabPanel>
                  </ListItemText>
                </ListItem>
              </List>
            </Grid>
          </Grid>
        )}
      </Container>
    </Layout>
  );
}
