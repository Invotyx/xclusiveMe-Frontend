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
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ShareIcon from '@material-ui/icons/Share';
import styles from './profile.module.css';
import TextField from '@material-ui/core/TextField';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

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
