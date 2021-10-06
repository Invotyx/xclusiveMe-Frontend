import NextLink from 'next/link';
import Head from 'next/head';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import LayoutGuest from '../components/layouts/layout-guest';
import { currentUserSelector } from '../selectors/authSelector';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import React from 'react';
import { auth } from '../actions/auth';
import styles from './pages.module.css';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export default function Home() {
  const me = useSelector(currentUserSelector);
  const router = useRouter();
  const isMobile = useMediaQuery('(max-width: 760px)');
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
    <React.Fragment>
      <LayoutGuest>
        <Head>
          <title>Home - xclusiveme</title>
        </Head>
        <Grid item xs={12} sm={8} md={5}>
          <Box pl={isMobile ? 1 : 6} pr={isMobile ? 3 : 6} pt={8} mx={4}>
            <Box py={4} display='block'>
              <Typography
                component='h1'
                variant='h4'
                style={{
                  fontFamily: 'Poppins',
                  fontWeight: '300',
                  width: isMobile ? '300px' : '420px',
                  fontSize: isMobile ? '22px' : '30px',
                  height: '162px',
                }}
              >
                Exclusive club for influencers and members to share exclusive
                content.
              </Typography>
            </Box>
            <Box mt={-5} display='flex'>
              <Box mr={2}>
                <NextLink href='/login' passHref>
                  <Button
                    variant='outlined'
                    style={{ border: '1px solid #444444' }}
                  >
                    <span className={styles.setFont}>Login</span>{' '}
                  </Button>
                </NextLink>
              </Box>
              <Box mr={2}>
                <NextLink href='/register' passHref>
                  <Button
                    variant='outlined'
                    style={{
                      width: isMobile ? '230px' : '250px',
                      border: '1px solid #444444',
                    }}
                  >
                    {' '}
                    <span className={styles.setFont}>Create Account</span>{' '}
                  </Button>
                </NextLink>
              </Box>
            </Box>
          </Box>
        </Grid>
      </LayoutGuest>
    </React.Fragment>
  );
}
