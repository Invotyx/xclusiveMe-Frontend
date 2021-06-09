import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const NormalCaseButton = withStyles({
  label: {
    textTransform: 'none',
  },
  disabled: {
    color: '#222 !important',
    backgroundColor: '#111 !important',
  },
})(Button);
export default NormalCaseButton;
