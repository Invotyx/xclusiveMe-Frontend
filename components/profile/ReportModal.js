import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import TextField from '@material-ui/core/TextField';
import LoadingOverlay from 'react-loading-overlay';
import BounceLoader from 'react-spinners/BounceLoader';
import { fetchingSelector } from '../../selectors/postSelector';
import ImageAvatar from '../image-avatar';
import ProfileImageAvatar from './profile-image-avatar';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: 'black',
    border: 'none',
    boxShadow: theme.shadows[5],
    width: 'auto',
    height: 'auto',
    borderRadius: '8px',
  },
}));

const ReportModal = ({
  openReportModal,
  setreportModal,
  title,
  profileImage,
  onConfirm,
}) => {
  const classes = useStyles();
  const isMobile = useMediaQuery({ query: '(max-width: 760px)' });
  const [postText, set_postText] = useState('');
  const fetchData = useSelector(fetchingSelector);

  const handlePurchase = () => {
    if (!postText || postText.trim() === '') {
      return;
    }
    onConfirm && onConfirm(postText, () => setreportModal(false));
  };

  const handleClose = () => {
    set_postText('');
    setreportModal(false);
  };

  return (
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
        <LoadingOverlay active={fetchData} spinner={<BounceLoader />}>
          <div className={classes.paper}>
            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '90%',
                  }}
                >
                  <ProfileImageAvatar
                    user={profileImage}
                    style={{
                      borderRadius: '50%',
                      marginTop: '-20px',
                      marginLeft: isMobile ? '40%' : '44%',
                      width: '60px',
                      height: '60px',
                    }}
                  />
                  <CloseIcon
                    onClick={handleClose}
                    style={{
                      marginTop: '20px',
                      width: '30px',
                      height: '30px',
                      cursor: 'pointer',
                    }}
                  />
                </div>
              </div>
              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <p style={{ fontWeight: '600', fontSize: '17px' }}>{title}</p>
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginBottom: '10px',
                  marginLeft: '10px',
                  marginRight: '10px',
                }}
              >
                <div>
                  <TextField
                    id='outlined-basic'
                    variant='outlined'
                    fullWidth
                    multiline
                    value={postText}
                    onChange={e => set_postText(e.target.value)}
                    rows={3}
                    placeholder='Write something...'
                    style={{ width: isMobile ? '80vw' : '30vw' }}
                  />
                </div>
              </div>

              <Button
                variant='contained'
                style={{
                  backgroundColor: '#67E697',
                  color: 'white',
                  width: isMobile ? '80vw' : '30vw',
                  margin: '20px',
                  marginTop: '10px',
                }}
                onClick={handlePurchase}
              >
                Report
              </Button>
            </div>
          </div>
        </LoadingOverlay>
      </Fade>
    </Modal>
  );
};

export default ReportModal;
