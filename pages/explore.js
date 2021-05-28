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
          <Grid container className={classes.root}>
            <Grid item xs={12}>
              {posts && posts.length > 0 ? (
                posts.map((post, i) => (
                  <Post key={i} post={post} profileData={post.user} />
                ))
              ) : (
                <Box
                  textAlign='center'
                  p={4}
                  bgcolor='#222'
                  border='1px solid #111'
                >
                  <Typography color='textSecondary'>
                    nothing to display
                  </Typography>
                </Box>
              )}
            </Grid>
          </Grid>
        </Container>
      </Layout>
    </motion.div>
  );
}
