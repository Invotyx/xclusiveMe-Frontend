import { motion } from 'framer-motion';
import { variants } from '../services/framer-variants';
import Head from 'next/head';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Post from '../components/post';
import { makeStyles } from '@material-ui/core/styles';
import Layout from '../components/layout-auth';

const useStyles = makeStyles((theme) => ({
  root: {
    // marginTop: '150px',
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <motion.div initial='hidden' animate='visible' variants={variants}>
      <Layout>
        <Head>
          <title>xclusiveme</title>
        </Head>
        <Container maxWidth='md' disableGutters>
          <Grid container className={classes.root}>
            <Grid item xs={12}>
              <Post />
            </Grid>
          </Grid>
        </Container>
      </Layout>
    </motion.div>
  );
}
