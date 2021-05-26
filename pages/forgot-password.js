import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { variants } from '../services/framer-variants';
import Head from 'next/head';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import AuthNav from '../components/auth-nav';
import { makeStyles } from '@material-ui/core/styles';
import HomeLegend from '../components/home-legend';
import TileButton from '../components/TileButton';
import TileTextField from '../components/TileTextField';
import LogoGuest from '../components/layouts/logo-guest';
import Container from '@material-ui/core/Container';
import { auth } from '../actions/auth';
import { fetchingSelector } from '../selectors/authSelector';

const useStyles = makeStyles((theme) => ({
  grey: {
    color: '#666',
  },
}));

export default function SignInSide() {
  const fetching = useSelector(fetchingSelector);
  const dispatch = useDispatch();
  const classes = useStyles();
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      auth.forgotPassword({
        email,
        callback: () => {
          router.push('/login');
        },
      })
    );
  };

  return (
    <Container>
      <Head>
        <title>Login</title>
      </Head>
      <Grid container component='main'>
        <Grid item xs={12}>
          <LogoGuest />
        </Grid>
        <Grid item xs={12} sm={8} md={5}>
          <Box pl={8} pr={8} mx={4}>
            <AuthNav />
            <form onSubmit={handleSubmit}>
              <TileTextField
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                autoFocus
              />
              <TileButton
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                disabled={fetching}
              >
                Proceed
              </TileButton>
            </form>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4} md={7}>
          <HomeLegend />
        </Grid>
      </Grid>
    </Container>
  );
}
