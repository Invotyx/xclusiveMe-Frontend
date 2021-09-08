import { motion } from 'framer-motion';
import { variants } from '../services/framer-variants';
import Head from 'next/head';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Suggestions from '../components/Suggestions';
import Post from '../components/profile/post';
import { makeStyles } from '@material-ui/core/styles';
import Layout from '../components/layouts/layout-auth';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { post } from '../actions/post';
import { subscribedSelector } from '../selectors/postSelector';
import Box from '@material-ui/core/Box';
import NothingHere from '../components/profile/nothing-here';
import { useMediaQuery } from 'react-responsive';
import LinearProgress from '@material-ui/core/LinearProgress';
import { fetchingSelector } from '../selectors/postSelector';

const useStyles = makeStyles(() => ({
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
                  <Box key={i} mb={2} className={i === 0 ? 'step-1' : ''}>
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
                <NothingHere className='step-1' />
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
                <Suggestions />
              </Grid>
            )}
          </Grid>
        </Container>
      </Layout>
    </motion.div>
  );
}
