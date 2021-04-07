import { createMuiTheme } from '@material-ui/core/styles';

const darkText = '#666';
const darkBg = '#111';
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
        backgroundColor: darkBg,
      },
    },
    MuiListItemText: {
      secondary: {
        color: darkText,
      },
    },
    MuiListItemSecondaryAction: {
      root: {
        color: darkText,
      },
    },
    MuiListItem: {
      root: {
        '&$selected': {
          backgroundColor: darkBg,
        },
      },
    },
    MuiInputBase: {
      root: {
        backgroundColor: darkBg,
        '& > input': {
          backgroundColor: darkBg,
        },
      },
    },
  },
});

export { darkTheme };
