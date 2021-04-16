import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import Head from 'next/head';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import NextLink from 'next/link';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import AuthNav from '../components/auth-nav';
import { makeStyles } from '@material-ui/core/styles';
import HomeLegend from '../components/home-legend';
import TileButton from '../components/TileButton';
import TileTextField from '../components/TileTextField';
import LogoGuest from '../components/logo-guest';
import Container from '@material-ui/core/Container';
import { auth } from '../actions/auth';

const useStyles = makeStyles((theme) => ({
  grey: {
    color: '#666',
  },
}));

export default function SignInSide() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      auth.login({
        email,
        password,
        callback: () => {
          router.push('/explore');
        },
      })
    );
  };

  return (
    <Container>
      <Head>
        <title>Login</title>
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
              <TileTextField
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant='outlined'
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
              />
              <Box my={2}>
                <Grid container>
                  <Grid item xs>
                    <Box mb={2}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            value='remember'
                            color='primary'
                            size='small'
                          />
                        }
                        label='Remember me'
                        size='small'
                        className={classes.grey}
                      />
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box mb={2} mt={1}>
                      <NextLink href='/explore'>
                        <Link variant='body2' className={classes.grey}>
                          <a>Forgot your password?</a>
                        </Link>
                      </NextLink>
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              <TileButton
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
              >
                Login
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
