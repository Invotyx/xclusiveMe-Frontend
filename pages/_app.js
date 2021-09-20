import React, { useEffect } from 'react';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { darkTheme } from '../theme';
import makeStyles from '@mui/styles/makeStyles';
import Head from 'next/head';
import { wrapper } from '../store';
import './App.css';
import { AppSnackbar } from '../components/AppSnackbar';
import BottomAlert from '../components/bottom-alert';

const useStyles = makeStyles(theme => ({
  // root: {
  //   marginBottom: '100px',
  // },
}));

function MyApp({ Component, pageProps }) {
  const classes = useStyles();

  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <div className={classes.root}>
      <Head>
        <title>xclusiveme</title>
        <link
          href='https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css'
          rel='stylesheet'
        />
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
      </Head>
      <>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Component {...pageProps} />
            <AppSnackbar />
            <BottomAlert />
          </ThemeProvider>
        </StyledEngineProvider>
      </>
    </div>
  );
}

export default wrapper.withRedux(MyApp);
