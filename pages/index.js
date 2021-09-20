import NextLink from 'next/link';
import Head from 'next/head';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import LayoutGuest from '../components/layouts/layout-guest';
import { currentUserSelector } from '../selectors/authSelector';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import React from 'react';
import { auth } from '../actions/auth';

export default function Home() {
  const me = useSelector(currentUserSelector);
  const router = useRouter();
  const dispatch = useDispatch();
  React.useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    token && dispatch(auth.me());
  }, []);
  React.useEffect(() => {
    if (Boolean(me)) {
      router.push('/explore');
    }
  }, [me]);

  return (
    <LayoutGuest>
      <Head>
        <title>Home - xclusiveme</title>
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
              <NextLink href='/login' passHref>
                <Button variant='outlined'>Login</Button>
              </NextLink>
            </Box>
            <Box mr={2}>
              <NextLink href='/register' passHref>
                <Button variant='outlined'>Create Account</Button>
              </NextLink>
            </Box>
          </Box>
        </Box>
      </Grid>
    </LayoutGuest>
  );
}
