import React from 'react';
import withStyles from '@mui/styles/withStyles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import MuiDialogTitle from '@mui/material/DialogTitle';
import MuiDialogContent from '@mui/material/DialogContent';
import MuiDialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import {
  fetchingSelector,
  postDataSelector,
} from '../../../selectors/postSelector';
import { useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;

  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant='h6'>{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label='close'
          className={classes.closeButton}
          onClick={onClose}
          size="large">
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function CustomizedDialogs() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant='outlined' onClick={handleClickOpen}>
        Add Bank
      </Button>

      <Dialog
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}
        maxWidth='sm'
        fullWidth={true}
      >
        <DialogTitle id='customized-dialog-title' onClose={handleClose}>
          Add a bank
        </DialogTitle>

        <DialogContent dividers>content here</DialogContent>
        {false && (
          <DialogActions>
            <Button
              autoFocus
              onClick={handleClose}
              color='primary'
              variant='contained'
            >
              Continue
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </>
  );
}
