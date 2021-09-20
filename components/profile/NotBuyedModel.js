import React, { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import makeStyles from '@mui/styles/makeStyles';
import { paymentMethod } from '../../actions/payment-method';
import { paymentMethodDataSelector } from '../../selectors/paymentMethodSelector';
import { useDispatch, useSelector } from 'react-redux';
import useMediaQuery from '@mui/material/useMediaQuery';
import ShareIcon from '@mui/icons-material/Share';
import styles from './profile.module.css';
import TextField from '@mui/material/TextField';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

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

const NotBuyedModal = ({ notByedModal, setnotBuyedModal, post }) => {
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width: 760px)');
  const handleClose = () => {
    setnotBuyedModal(false);
  };

  return (
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      className={classes.modal}
      open={notByedModal}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <div className={classes.paper}>
        <Fade in={notByedModal}>
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
                    width: '35px',
                    height: '35px',
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
                <p
                  style={{
                    fontWeight: '600',
                    fontSize: '17px',
                    padding: '30px',
                  }}
                >
                  Please buy post to view details
                </p>
              </div>
            </div>
          </div>
        </Fade>
      </div>
    </Modal>
  );
};

export default NotBuyedModal;
