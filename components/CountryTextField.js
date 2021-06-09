import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

export const CountryTextField = withStyles({
  select: {
    opacity: 0,
  },
})(TextField);
export default CountryTextField;
