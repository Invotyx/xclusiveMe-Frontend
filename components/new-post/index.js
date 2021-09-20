import React from 'react';
import Image from 'next/image';
import withStyles from '@mui/styles/withStyles';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import MuiDialogTitle from '@mui/material/DialogTitle';
import MuiDialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import RoundedButton from '../RoundedButton';
import NewPostForm from './new-post-form';

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
      <Box textAlign='center'>
        <Typography variant='h6'>{children}</Typography>
      </Box>
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

export default function NewPostDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <RoundedButton
        color='inherit'
        startIcon={
          <Image
            width={20}
            height={20}
            src='/new-post-icon.svg'
            alt='new post'
          />
        }
        onClick={handleClickOpen}
      >
        New Post
      </RoundedButton>
      <Dialog
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}
        maxWidth='sm'
        fullWidth={true}
        disableEscapeKeyDown
      >
        <DialogTitle id='customized-dialog-title' onClose={handleClose}>
          Create a new post
        </DialogTitle>
        <DialogContent>
          <NewPostForm afterSave={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}
