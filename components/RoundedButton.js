import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const RoundedButton = withStyles({
  root: {
    borderRadius: '30px',
    paddingLeft: '30px',
    paddingRight: '30px',
    backgroundColor: '#111',
  },
})(Button);
export default RoundedButton;
