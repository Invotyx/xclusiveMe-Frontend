import ListItem from '@material-ui/core/ListItem';
import { withStyles } from '@material-ui/core/styles';

const StyledListItem = withStyles({
  root: {
    color: '#999',
    '&:hover': {
      color: '#fff',
    },
  },
  selected: {
    color: '#fff',
    backgroundColor: 'transparent !important',
    borderRight: '2px solid #fff',
  },
})(ListItem);
export default StyledListItem;
