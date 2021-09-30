import { createTheme } from '@material-ui/core/styles';

const darkText = '#666';
const darkBg = '#111';
const darkBorder = '#222';
const white = '#fff';
const darkTheme = createTheme({
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
      primary: {
        color: white,
      },
      secondary: {
        color: darkText,
      },
    },
    MuiListItemSecondaryAction: {
      root: {
        color: darkText,
      },
    },
    MuiBackdrop: {
      root: {
        backgroundColor: `rgba(50, 50, 50, 0.5)`,
      },
    },
    MuiMenuItem: {
      root: {
        minWidth: '260px',
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
    MuiDialog: {
      paper: {
        backgroundColor: '#000',
      },
    },
    MuiButton: {
      outlined: {
        borderColor: white,
      },
    },
    MuiInputBase: {
      root: {
        backgroundColor: '#000',
        '& > input': {
          backgroundColor: '#000',
        },
      },
    },
  },
});

export { darkTheme };
