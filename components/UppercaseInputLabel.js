import InputLabel from '@material-ui/core/InputLabel';
import { withStyles } from '@material-ui/core/styles';

const StyledInputLabel = withStyles({
  root: { textTransform: 'uppercase', color: '#666', fontSize: '0.7rem' },
})(InputLabel);
export default StyledInputLabel;
