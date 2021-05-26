import NextLink from 'next/link';
import Head from 'next/head';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import LayoutGuest from '../components/layouts/layout-guest';

export default function Home() {
  return (
    <LayoutGuest>
      <Head>
        <title>xclusiveme</title>
      </Head>
      <Grid item xs={12} sm={8} md={5}>
        <Box pl={6} pr={6} pt={2} mx={4}>
          <Box py={4} display='block'>
            <Typography component='h1' variant='h4'>
              Exclusive club for influencers and members to share exclusive
              content.
            </Typography>
          </Box>
          <Box mr={2} mt={2} display='flex'>
            <Box mr={2}>
              <NextLink href='/login'>
                <Button variant='outlined'>Login</Button>
              </NextLink>
            </Box>
            <Box mr={2}>
              <NextLink href='/register'>
                <Button variant='outlined'>Create Account</Button>
              </NextLink>
            </Box>
          </Box>
        </Box>
      </Grid>
    </LayoutGuest>
  );
}
