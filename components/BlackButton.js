import Button from '@material-ui/core/Button';
import {
  MuiThemeProvider,
  createMuiTheme,
  withStyles,
} from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      light: '#000',
      main: '#fff',
      dark: '#000',
      contrastText: '#fff',
    },
  },
});

const StyledButton = withStyles({
  contained: {
    color: '#fff',
    backgroundColor: '#000',
    '&:hover': {
      color: '#ccc',
      backgroundColor: '#000',
    },
  },
})(Button);

export default function BlackButton(props) {
  return (
    <MuiThemeProvider theme={theme}>
      <StyledButton {...props} />
    </MuiThemeProvider>
  );
}
