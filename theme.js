import { createMuiTheme } from '@material-ui/core/styles';

const darkText = '#666';
const darkBg = '#111';
const darkBorder = '#222';
const white = '#fff';
const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    background: {
      default: '#000',
    },
    primary: {
      light: '#f00',
      main: white,
      dark: '#ddd',
      contrastText: '#000',
    },
    secondary: {
      light: '#f0f',
      main: white,
      dark: '#0ff',
      contrastText: white,
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
    MuiOutlinedInput: {
      notchedOutline: {
        borderColor: darkBorder,
      },
    },
    MuiButton: {
      outlined: {
        borderColor: white,
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
