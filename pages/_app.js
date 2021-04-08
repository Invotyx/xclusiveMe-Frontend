import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { darkTheme } from '../theme';
import { makeStyles } from '@material-ui/core/styles';
import Head from 'next/head';
import configureStore, { history } from '../store';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router/immutable';
import rootSaga from '../sagas';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#000',
  },
}));

function MyApp({ Component, pageProps }) {
  const classes = useStyles();

  React.useEffect(() => {
    const initialState = {};
    const store = configureStore(initialState);
    store.runSaga(rootSaga);

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
      <Provider store={store}>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <ConnectedRouter history={history}>
            <Component {...pageProps} />
          </ConnectedRouter>
        </ThemeProvider>
      </Provider>
    </>
  );
}

export default MyApp;
