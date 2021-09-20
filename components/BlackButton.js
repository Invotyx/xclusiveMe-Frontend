import Button from '@mui/material/Button';
import { ThemeProvider, StyledEngineProvider, createTheme, adaptV4Theme } from '@mui/material/styles';

import withStyles from '@mui/styles/withStyles';

const theme = createTheme(adaptV4Theme({
  palette: {
    mode: 'dark',
    primary: {
      light: '#000',
      main: '#fff',
      dark: '#000',
      contrastText: '#fff',
    },
  },
}));

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
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <StyledButton {...props} />
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
