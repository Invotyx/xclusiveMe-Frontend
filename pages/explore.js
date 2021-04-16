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
      <Container maxWidth='md'>
        <Grid container className={classes.root}>
          <Grid item xs={12}>
            <Post />
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}
