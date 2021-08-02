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
  },
}));

const PostPurchaseModel = ({ post, openModel, setOpenModel }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [purchased, setPurchased] = useState(false);
  const paymentData = useSelector(paymentMethodDataSelector);

  const handlePurchase = () => {
    dispatch(
      postData.purchasePost({
        id: post.id,
        callback: () => {
          setPurchased(true);
          dispatch(postData.request());
          dispatch(postData.requestSubscribed());
        },
      })
    );
  };

  const handleClose = () => {
    setOpenModel(false);
  };

  useEffect(() => {
    dispatch(paymentMethod.request());
  }, []);
  return (
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      className={classes.modal}
      open={openModel}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={openModel}>
        <div className={classes.paper}>
          {purchased === false ? (
            <div>
              <div
                style={{
                  position: 'absolute',
                  right: '32vw',
                  top: '32vh',
                  cursor: 'pointer',
                }}
              >
                <CloseIcon onClick={handleClose} />
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                }}
              >
                <img
                  src={post?.user?.profileImage}
                  alt='profile image'
                  width='50px'
                  height='50px'
                  style={{
                    borderRadius: '50%',
                    marginTop: '-20px',
                  }}
                />
              </div>
              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <p style={{ fontWeight: 'bold' }}>Buy this Post</p>
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <p
                  style={{
                    fontSize: '3vw',
                    fontWeight: 'bold',
                  }}
                >
                  ${post?.price}.00
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
                    color: '#444444',
                  }}
                >
                  Total Amount
                </p>
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
                  <div style={{ display: 'flex' }}>
                    <img
                      src='/mastercard.png'
                      alt='card'
                      width='35px'
                      height='35px'
                      style={{ margin: 'auto' }}
                    />
                    <p>Mastercard</p>
                  </div>
                  <p style={{ margin: '0px', marginLeft: '15px' }}>
                    ******** {paymentData[0]?.last4_card}
                  </p>
                </div>
              </div>
              <Button
                variant='contained'
                style={{
                  backgroundColor: '#67E697',
                  color: 'white',
                  width: '92%',
                  margin: '20px',
                  marginTop: '10px',
                }}
                onClick={handlePurchase}
              >
                SEND NOW
              </Button>
            </div>
          ) : (
            <div style={{ margin: '0px', padding: '0px' }}>
              <div
                style={{
                  backgroundColor: '#67E697',
                  marginTop: '-3vh',
                  height: '70px',
                }}
              >
                <div
                  style={{ display: 'flex', justifyContent: 'space-evenly' }}
                >
                  <div>
                    <h3>Paid Successfully</h3>
                  </div>

                  <div
                    style={{
                      position: 'absolute',
                      right: '33vw',
                      top: '25vh',
                      cursor: 'pointer',
                    }}
                  >
                    <CloseIcon onClick={handleClose} />
                  </div>
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <img
                    src={post?.user?.profileImage}
                    alt='profile image'
                    width='50px'
                    height='50px'
                    style={{
                      borderRadius: '50%',
                      marginTop: '20px',
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
                      fontSize: '3vw',
                      fontWeight: 'bold',
                      marginTop: '-1vh',
                    }}
                  >
                    ${post?.price}.00
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
                      marginTop: '-6vh',
                      color: '#444444',
                    }}
                  >
                    Paid to {post?.user?.fullName}
                  </p>
                </div>

                <div>
                  <Button
                    variant='outlined'
                    onClick={handleClose}
                    style={{
                      margin: '20px',
                      width: '80%',
                      display: 'flex',
                      justifyContent: 'center',
                      marginLeft: '4vw',
                    }}
                  >
                    Close
                  </Button>

                  <Button
                    variant='outlined'
                    onClick={handleClose}
                    style={{
                      margin: '20px',
                      width: '80%',
                      display: 'flex',
                      justifyContent: 'center',
                      marginLeft: '4vw',
                    }}
                  >
                    Share
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </Fade>
    </Modal>
  );
};

export default PostPurchaseModel;
