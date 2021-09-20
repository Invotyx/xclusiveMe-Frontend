import ListItem from '@mui/material/ListItem';
import withStyles from '@mui/styles/withStyles';

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
