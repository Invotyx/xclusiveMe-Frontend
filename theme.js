import { createMuiTheme } from '@material-ui/core/styles';

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    background: {
      default: '#000',
    },
    primary: {
      light: '#f00',
      main: '#fff',
      dark: '#ddd',
      contrastText: '#000',
    },
    secondary: {
      light: '#f0f',
      main: '#fff',
      dark: '#0ff',
      contrastText: '#fff',
    },
  },
  overrides: {
    MuiPaper: {
      root: {
        backgroundColor: '#111',
      },
    },
  },
});

export { darkTheme };
