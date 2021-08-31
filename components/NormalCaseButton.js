import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const NormalCaseButton = withStyles({
  label: {
    textTransform: 'none',
  },
  disabled: {
    color: '#FFFFFF !important',
    backgroundColor: '#000000 !important',
  },
})(Button);
export default NormalCaseButton;
