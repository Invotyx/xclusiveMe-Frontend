import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const NormalCaseButton = withStyles({
  label: {
    textTransform: 'none',
  },
})(Button);
export default NormalCaseButton;
