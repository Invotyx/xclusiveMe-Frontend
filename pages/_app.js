import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { darkTheme } from '../theme';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
          <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
