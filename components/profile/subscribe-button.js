import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';
import NormalCaseButton from '../NormalCaseButton';
import { currencySymbol } from '../../services/currencySymbol';

export const SubscribeUser = ({ price, handleFollow }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <NormalCaseButton
        startIcon={`${currencySymbol}${price}`}
        size='small'
        variant='outlined'
        onClick={handleClickOpen}
      >
        <span>Subscribe</span>
      </NormalCaseButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'Subscribe User?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Are you sure you want to continue.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <NormalCaseButton onClick={handleClose} color='primary'>
            Cancel
          </NormalCaseButton>
          <NormalCaseButton
            onClickCapture={handleFollow}
            color='primary'
            autoFocus
          >
            Confirm
          </NormalCaseButton>
        </DialogActions>
      </Dialog>
    </>
  );
};
