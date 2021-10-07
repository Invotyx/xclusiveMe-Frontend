import ListItem from '@material-ui/core/ListItem';
import { withStyles } from '@material-ui/core/styles';

const StyledListItem = withStyles({
  root: {
    '& .MuiListItemText-root .MuiListItemText-primary': {
      color: '#868686',
    },
    '&:hover': {
      color: '#fff',
    },
  },
  selected: {
    '& .MuiListItemText-root .MuiListItemText-primary': {
      color: '#fff',
    },
    backgroundColor: 'transparent !important',
    borderRight: '2px solid #fff',
  },
})(ListItem);
export default StyledListItem;
