import Head from 'next/head';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import HomeLegend from './components/home-legend';
import TileButton from './components/TileButton';
import TileTextField from './components/TileTextField';
import LogoGuest from './components/logo-guest';

const useStyles = makeStyles((theme) => ({
  grey: {
    color: '#666',
  },
  marginRight: {
    marginRight: '24px',
  },
  uppercase: {
    textTransform: 'uppercase',
  },
}));

export default function SignInSide() {
  const classes = useStyles();

  return (
    <>
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
          <Box p={8} mx={4}>
            <Box mt={8} mb={4} ml={2}>
              <Typography component='h1' variant='h5'>
                <small
                  className={`${classes.grey} ${classes.marginRight} ${classes.uppercase}`}
                >
                  Sign in
                </small>{' '}
                <small className={`${classes.grey} ${classes.marginRight}`}>
                  |
                </small>{' '}
                LOGIN
              </Typography>
            </Box>
            <form noValidate>
              <TileTextField
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
                      <Link href='#' variant='body2' className={classes.grey}>
                        Forgot your password?
                      </Link>
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
    </>
  );
}
