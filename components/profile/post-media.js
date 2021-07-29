import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import PostMediaVideo from './post-media-video';
import LockIcon from '@material-ui/icons/Lock';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useEffect, useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import { post as postData } from '../../actions/post/index';
import { useDispatch, useSelector } from 'react-redux';
import { paymentMethod } from '../../actions/payment-method';
import { paymentMethodDataSelector } from '../../selectors/paymentMethodSelector';

const useStyles = makeStyles(theme => ({
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  locked: {
    backgroundImage: `url('/post-blurred.jpg')`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundColor: 'rgba(0,0,0,0.3)',
    backgroundBlendMode: 'multiply',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: 'black',
    border: 'none',
    boxShadow: theme.shadows[5],

    width: '40vw',
    height: 'auto',
  },
}));
function MediaElement({ m }) {
  const classes = useStyles();

  return m.type && m.type.indexOf('video') !== -1 ? (
    <PostMediaVideo src={m.url} />
  ) : (
    <CardMedia className={classes.media} image={m.url} title='post media' />
  );
}
export default function PostMedia({ media, mediaCount, post }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [purchased, setPurchased] = useState(false);
  const paymentData = useSelector(paymentMethodDataSelector);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

  useEffect(() => {
    dispatch(paymentMethod.request());
  }, []);

  return (
    <Grid container spacing={1}>
      {mediaCount > media.length &&
        Array.apply(null, Array(1)).map(() => (
          <Grid item xs={12} key={Math.random()}>
            <Box
              py={8}
              bgcolor='#000'
              textAlign='center'
              className={classes.locked}
            >
              <LockIcon onClick={handleOpen} />
            </Box>
          </Grid>
        ))}
      {/* (!media || media.length === 0) && (
        <MediaElement m={{ url: '/no-media.jpg' }} />
      ) */}

      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            {purchased === false ? (
              <div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
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
                    <p style={{ fontSize: '1.2vw', fontWeight: 'bold' }}>
                      {post?.user?.fullName}
                    </p>
                  </div>
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
                      marginTop: '-1vh',
                    }}
                  >
                    ${post?.price}
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
                  style={{ display: 'flex', justifyContent: 'space-around' }}
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
                      <h3>Sent Successfully</h3>
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
                      Sent to {post?.user?.fullName}
                    </p>
                  </div>
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
                </div>
              </div>
            )}
          </div>
        </Fade>
      </Modal>

      {media && media.length > 0 && (
        <>
          <Grid item xs={12}>
            <MediaElement m={media[0]} />
          </Grid>
          {media.slice(1).map((m, i) => (
            <Grid item xs={12} md={4} key={`media${i}`}>
              <MediaElement m={m} />
            </Grid>
          ))}
        </>
      )}
    </Grid>
  );
}
