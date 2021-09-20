import Button from '@mui/material/Button';
import withStyles from '@mui/styles/withStyles';

const DepressedButton = withStyles({
  root: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
})(Button);
export default DepressedButton;
