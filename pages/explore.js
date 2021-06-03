import { motion } from 'framer-motion';
import { variants } from '../services/framer-variants';
import Head from 'next/head';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Post from '../components/profile/post';
import { makeStyles } from '@material-ui/core/styles';
import Layout from '../components/layouts/layout-auth';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { post } from '../actions/post';
import { subscribedSelector } from '../selectors/postSelector';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import NothingHere from '../components/profile/nothing-here';

const useStyles = makeStyles((theme) => ({
  root: {
    // marginTop: '150px',
  },
}));

export default function Home() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const posts = useSelector(subscribedSelector);

  useEffect(() => {
    dispatch(post.requestSubscribed());
  }, []);

  return (
    <motion.div initial='hidden' animate='visible' variants={variants}>
      <Layout>
        <Head>
          <title>xclusiveme</title>
        </Head>
        <Container maxWidth='md' disableGutters>
          <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
              {posts && posts.length > 0 ? (
                posts.map((post, i) => (
                  <Box key={i} mb={2}>
                    <Post post={post} profileData={post.user} />
                  </Box>
                ))
              ) : (
                <NothingHere />
              )}
            </Grid>
          </Grid>
        </Container>
      </Layout>
    </motion.div>
  );
}
