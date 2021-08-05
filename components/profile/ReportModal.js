import React, { useEffect, useState } from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { paymentMethod } from '../../actions/payment-method';
import { paymentMethodDataSelector } from '../../selectors/paymentMethodSelector';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import ShareIcon from '@material-ui/icons/Share';
import styles from './profile.module.css';
import TextField from '@material-ui/core/TextField';

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

const ReportModal = ({ openReportModal, setreportModal, post }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [purchased, setPurchased] = useState(false);
  const paymentData = useSelector(paymentMethodDataSelector);
  const isMobile = useMediaQuery({ query: '(max-width: 760px)' });

  const handlePurchase = () => {
    setPurchased(true);
    setreportModal(false);
    // dispatch(
    //   postData?.purchasePost({
    //     id: post.id,
    //     callback: () => {
    //       setPurchased(true);
    //       dispatch(postData.request());
    //       dispatch(postData.requestSubscribed());
    //     },
    //   })
    // );
  };

  const handleClose = () => {
    setreportModal(false);
    setPurchased(false);
  };

  //   useEffect(() => {
  //     dispatch(paymentMethod.request());
  //   }, []);
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
                <img
                  src={post?.user?.profileImage}
                  alt='profile image'
                  width='60px'
                  height='65px'
                  style={{
                    borderRadius: '50%',
                    marginTop: '-20px',
                    marginLeft: isMobile ? '40%' : '44%',
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
                <p style={{ fontWeight: '600', fontSize: '17px' }}>
                  {/* Donate to {post?.user?.fullName} */}
                  Report this Post
                </p>
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
                {/* <p
                    style={{
                      fontSize: '40px',
                      fontWeight: '600',
                    }}
                  >
                    ${post?.price}.00
                  </p> */}

                <TextField
                  id='outlined-basic'
                  variant='outlined'
                  fullWidth
                  multiline
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
              SEND NOW
            </Button>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default ReportModal;
