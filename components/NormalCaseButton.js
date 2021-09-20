import Button from '@mui/material/Button';
import withStyles from '@mui/styles/withStyles';

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
