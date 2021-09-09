import React, { useEffect, useState } from 'react';
import NextLink from 'next/link';
import { motion } from 'framer-motion';
import { variants } from '../../services/framer-variants';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import CardHeader from '@material-ui/core/CardHeader';
import SortIcon from '@material-ui/icons/Sort';
import SearchIcon from '@material-ui/icons/Search';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
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
import Post from './post';
import ProfileImageAvatar from './profile-image-avatar';
import ProfileImage from './change-profile-image';
import CoverImage from './change-cover-image';
import UpdateCoverImage2 from './update-cover-image-2';
import { makeStyles } from '@material-ui/core/styles';
import Layout from '../layouts/layout-auth';
import UpdateProfile from './update-profile';
import Images from './images';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { AppBar, Toolbar } from '@material-ui/core';
import { subscription } from '../../actions/subscription';
import { Add } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import Videos from './videos';
import NormalCaseButton from '../NormalCaseButton';
import NothingHere from './nothing-here';
import { SubscribeUser } from './subscribe-button';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ChatIcon from '@material-ui/icons/Chat';
import LoadingOverlay from 'react-loading-overlay';
import BounceLoader from 'react-spinners/BounceLoader';
import { fetchingSelector } from '../../selectors/postSelector';
import MessageModal from '../message/MessageModal';
import { useRouter } from 'next/router';
import { currentUserSelector } from '../../selectors/authSelector';
import { user as userAction } from '../../actions/user';
import Followers from './usersFollowersFollowing/Followers';
import Followings from './usersFollowersFollowing/Following';
import {
  followersSelector,
  followingSelector,
} from '../../selectors/userSelector';
import { followerCountSelector } from '../../selectors/userSelector';
import PurchasedPosts from './PurchasedPosts';
import { post } from '../../actions/post';
import ManuButton from '../menuButton';

