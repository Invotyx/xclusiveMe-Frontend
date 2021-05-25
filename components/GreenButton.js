import NormalCaseButton from './NormalCaseButton';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
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
