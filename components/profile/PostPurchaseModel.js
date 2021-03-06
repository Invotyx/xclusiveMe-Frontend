import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { paymentMethodDataSelector } from '../../selectors/paymentMethodSelector';
import { useSelector } from 'react-redux';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ShareIcon from '@material-ui/icons/Share';
import styles from './profile.module.css';
import { fetchingSelector } from '../../selectors/postSelector';
import CircularProgress from '@material-ui/core/CircularProgress';
import ProfileImageAvatar from './profile-image-avatar';
import { currencySymbol } from '../../services/currencySymbol';

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

const usePostPurchaseModal = () => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const classes = useStyles();
  const [purchased, setPurchased] = useState(false);
  const paymentData = useSelector(paymentMethodDataSelector);
  const isMobile = useMediaQuery('(max-width: 760px)');
  const fetchData = useSelector(fetchingSelector);

  const handleClose = () => {
    setOpenModal(false);
  };

  const PostPurchaseModal = ({ handlePurchase, modalTitle, price, user }) => (
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      className={classes.modal}
      open={openModal}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <div className={classes.paper}>
        <Fade in={openModal}>
          <>
            {purchased === false ? (
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
                      user={user}
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
                    <p style={{ fontWeight: '600', fontSize: '17px' }}>
                      {modalTitle || 'Buy this Post'}
                    </p>
                  </div>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <div>
                    <p
                      style={{
                        fontSize: '40px',
                        fontWeight: '600',
                      }}
                    >
                      {currencySymbol}
                      {price || 0}.00
                    </p>
                    <p
                      style={{
                        color: '#444444',
                        marginTop: '-40px',
                        marginLeft: '20px',
                      }}
                    >
                      Total Amount
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',

                    justifyContent: 'center',
                  }}
                >
                  <img src='/border.png' alt='border' width='90%' />
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    flexWrap: 'wrap',
                  }}
                >
                  <p>Your default payment method</p>
                  <div>
                    <div style={{ display: 'flex', marginLeft: '70px' }}>
                      <p>{paymentData[0]?.type}</p>
                    </div>
                    <p
                      style={{
                        margin: '0px',
                        marginLeft: '-30px',
                        display: 'flex',
                      }}
                    >
                      **** **** ****{' '}
                      <p style={{ marginLeft: '10px', marginTop: '-4px' }}>
                        {paymentData[0]?.last4_card}
                      </p>
                    </p>
                  </div>
                </div>
                <Button
                  variant='contained'
                  style={{
                    backgroundColor: 'white',
                    color: 'black',
                    width: '92%',
                    margin: '20px',
                    marginTop: '10px',
                    fontFamily: 'Poppins',
                    fontWeight: 500,
                    fontStyle: 'normal',
                    fontSize: ' 17px',
                    lineHeight: '30px',
                  }}
                  onClick={handlePurchase}
                >
                  PAY NOW
                </Button>
              </div>
            ) : (
              <div
                style={{
                  width: 'auto',
                  backgroundColor: '#000000',
                  borderRadius: '8px',
                }}
              >
                <div
                  style={{
                    backgroundColor: '#67E697',
                    borderTopLeftRadius: '8px',
                    borderTopRightRadius: '8px',
                    height: '13vh',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-evenly',
                      marginLeft: isMobile ? '15vw' : '8vw',
                    }}
                  >
                    <div>
                      <p
                        style={{
                          fontSize: '24px',
                          fontWeight: 500,
                          marginTop: isMobile ? '35px' : '',
                        }}
                      >
                        Paid Successfully
                      </p>
                    </div>
                    <CloseIcon
                      onClick={handleClose}
                      style={{
                        marginTop: isMobile ? '35px' : '25px',
                        marginLeft: isMobile ? '40px' : '20px',
                        marginRight: isMobile ? '20px' : '',
                        width: '27px',
                        height: '27px',
                      }}
                    />
                  </div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <ProfileImageAvatar
                      user={user}
                      style={{
                        borderRadius: '50%',
                        marginTop: '20px',
                        width: '70px',
                        height: '70px',
                      }}
                    />
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      marginTop: '20px',
                      justifyContent: 'center',
                    }}
                  >
                    <p
                      style={{
                        fontSize: '26px',
                        fontWeight: 'bold',
                        marginTop: '-1vh',
                      }}
                    >
                      {currencySymbol}
                      {price || 0}.00
                    </p>
                  </div>
                  <div
                    style={{
                      display: 'flex',

                      justifyContent: 'center',
                    }}
                  >
                    <p
                      style={{
                        marginTop: isMobile ? '-3vh' : '-4vh',
                        color: '#444444',
                      }}
                    >
                      Paid to {user?.fullName}
                    </p>
                  </div>

                  {isMobile ? (
                    <div>
                      <div>
                        <Button
                          variant='outlined'
                          onClick={handleClose}
                          style={{
                            margin: '20px',
                            width: '90%',
                            padding: '10px',
                            backgroundColor: 'white',
                            color: 'black',
                          }}
                        >
                          <CloseIcon className={styles.buttonIcons} /> Close
                        </Button>
                      </div>

                      <div>
                        <Button
                          variant='outlined'
                          onClick={handleClose}
                          style={{
                            margin: '20px',
                            width: '90%',
                            backgroundColor: 'white',
                            color: 'black',
                          }}
                        >
                          <ShareIcon className={styles.buttonIcons} /> Share
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: 'flex' }}>
                      <Button
                        variant='outlined'
                        onClick={handleClose}
                        style={{
                          margin: 'auto',
                          width: '30vw',
                          marginBottom: '20px',
                          marginLeft: '10px',
                          marginRight: '10px',
                          padding: '10px',
                          backgroundColor: 'white',
                          color: 'black',
                          fontFamily: 'Poppins',
                          fontWeight: 500,
                          fontStyle: 'normal',
                          fontSize: ' 17px',
                          lineHeight: '30px',
                        }}
                      >
                        <CloseIcon className={styles.buttonIcons} /> Close
                      </Button>

                      {/* <Button
                      variant='outlined'
                      onClick={handleClose}
                      style={{
                        margin: '20px',
                        width: '20vw',
                      }}
                    >
                      <ShareIcon className={styles.buttonIcons} /> Share
                    </Button> */}
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        </Fade>
      </div>
    </Modal>
  );
  return {
    PostPurchaseModal,
    openPurchaseModal: handleOpenModal,
    closePurchaseModal: handleClose,
    setPurchased,
  };
};

export default usePostPurchaseModal;
