import React from 'react';
import { useDispatch } from 'react-redux';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { payment } from '../../actions/payment';

export default function Home(props) {
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [planId, setPlanId] = React.useState(null);
  const handleClickListItem = (event, pid) => {
    setAnchorEl(event.currentTarget);
    setPlanId(pid);
  };

  const handleEdit = () => {
    dispatch(payment.setDefault(planId));
  };

  const handleDelete = () => {
    window.confirm('Do you want proceed?') && dispatch(payment.delete(planId));
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
      <MenuItem onClick={handleEdit}>Set Default</MenuItem>
      <MenuItem onClick={handleDelete}>Delete</MenuItem>
    </Menu>
  );
}
