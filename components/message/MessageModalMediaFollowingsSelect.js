import React, { useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { user as userAction } from '../../actions/user';
import {
  currentUserFollowingsSelector,
  currentUserSelector,
} from '../../selectors/authSelector';
import { followingSelector } from '../../selectors/userSelector';

export default function MessageModalMediaFollowingsSelect(props) {
  const currentUser = useSelector(currentUserSelector);
  const following = useSelector(followingSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    currentUser &&
      dispatch(
        userAction.followings({ userId: currentUser?.id, limit: 5, page: 1 })
      );
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
      {following?.map((f, i) => (
        <MenuItem value={f.id} key={`followings${i}`}>
          {f.fullName || 'name'}
        </MenuItem>
      ))}
    </TextField>
  );
}
