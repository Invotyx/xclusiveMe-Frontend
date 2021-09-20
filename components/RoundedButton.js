import Button from '@mui/material/Button';
import withStyles from '@mui/styles/withStyles';

const RoundedButton = withStyles({
  root: {
    borderRadius: '30px',
    paddingLeft: '30px',
    paddingRight: '30px',
    backgroundColor: '#111',
  },
})(Button);
export default RoundedButton;
