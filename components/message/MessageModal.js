import React, { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import makeStyles from '@mui/styles/makeStyles';

import { useDispatch, useSelector } from 'react-redux';
import useMediaQuery from '@mui/material/useMediaQuery';
import ShareIcon from '@mui/icons-material/Share';
import TextField from '@mui/material/TextField';
import { chat as chatData } from '../../actions/chat';
import ProfileImageAvatar from '../profile/profile-image-avatar';

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

const MessageModal = ({
  messageModal,
  setMessageModal,
  profileData,
  receiverId,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [purchased, setPurchased] = useState(false);
  const isMobile = useMediaQuery('(max-width: 760px)');
  const [postText, set_postText] = useState('');
  const pageNum = 1;
  const limit = 10;

  const handleSendMessage = () => {
    // setPurchased(true);
    if (!postText || postText.trim() === '') {
      return;
    }

    dispatch(
      chatData?.sendMessage({
        saveData: {
          content: postText,
          sentTo: receiverId,
          type: 'text',
          isPaid: false,
        },
        callback: () => {
          setMessageModal(false);
          dispatch(
            chatData?.getConversations({
              pageNum: pageNum,
              limit: limit,
            })
          );
        },
      })
    );
  };

  const handleClose = () => {
    setMessageModal(false);
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
      open={messageModal}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <div className={classes.paper}>
        <Fade in={messageModal}>
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
                  user={profileData}
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
                <p style={{ fontWeight: '600', fontSize: '17px' }}>
                  {/* Donate to {post?.user?.fullName} */}
                  Send a message
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
                  value={postText}
                  onChange={e => set_postText(e.target.value)}
                  rows={3}
                  autoFocus
                  placeholder='Write something...'
                  style={{ width: isMobile ? '80vw' : '30vw' }}
                />
              </div>
            </div>

            <Button
              variant='contained'
              style={{
                backgroundColor: 'white',
                color: 'black',
                width: isMobile ? '80vw' : '30vw',
                margin: '20px',
                marginTop: '10px',
              }}
              onClick={handleSendMessage}
            >
              SEND NOW
            </Button>
          </div>
        </Fade>
      </div>
    </Modal>
  );
};

export default MessageModal;
