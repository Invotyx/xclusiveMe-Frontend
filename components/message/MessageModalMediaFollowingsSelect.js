import React, { useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../../actions/auth';
import { currentUserFollowingsSelector } from '../../selectors/authSelector';

export default function MessageModalMediaFollowingsSelect(props) {
  const followings = useSelector(currentUserFollowingsSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(auth.requestFollowings());
  }, []);

  return (
    <TextField
      select
      variant='outlined'
      fullWidth
      margin='dense'
      label='To'
      {...props}
    >
      <MenuItem>Select</MenuItem>
      {followings?.results?.map((f, i) => (
        <MenuItem value={f.user?.id} key={`followings${i}`}>
          {f.user?.fullName || 'name'}
        </MenuItem>
      ))}
    </TextField>
  );
}
