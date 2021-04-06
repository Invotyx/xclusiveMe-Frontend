import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const StyledButton = withStyles({
  root: {
    borderRadius: 0,
  },
})(Button);
export default StyledButton;
