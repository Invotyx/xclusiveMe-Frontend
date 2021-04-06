import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

const StyledTextField = withStyles({
  root: {
    '& > div': {
      borderRadius: 0,
    },
  },
})(TextField);
export default StyledTextField;
