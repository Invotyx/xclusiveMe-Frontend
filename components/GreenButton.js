import NormalCaseButton from './NormalCaseButton';
import { ThemeProvider, StyledEngineProvider, createTheme, adaptV4Theme } from '@mui/material/styles';

const theme = createTheme(adaptV4Theme({
  palette: {
    primary: { main: '#2ae597', contrastText: '#fff' },
  },
}));

export default function GreenButton(props) {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <NormalCaseButton {...props} />
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
