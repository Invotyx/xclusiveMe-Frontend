import React from 'react';
import Image from 'next/image';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
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
        >
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
        style={{ height: '60px', marginTop: '15px' }}
        startIcon={
          <Image
            width={30}
            height={30}
            src='/new-post-icon.svg'
            alt='new post'
          />
        }
        onClick={handleClickOpen}
      >
        <span
          style={{
            fontWeight: 500,
            fontStyle: 'normal',
            fontSize: '16px',
            lineHeight: '18px',
          }}
        >
          {' '}
          New Post
        </span>
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
