import React, { useRef } from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import { fetchingSelector } from '../../selectors/postSelector';
import ProfileImageAvatar from './profile-image-avatar';
import PostReport from './PostReport';

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

const useReportModal = ({ onConfirm }) => {
  const [openReportModal, setreportModal] = React.useState(false);
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width: 760px)');
  const priceFieldRef = useRef();
  const fetchData = useSelector(fetchingSelector);

  const handlePurchase = () => {
    if (
      !priceFieldRef.current.value ||
      priceFieldRef.current.value.trim() === ''
    ) {
      return;
    }
    onConfirm &&
      onConfirm(priceFieldRef.current.value, () => setreportModal(false));
  };

  const handleClose = () => {
    setreportModal(false);
  };

  const ReportModal = ({ title, profileImage, post }) => (
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
      <div>
        <Fade in={openReportModal}>
          <>
            <div className={classes.paper}>
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

              {post ? (
                <PostReport postid={post?.id} handleClose={handleClose} />
              ) : (
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
                      inputRef={priceFieldRef}
                      rows={3}
                      placeholder='Write something...'
                      style={{ width: isMobile ? '80vw' : '30vw' }}
                      inputProps={{
                        style: {
                          fontFamily: 'Poppins',
                        },
                      }}
                    />
                  </div>
                </div>
              )}

              {!post && (
                <div>
                  <Button
                    variant='contained'
                    style={{
                      backgroundColor: 'white',
                      color: 'black',
                      width: isMobile ? '80vw' : '30vw',
                      margin: '20px',
                      marginTop: '10px',
                      fontFamily: 'Poppins',
                      fontWeight: 500,
                      fontStyle: 'normal',
                      fontSize: ' 14px',
                      lineHeight: '30px',
                    }}
                    onClick={handlePurchase}
                  >
                    Report
                  </Button>
                </div>
              )}
            </div>
          </>
        </Fade>
      </div>
    </Modal>
  );

  return { ReportModal, setreportModal };
};

export default useReportModal;
