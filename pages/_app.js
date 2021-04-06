import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { darkTheme } from '../theme';
import Image from 'next/image';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Grid container component='main'>
          <Grid item xs={12}>
            <Box p={8}>
              <Image width={50} height={50} src='/logo.png' alt='Logo' />
            </Box>
          </Grid>
          <Component {...pageProps} />
        </Grid>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
