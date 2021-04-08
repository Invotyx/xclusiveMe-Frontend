import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { darkTheme } from '../theme';
import { makeStyles } from '@material-ui/core/styles';
import Head from 'next/head';
import { wrapper } from '../store';
import { AppSnackbar } from '../components/AppSnackbar';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#000',
  },
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
    <>
      <Head>
        <title>xclusiveme</title>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
      </Head>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Component {...pageProps} />
        <AppSnackbar />
      </ThemeProvider>
    </>
  );
}

export default wrapper.withRedux(MyApp);