const useStyles = makeStyles(theme => ({
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
        <Box>
          <Typography component='div'>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function Profile({
  user,
  profileData,
  feed,
  numberOfPosts,
  subscriptionPlans,
  afterFollow,
  me,
  followers,
  followings,
}) {
  const dispatch = useDispatch();
  const [tab, setTab] = React.useState(0);
  const [userFeed, setUserFeed] = React.useState(feed);
  const [_numberOfPosts, set_numberOfPosts] = React.useState(numberOfPosts);
  const [openFollowers, setOpenFollowers] = React.useState(false);
  const [openFollowing, setOpenFollowing] = React.useState(false);
  const classes = useStyles();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const verySmall = useMediaQuery('(max-width:350px)');
  const veryVerySmall = useMediaQuery('(max-width:310px)');
  const fetchData = useSelector(fetchingSelector);
  const [messageModal, setMessageModal] = useState(false);
  const myCurrentUser = useSelector(currentUserSelector);
  const router = useRouter();
  const followsData = useSelector(followersSelector);
  const [fCount, setfCount] = useState(0);
  const followcount = useSelector(followerCountSelector);
  const followingData = useSelector(followingSelector);

  const { pathname, query } = router;
  const { username, selected_tab } = query;

  useEffect(() => {
    setTab(selected_tab ? +selected_tab : 0);
  }, [selected_tab]);

  //

  useEffect(() => {
    set_numberOfPosts(numberOfPosts);
  }, [numberOfPosts]);

  useEffect(() => {
    setUserFeed(feed);
  }, [feed]);

  const handleTabChange = (e, tab) => {
    setTab(tab);
    router.push({ pathname, query: { ...query, selected_tab: tab } });
  };

  const handleMessageModal = () => {
    setMessageModal(!messageModal);
  };

  const handlegetFollowers = () => {
    // !subscriptionPlans && setOpenFollowers(true);
    myCurrentUser?.username === username && setOpenFollowers(true);

    myCurrentUser?.username === username &&
      dispatch(
        userAction.followers({
          userId: user?.id,
          limit: 5,
          page: 1,
        })
      );
  };

  const handlegetFollowing = () => {
    setfCount(fCount + 1);
    // !subscriptionPlans && setOpenFollowing(true);
    myCurrentUser?.username === username && setOpenFollowing(true);
    myCurrentUser?.username === username &&
      dispatch(
        userAction.followings({
          userId: user?.id,
          limit: 5,
          page: 1,
          // append: true,
          // prevfollowingData: followingData,
        })
      );
  };

  const handleFollow = event => {
    event.preventDefault();
    user.subscriptionPlans &&
      dispatch(subscription.add(user.subscriptionPlans?.id, afterFollow));
  };

  const handleUnFollow = e => {
    e.preventDefault();
    dispatch(
      subscription.removeSub({
        id: user?.id,
        callback: afterFollow,
      })
    );
  };

  return (
    <LoadingOverlay active={fetchData} spinner={<BounceLoader />}>
      <motion.div initial='hidden' animate='visible' variants={variants}>
        <Layout
          hideMainAppBar={
            <AppBar position='relative' color='transparent' elevation={0}>
              <Box clone mt={2}>
                <Toolbar>
                  <NextLink passHref href='/explore'>
                    <IconButton>
                      <ArrowBackIosIcon fontSize='small' />
                    </IconButton>
                  </NextLink>
                  <Box flex={1}>
                    <Typography>
                      {profileData?.fullName || '(no name)'}
                    </Typography>
                  </Box>

                  {me ||
                    (myCurrentUser?.username === username && (
                      <>
                        <UpdateProfile />
                        <UpdateCoverImage2 />
                      </>
                    ))}
                </Toolbar>
              </Box>
            </AppBar>
          }
        >
          <Container maxWidth='md' disableGutters>
            <>
              <Grid container className={classes.root}>
                <Grid item xs={12}>
                  <Card>
                    <CoverImage profileData={profileData}>
                      <CardHeader
                        className={classes.header}
                        action={
                          <Box display={{ xs: 'none', sm: 'none', md: 'flex' }}>
                            {me ||
                              (myCurrentUser?.username === username && (
                                <>
                                  <UpdateProfile />
                                  <UpdateCoverImage2 />
                                </>
                              ))}
                          </Box>
                        }
                      />
                    </CoverImage>
                    <CardHeader
                      className={classes.header2}
                      avatar={
                        (me && me) || myCurrentUser?.username === username ? (
                          <ProfileImage>
                            <ProfileImageAvatar
                              className={classes.userAvatar}
                              src={profileData?.profileImage}
                              alt={profileData?.fullName}
                            />
                          </ProfileImage>
                        ) : (
                          <ProfileImageAvatar
                            className={classes.userAvatar}
                            src={profileData?.profileImage}
                            alt={profileData?.fullName}
                          />
                        )
                      }
                      action={
                        <Box
                          display='flex'
                          style={
                            veryVerySmall
                              ? { zoom: 0.6 }
                              : verySmall
                              ? { zoom: 0.8 }
                              : {}
                          }
                        >
                          <Box
                            ml={{ xs: 0, sm: 0, md: 2 }}
                            mr={{ xs: 0, sm: 0, md: 2 }}
                            width={isSmall ? 70 : 90}
                          >
                            <NextLink passHref href='#'>
                              <ListItem component='a' disableGutters>
                                <Box clone textAlign='center'>
                                  <ListItemText
                                    primary={_numberOfPosts || 0}
                                    secondary='Posts'
                                  />
                                </Box>
                              </ListItem>
                            </NextLink>
                          </Box>
                          <Box
                            ml={{ xs: 0, sm: 0, md: 2 }}
                            mr={{ xs: 0, sm: 0, md: 2 }}
                            width={isSmall ? 70 : 90}
                          >
                            <ListItem
                              component='a'
                              disableGutters
                              style={{ cursor: 'pointer' }}
                            >
                              <Box
                                clone
                                textAlign='center'
                                onClick={handlegetFollowers}
                              >
                                <ListItemText
                                  primary={followers || 0}
                                  secondary='Followers'
                                />
                              </Box>
                            </ListItem>
                            <Followers
                              openFollowers={openFollowers}
                              setOpenFollowers={setOpenFollowers}
                              user={user}
                              subscriptionPlans={subscriptionPlans}
                              followsData={followsData}
                              followcount={followcount}
                            />
                          </Box>
                          <Box
                            ml={{ xs: 0, sm: 0, md: 2 }}
                            mr={{ xs: 0, sm: 0, md: 2 }}
                            width={isSmall ? 70 : 90}
                          >
                            <ListItem
                              component='a'
                              disableGutters
                              style={{ cursor: 'pointer' }}
                            >
                              <Box
                                clone
                                textAlign='center'
                                onClick={handlegetFollowing}
                              >
                                <ListItemText
                                  primary={followings || 0}
                                  secondary='Following'
                                />
                              </Box>
                            </ListItem>
                            <Followings
                              openFollowing={openFollowing}
                              setOpenFollowing={setOpenFollowing}
                              subscriptionPlans={subscriptionPlans}
                              user={user}
                            />
                          </Box>
                        </Box>
                      }
                      title={
                        <Box display={{ xs: 'none', sm: 'none', md: 'flex' }}>
                          <Typography variant='h6'>
                            {profileData?.fullName || '(no name)'}
                          </Typography>
                        </Box>
                      }
                      subheader={
                        <Box display={{ xs: 'none', sm: 'none', md: 'flex' }}>
                          <Typography variant='body2' className='textSecondary'>
                            @{profileData?.username}
                          </Typography>
                        </Box>
                      }
                    />
                    <CardContent>
                      <Box display={isSmall ? 'block' : 'flex'}>
                        <Box flexGrow={1}>
                          <Box
                            px={isSmall ? 0 : 2}
                            mb={isSmall ? 1 : 0}
                            maxWidth={500}
                          >
                            <Typography
                              variant='body2'
                              color='textSecondary'
                              component='p'
                            >
                              {profileData?.profile?.description || '(no bio)'}
                            </Typography>
                          </Box>
                        </Box>
                        {myCurrentUser?.username !== username && (
                          <Box display='flex' alignItems='center'>
                            {me ||
                              (myCurrentUser?.username === username
                                ? ''
                                : (profileData?.followsMe ||
                                    !subscriptionPlans) && (
                                    <>
                                      <NormalCaseButton
                                        startIcon={<ChatIcon />}
                                        size='small'
                                        variant='outlined'
                                        onClick={handleMessageModal}
                                        style={{ marginRight: '10px' }}
                                      >
                                        <span>Message</span>
                                      </NormalCaseButton>
                                      <MessageModal
                                        messageModal={messageModal}
                                        setMessageModal={setMessageModal}
                                        profileData={profileData}
                                        receiverId={user?.id}
                                      />
                                    </>
                                  ))}
                            {subscriptionPlans ? (
                              <>
                                {subscriptionPlans?.price > 0 ? (
                                  <SubscribeUser
                                    price={subscriptionPlans?.price}
                                    handleFollow={handleFollow}
                                  />
                                ) : (
                                  <NormalCaseButton
                                    startIcon={<Add />}
                                    size='small'
                                    variant='outlined'
                                    onClick={e => handleFollow(e)}
                                  >
                                    <span>Follow</span>
                                  </NormalCaseButton>
                                )}
                              </>
                            ) : (
                              <NormalCaseButton
                                size='small'
                                variant='outlined'
                                onClick={e => handleUnFollow(e)}
                              >
                                <span>Unfollow</span>
                              </NormalCaseButton>
                            )}
                            <>
                              <ManuButton
                                tip={user?.id}
                                title='Report this User'
                                profileImage={profileData?.profileImage}
                                onConfirm={{
                                  onConfirm: (reason, callback) => {
                                    const itemId = profileData?.id;
                                    dispatch(
                                      userAction.report({
                                        reportData: {
                                          itemId,
                                          reason,
                                        },
                                        callback: () => {
                                          callback && callback();
                                        },
                                      })
                                    );
                                  },
                                }}
                              />
                            </>
                          </Box>
                        )}{' '}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                {/* myCurrentUser?.username === username ? (
                  ''
                ) : (
                  <Grid item xs={12}>
                    {subscriptionPlans ? (
                      <Box
                        bgcolor='#111'
                        display='flex'
                        p={2}
                        alignItems='center'
                        my={2}
                        border='1px solid #222'
                      >
                        <Box flexGrow={1}>
                          <Typography>
                            Follow to get posts in your News Feed.
                          </Typography>
                        </Box>

                        {subscriptionPlans?.price > 0 ? (
                          <SubscribeUser
                            price={subscriptionPlans?.price}
                            handleFollow={handleFollow}
                          />
                        ) : (
                          <NormalCaseButton
                            startIcon={<Add />}
                            size='small'
                            variant='outlined'
                            onClick={e => handleFollow(e)}
                          >
                            <span>Follow</span>
                          </NormalCaseButton>
                        )}
                      </Box>
                    ) : (
                      <Box
                        bgcolor='#111'
                        display='flex'
                        p={2}
                        alignItems='center'
                        my={2}
                        border='1px solid #222'
                      >
                        <Box flexGrow={1}>
                          <Typography>
                            Unfollow to stop getting posts in your News Feed.
                          </Typography>
                        </Box>

                        <NormalCaseButton
                          size='small'
                          variant='outlined'
                          onClick={e => handleUnFollow(e)}
                        >
                          <span>Unfollow</span>
                        </NormalCaseButton>
                      </Box>
                    )}
                  </Grid>
                ) */}
                <Grid item xs={12}>
                  <List disablePadding>
                    <ListSubheader disableGutters>
                      <Paper>
                        <Tabs
                          value={tab}
                          onChange={handleTabChange}
                          variant='fullWidth'
                          indicatorColor='primary'
                          textColor='primary'
                        >
                          <Tab icon={<FeaturedPlayListOutlinedIcon />} />
                          <Tab icon={<ImageOutlinedIcon />} />
                          <Tab icon={<VideocamOutlinedIcon />} />
                          {myCurrentUser?.username === username && (
                            <Tab icon={<MonetizationOnOutlinedIcon />} />
                          )}
                        </Tabs>
                      </Paper>
                    </ListSubheader>
                    <ListItem>
                      <ListItemText>
                        <TabPanel value={tab} index={0}>
                          <Box
                            ml={{ xs: 0, sm: 0, md: 8 }}
                            mr={{ xs: 0, sm: 0, md: 8 }}
                          >
                            {/* <CardHeader
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
                              title={`${_numberOfPosts || 0} posts`}
                            /> */}
                            {userFeed && userFeed.length > 0 ? (
                              <Grid container spacing={2}>
                                {userFeed.map((f, ix) => (
                                  <Grid item xs={12} key={ix}>
                                    <Post
                                      post={f}
                                      profileData={profileData}
                                      me={me}
                                      callbackAction={() => {
                                        dispatch(
                                          post.requestX(
                                            { username },
                                            true,
                                            true
                                          )
                                        );
                                      }}
                                    />
                                  </Grid>
                                ))}
                              </Grid>
                            ) : (
                              <NothingHere me={me} />
                            )}
                          </Box>
                        </TabPanel>
                        <TabPanel value={tab} index={1}>
                          <Images username={username} />
                        </TabPanel>
                        <TabPanel value={tab} index={2}>
                          <Videos username={username} />
                        </TabPanel>
                        <TabPanel value={tab} index={3}>
                          <PurchasedPosts
                            me={me}
                            callbackAction={() => {
                              dispatch(post.requestPurchased());
                            }}
                          />
                        </TabPanel>
                      </ListItemText>
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </>
          </Container>
        </Layout>
      </motion.div>
    </LoadingOverlay>
  );
}
