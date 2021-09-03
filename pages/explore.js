import NextLink from 'next/link';
import { motion } from 'framer-motion';
import { variants } from '../services/framer-variants';
import Head from 'next/head';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Link from '@material-ui/core/Link';
import Post from '../components/profile/post';
import { makeStyles } from '@material-ui/core/styles';
import Layout from '../components/layouts/layout-auth';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { post } from '../actions/post';
import { subscribedSelector } from '../selectors/postSelector';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import NothingHere from '../components/profile/nothing-here';
import { useMediaQuery } from 'react-responsive';
import LinearProgress from '@material-ui/core/LinearProgress';
import { fetchingSelector } from '../selectors/postSelector';
import { chat } from '../actions/chat';
import { user } from '../actions/user';
import { allUsersSelector } from '../selectors/userSelector';
import ImageAvatar from '../components/image-avatar';

const suggestions = [
  {
    profileImage: 'https://material-ui.com/static/images/avatar/1.jpg',
    fullName: 'John Doe',
    username: 'johndoe',
  },
];

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: '150px',
  },
}));

export default function Home() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const posts = useSelector(subscribedSelector);
  const isMobile = useMediaQuery({ query: '(max-width: 760px)' });
  const fetching = useSelector(fetchingSelector);
  const suggestion = useSelector(allUsersSelector);
  const pageNum = Math.floor(Math.random() * 3 + 1);
  const limit = Math.floor(Math.random() * 5 + 1);

  useEffect(() => {
    dispatch(user.requestAll({ limit: limit, pageNumber: pageNum }));
  }, []);

  useEffect(() => {
    dispatch(post.requestSubscribed());

    // dispatch(
    //   chat.getConversations({
    //     pageNum: pageNum,
    //     limit: limit,
    //   })
    // );
  }, []);
  useEffect(() => {
    dispatch(post.requestNotifications());
  }, []);

  return (
    <motion.div initial='hidden' animate='visible' variants={variants}>
      {fetching === true && <LinearProgress />}
      <Layout>
        <Head>
          <title>Explore - xclusiveme</title>
        </Head>
        <Container maxWidth='md' disableGutters>
          <Grid container className={classes.root}>
            <Grid item xs={12} md={8}>
              {posts && posts.length > 0 ? (
                posts.map((p, i) => (
                  <Box key={i} mb={2}>
                    <Post
                      post={p}
                      profileData={p.user}
                      callbackAction={() => {
                        dispatch(post.requestSubscribed());
                      }}
                    />
                  </Box>
                ))
              ) : (
                <NothingHere />
              )}
            </Grid>

            {!isMobile && (
              <Grid
                item
                xs={12}
                md={4}
                style={{
                  overflow: 'hidden',
                  paddingLeft: '16px',
                }}
              >
                <Typography>Suggestions For You</Typography>
                <List>
                  {suggestion?.map(
                    (s, i) =>
                      s?.username && (
                        <ListItem key={`suggestions${i}`}>
                          <ListItemAvatar>
                            <ImageAvatar src={s?.profileImage} />
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <Typography variant='body2'>
                                {s.fullName}
                              </Typography>
                            }
                            secondary={
                              <Typography
                                variant='caption'
                                color='textSecondary'
                              >
                                Suggested for you
                              </Typography>
                            }
                          />

                          <ListItemSecondaryAction>
                            <NextLink href={`/x/${s.username}`} passHref>
                              <Link>
                                <div>
                                  <Typography variant='caption'>
                                    See Profile
                                  </Typography>
                                </div>
                              </Link>
                            </NextLink>
                          </ListItemSecondaryAction>
                        </ListItem>
                      )
                  )}
                </List>
              </Grid>
            )}
          </Grid>
        </Container>
      </Layout>
    </motion.div>
  );
}
