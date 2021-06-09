import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import Head from 'next/head';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import NextLink from 'next/link';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TileButton from '../components/TileButton';
import TileTextField from '../components/TileTextField';
import { auth } from '../actions/auth';
import { fetchingSelector } from '../selectors/authSelector';
import LayoutGuest from '../components/layouts/layout-guest-auth';

const useStyles = makeStyles(theme => ({
  grey: {
    color: '#666',
  },
}));

export default function SignInSide() {
  const fetching = useSelector(fetchingSelector);
  const dispatch = useDispatch();
  const classes = useStyles();
  const router = useRouter();
  const [registrationState, set_registrationState] = useState(1);
  const [sessionId, set_sessionId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    if (registrationState === 1) {
      dispatch(
        auth.login({
          email,
          password,
          callback: () => {
            router.push('/explore');
          },
          callback202: sid => {
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
    <LayoutGuest>
      <Head>
        <title>Login</title>
      </Head>
      {registrationState === 1 && (
        <form onSubmit={handleSubmit}>
          <TileTextField
            value={email}
            onChange={e => setEmail(e.target.value)}
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Username'
            name='email'
            autoComplete='email'
            autoFocus
          />
          <TileTextField
            value={password}
            onChange={e => setPassword(e.target.value)}
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
                      <Checkbox value='remember' color='primary' size='small' />
                    }
                    label={<Typography variant='body2'>Remember me</Typography>}
                    size='small'
                    className={classes.grey}
                  />
                </Box>
              </Grid>
              <Grid item>
                <Box mb={2} mt={1}>
                  <NextLink href='/forgot-password' passHref>
                    <Link variant='body2' className={classes.grey}>
                      Forgot your password?
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
            disabled={fetching}
          >
            Login
          </TileButton>
        </form>
      )}
      {registrationState === 2 && (
        <form onSubmit={handleSubmit}>
          <TileTextField
            value={code}
            onChange={e => setCode(e.target.value)}
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
                onClick={e => {
                  e.preventDefault();
                  dispatch(
                    auth.resendOtp({
                      sessionId,
                      callback: sid => {
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
                  onClick={e => {
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
    </LayoutGuest>
  );
}
