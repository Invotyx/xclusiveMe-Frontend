import Head from 'next/head';
import HomeLegend from './components/home-legend';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

export default function Home() {
  return (
    <>
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

      <Grid item xs={12} sm={8} md={5}>
        <Box p={6} mx={4}>
          <Box py={4} display='block'>
            <Typography component='h1' variant='h4'>
              Exclusive club for influencers and members to share exclusive
              content.
            </Typography>
          </Box>
          <Box mr={2} mt={2} display='flex'>
            <Box mr={2}>
              <Button variant='outlined' href='/login'>
                Login
              </Button>
            </Box>
            <Box mr={2}>
              <Button variant='outlined' href='/login'>
                Create Account
              </Button>
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} sm={4} md={7}>
        <HomeLegend />
      </Grid>
    </>
  );
}
