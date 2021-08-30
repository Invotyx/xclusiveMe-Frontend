import React, { useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../../actions/auth';
import {
  currentUserFollowingsSelector,
  currentUserSelector,
} from '../../selectors/authSelector';

export default function MessageModalMediaFollowingsSelect(props) {
  const currentUser = useSelector(currentUserSelector);
  const followings = useSelector(currentUserFollowingsSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    currentUser &&
      dispatch(auth.requestFollowings({ currentUserId: currentUser?.id }));
  }, [currentUser]);

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
        <MenuItem value={f.id} key={`followings${i}`}>
          {f.fullName || 'name'}
        </MenuItem>
      ))}
    </TextField>
  );
}
