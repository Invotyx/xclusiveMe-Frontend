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
import { useEffect } from 'react';
import { post } from '../actions/post';
import { subscribedSelector } from '../selectors/postSelector';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import NothingHere from '../components/profile/nothing-here';

const useStyles = makeStyles(theme => ({
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
            <Grid item xs={12} md={8}>
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
            <Grid item xs={12} md={4}>
              <Typography>Suggestions For You</Typography>
              <List>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar
                      src={'https://material-ui.com/static/images/avatar/1.jpg'}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant='body2'>John Doe</Typography>
                    }
                    secondary={
                      <Typography variant='caption' color='textSecondary'>
                        Suggested for you
                      </Typography>
                    }
                  />
                  <ListItemSecondaryAction>
                    <Link>
                      <Typography variant='caption'>See Profile</Typography>
                    </Link>
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Container>
      </Layout>
    </motion.div>
  );
}
