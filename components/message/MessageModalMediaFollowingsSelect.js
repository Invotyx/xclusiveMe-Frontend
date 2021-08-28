import React, { useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

export default function MessageModalMediaFollowingsSelect(props) {
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
    </TextField>
  );
}
