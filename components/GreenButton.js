import NormalCaseButton from './NormalCaseButton';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#2ae597', contrastText: '#fff' },
  },
});

export default function GreenButton(props) {
  return (
    <MuiThemeProvider theme={theme}>
      <NormalCaseButton {...props} />
    </MuiThemeProvider>
  );
}
