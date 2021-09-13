import React, { useEffect, useRef, useState } from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CloseIcon from '@material-ui/icons/Close';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import { paymentMethod } from '../../actions/payment-method';
import { paymentMethodDataSelector } from '../../selectors/paymentMethodSelector';
import { fetchingSelector } from '../../selectors/postSelector';
import { useDispatch, useSelector } from 'react-redux';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import styles from './profile.module.css';
import TextField from '@material-ui/core/TextField';
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

const TipModal = ({
  onConfirm,
  profileImage,
  name,
  hideDefaultButton,
  children,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [openTipModal, setOpenTipModal] = useState(false);
  const [purchased, setPurchased] = useState(false);
  const paymentData = useSelector(paymentMethodDataSelector);
  const fetching = useSelector(fetchingSelector);
  const isMobile = useMediaQuery('(max-width: 760px)');
  const [addPrice, setAddPrice] = useState('');
  const priceFieldRef = useRef();

  const handlePurchase = () => {
    setAddPrice(priceFieldRef.current.value);
    onConfirm(+priceFieldRef.current.value, () => {
      setPurchased(true);
    });
  };

  const handleOpenTopModal = () => {
    setOpenTipModal(true);
  };

  const handleClose = () => {
    setOpenTipModal(false);
    setPurchased(false);
    setAddPrice('');
  };

  useEffect(() => {
    openTipModal && dispatch(paymentMethod.request());
  }, [openTipModal]);

  return (
    <>
      {!hideDefaultButton &&
        (children ? (
          <span onClick={handleOpenTopModal}>{children}</span>
        ) : (
          <IconButton onClick={handleOpenTopModal}>
            <MonetizationOnOutlinedIcon />
          </IconButton>
        ))}
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={openTipModal}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <div className={classes.paper}>
          <Fade in={openTipModal}>
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
                      Donate to {name}
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
                    {/* <p
                    style={{
                      fontSize: '40px',
                      fontWeight: '600',
                    }}
                  >
                    ${post?.price}.00
                  </p> */}

                    <div style={{ display: 'flex' }}>
                      {/* <AttachMoneyIcon
                      style={{ fontSize: '60px', marginLeft: '-30px' }}
                    /> */}

                      <form>
                        <TextField
                          id='outlined-basic'
                          variant='outlined'
                          autoFocus
                          placeholder='Enter amount in USD'
                          InputProps={{
                            startAdornment: currencySymbol,
                          }}
                          inputRef={priceFieldRef}
                          defaultValue={addPrice}
                          name='addPrice'
                          onKeyDown={e => {
                            if (e.key === '.') {
                              e.preventDefault();
                            }
                          }}
                        />
                      </form>
                    </div>

                    <p
                      style={{
                        color: '#444444',

                        marginLeft: '65px',
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
                  }}
                  onClick={handlePurchase}
                  disabled={fetching}
                >
                  {fetching ? 'loading...' : 'SEND NOW'}
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
                          fontWeight: '600',
                          marginTop: isMobile ? '35px' : '',
                        }}
                      >
                        Sent Successfully
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
                      user={profileImage}
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
                      {addPrice}.00
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

                      {/* <div>
                      <Button
                        variant='outlined'
                        onClick={handleClose}
                        style={{
                          margin: '20px',
                          width: '90%',
                        }}
                      >
                        <ShareIcon className={styles.buttonIcons} /> Share
                      </Button>
                    </div> */}
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
          </Fade>
        </div>
      </Modal>
    </>
  );
};

export default TipModal;
