import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import Head from 'next/head';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
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
import { currentUserSelector } from '../selectors/authSelector';
import styles from './pages.module.css';
import { withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  grey: {
    color: '#666',
  },
}));

// const TileTextFieldXX = withStyles({
//   root: {
//     color: 'red',
//     '& .MuiInputLabel-root': {
//       color: 'purple',
//     },
//   },
// })(TextField);

export default function SignInSide() {
  const fetching = useSelector(fetchingSelector);
  const currentUser = useSelector(currentUserSelector);
  const dispatch = useDispatch();
  const classes = useStyles();
  const router = useRouter();
  const [registrationState, set_registrationState] = useState(1);
  const [sessionId, set_sessionId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');

  const handleSuccessfulLogin = () => {
    const { redirectTo } = router.query;
    router.replace(Boolean(redirectTo) ? encodeURI(redirectTo) : '/explore');
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (registrationState === 1) {
      dispatch(
        auth.login({
          email,
          password,
          callback: handleSuccessfulLogin,
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
          callback: handleSuccessfulLogin,
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
            inputProps={{
              style: {
                WebkitBoxShadow: '0 0 0 1000px #000 inset',
                fontFamily: 'Poppins',
              },
            }}
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
            inputProps={{
              style: {
                WebkitBoxShadow: '0 0 0 1000px #000 inset',
                fontFamily: 'Poppins',
              },
            }}
          />
          <Box my={2}>
            <Grid container>
              <Grid item xs>
                <Box mb={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value='remember'
                        size='medium'
                        style={{
                          color: '#444444',
                          fontWeight: 2,
                        }}
                      />
                    }
                    label={
                      <Typography variant='body2'>
                        {' '}
                        <span className={styles.forgetPassword}>
                          {' '}
                          Remember me?
                        </span>
                      </Typography>
                    }
                    size='small'
                    className={classes.grey}
                  />
                </Box>
              </Grid>
              <Grid item xs>
                <Box mb={2} mt={1.2}>
                  <NextLink href='/forgot-password' passHref>
                    <Link variant='body2' className={classes.grey}>
                      <span className={styles.forgetPassword}>
                        Forgot your password?
                      </span>
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
            style={{
              fontFamily: 'Poppins',
              fontWeight: 500,
              fontStyle: 'normal',
              fontSize: ' 17px',
              lineHeight: '30px',
            }}
            // disabled={fetching}
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
            autoFocus
            name='code'
            autoComplete='code'
            inputProps={{
              style: {
                WebkitBoxShadow: '0 0 0 1000px #000 inset',
                fontFamily: 'Poppins',
              },
            }}
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
              style={{
                fontFamily: 'Poppins',
                fontWeight: 500,
                fontStyle: 'normal',
                fontSize: ' 17px',
                lineHeight: '30px',
              }}
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
