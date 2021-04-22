import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import AuthNav from '../components/auth-nav';
import { makeStyles } from '@material-ui/core/styles';
import HomeLegend from '../components/home-legend';
import TileButton from '../components/TileButton';
import TileTextField from '../components/TileTextField';
import LogoGuest from '../components/logo-guest';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { auth } from '../actions/auth';
import { fetchingSelector, errorSelector } from '../selectors/authSelector';

const useStyles = makeStyles((theme) => ({
  grey: {
    color: '#666',
  },
}));

export default function SignInSide() {
  const fetching = useSelector(fetchingSelector);
  const error = useSelector(errorSelector);
  useEffect(() => {
    if (error?.response?.data?.errors) {
    }
  }, [error]);
  const dispatch = useDispatch();
  const classes = useStyles();
  const router = useRouter();
  const [registrationState, set_registrationState] = useState(1);
  const [sessionId, set_sessionId] = useState('');
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (registrationState === 1) {
      dispatch(
        auth.register({
          fullName,
          username,
          email,
          password,
          phoneNumber,
          callback: (sid) => {
            set_registrationState(2);
            set_sessionId(sid);
          },
        })
      );
    }
    if (registrationState === 2) {
      dispatch(
        auth.verifyOtp({
          sessionId,
          code,
          callback: () => {
            router.push('/explore');
          },
        })
      );
    }
  };

  return (
    <Container>
      <Head>
        <title>Register</title>
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
            {registrationState === 1 && (
              <form onSubmit={handleSubmit}>
                <TileTextField
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  variant='outlined'
                  margin='normal'
                  required
                  fullWidth
                  id='fullName'
                  label='Full Name'
                  name='fullName'
                  autoComplete='fullName'
                />
                <TileTextField
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  variant='outlined'
                  margin='normal'
                  required
                  fullWidth
                  id='username'
                  label='Username'
                  name='username'
                  autoComplete='username'
                />
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
                <TileTextField
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  variant='outlined'
                  margin='normal'
                  required
                  fullWidth
                  id='phoneNumber'
                  label='Phone Number'
                  name='phoneNumber'
                  autoComplete='phoneNumber'
                />
                <Box my={2}>
                  <TileButton
                    type='submit'
                    fullWidth
                    variant='contained'
                    color='primary'
                    disabled={fetching}
                  >
                    Register
                  </TileButton>
                </Box>
              </form>
            )}
            {registrationState === 2 && (
              <form onSubmit={handleSubmit}>
                <TileTextField
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  variant='outlined'
                  margin='normal'
                  required
                  fullWidth
                  id='code'
                  label='Enter Code'
                  name='code'
                  type='number'
                  autoComplete='code'
                />
                <Box textAlign='center' mt={1}>
                  <NextLink href='#' passHref>
                    <Link
                      variant='body2'
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(
                          auth.resendOtp({
                            sessionId,
                            callback: (sid) => {
                              set_sessionId(sid);
                            },
                          })
                        );
                      }}
                    >
                      Resend OTP
                    </Link>
                  </NextLink>
                </Box>
                <Box my={2}>
                  <TileButton
                    type='submit'
                    fullWidth
                    variant='contained'
                    color='primary'
                  >
                    Verify
                  </TileButton>
                  <Box textAlign='center' mt={1}>
                    <NextLink href='#' passHref>
                      <Link
                        variant='body2'
                        onClick={(e) => {
                          e.preventDefault();
                          set_registrationState(1);
                        }}
                      >
                        Cancel
                      </Link>
                    </NextLink>
                  </Box>
                </Box>
              </form>
            )}
          </Box>
        </Grid>
        <Grid item xs={12} sm={4} md={7}>
          <HomeLegend />
        </Grid>
      </Grid>
    </Container>
  );
}
