import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function ReportModal({ openReportModal, setreportModal }) {
  const classes = useStyles();

  const handleClose = () => {
    setreportModal(false);
  };

  return (
    <div>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={openReportModal}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openReportModal}>
          <div className={classes.paper}>
            <h2 id='transition-modal-title'>Report</h2>
            <form style={{ display: 'block' }}>
              <TextField
                id='outlined-basic'
                placeholder='Write Something...'
                variant='outlined'
                rows={3}
                multiline
              />
            </form>
            <Button
              variant='outlined'
              onClick={handleClose}
              style={{ marginTop: '20px', width: '10vw' }}
            >
              Send
            </Button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
