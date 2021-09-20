import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import {
  severitySelector,
  openSelector,
  snackbarMessageSelector,
} from '../selectors/snackbarSelector';
import { snackbar } from '../actions/snackbar';

export const AppSnackbar = () => {
  const dispatch = useDispatch();
  const position = {
    vertical: 'bottom',
    horizontal: 'right',
  };
  const severity = useSelector(severitySelector);
  const open = useSelector(openSelector);
  const message = useSelector(snackbarMessageSelector);
  useEffect(() => {
    dispatch(snackbar.update({ open, message, severity }));
  }, [open]);
  const handleClose = () => {
    dispatch(snackbar.update({ open: false }));
  };
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={position}
      TransitionComponent={Slide}
    >
      <Alert onClose={handleClose} severity={severity} variant='filled'>
        {message}
      </Alert>
    </Snackbar>
  );
};
