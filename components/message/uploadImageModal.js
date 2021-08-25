import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import UploadImage from './uploadImage';
import CardContent from '@material-ui/core/CardContent';
import ImageList from '@material-ui/core/ImageList';
import MuiImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import CircularProgress from '@material-ui/core/CircularProgress';
import ImageListItem from '@material-ui/core/ImageListItem';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { chat } from '../../actions/chat';
import ProfileImageAvatar from '../profile/profile-image-avatar';
import CloseIcon from '@material-ui/icons/Close';
import GreenButton from '../GreenButton';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: '30vw',
    backgroundColor: 'black',

    boxShadow: theme.shadows[5],
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px',
  },
  btnStyle: {
    width: '100%',
    backgroundColor: '#67E697',
    color: 'white',
  },
}));

export default function UploadImageModal({ conId }) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [tileData, set_TileData] = useState([]);
  const [mediaa, setMedia] = useState([]);
  const [disabled, set_disabled] = useState(false);
  const [loadingItems, setLoadingItems] = useState([]);
  const dispatch = useDispatch();
  const [sUrl, setSUrl] = useState('');

  const handleClose = () => {
    setImageModal(false);
  };

  const imageHandler = source_url => {
    setSUrl(source_url);
    set_TileData(prev => [...prev, source_url.url]);
    setMedia([
      ...mediaa,
      {
        type: `${source_url.resource_ytpe}/${source_url.format}`,
        url: source_url.url,
      },
    ]);
  };

  const removeImageHandler = tile => {
    set_TileData(tileData.filter(t => t !== tile));
    setMedia(mediaa.filter(f => f.url !== tile));
  };

  const handleMsgSend = () => {
    dispatch(
      chat.sendOneMessage({
        conversationId: Number(conId),
        saveData: {
          content: '',
          type: 'media',
          messageMediaType: 'photo',
          isPaid: false,

          media: {
            type: 'photo',
            url: sUrl.url,
          },
        },
        callback: () => {
          setImageModal(false);
          dispatch(
            chat.getOneConversation({
              id: conId,
              pageNum: pageNum,
              limit: limit,
            })
          );
        },
      })
    );
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
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
          {/* <img
                    src='./'
                    alt='profile image'
                    width='60px'
                    height='65px'
                    style={{
                      borderRadius: '50%',
                      marginTop: '-20px',
                      marginLeft: isMobile ? '40%' : '44%',
                    }}
                  /> */}
          <div style={{ marginTop: '-20px', marginLeft: '44%' }}>
            <ProfileImageAvatar />
          </div>

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
      <div className={classes.content}>
        <div>Upload Your Image</div>
        <div>
          <CardContent>
            <ImageList rowHeight={100} cols={4}>
              {tileData.map((tile, i) => (
                <ImageListItem key={`tile${i}`}>
                  <img src={tile} alt={'no Image'} />
                  <ImageListItemBar
                    position='top'
                    actionPosition='left'
                    actionIcon={
                      <Button
                        size='small'
                        variant='outlined'
                        onClick={() => removeImageHandler(tile)}
                      >
                        Remove
                      </Button>
                    }
                  />
                </ImageListItem>
              ))}
              {loadingItems.map((item, i) => (
                <MuiImageListItem key={`loadingItems${i}`}>
                  <img src={item.src} alt={'no Image'} />
                  <ImageListItemBar
                    position='top'
                    actionPosition='left'
                    actionIcon={<CircularProgress variant='indeterminate' />}
                  />
                </MuiImageListItem>
              ))}
              {/* {tileData && tileData.length > 0 && (
              <MuiImageListItem>
                <ImageListItemBar
                  actionIcon={
                    <IconButton size='small' variant='text'>
                      <AddIcon />
                    </IconButton>
                  }
                />
              </MuiImageListItem>
            )} */}
            </ImageList>
          </CardContent>
        </div>
        <UploadImage
          imageHandler={imageHandler}
          set_disabled={set_disabled}
          onImageSelect={imgSrc => {
            setLoadingItems(prev => [...prev, { src: imgSrc }]);
          }}
          onImageUploaded={() =>
            setLoadingItems(
              loadingItems.filter((a, i) => i !== loadingItems.length - 1)
            )
          }
        />
      </div>

      <GreenButton
        variant='contained'
        color='primary'
        className={classes.btnStyle}
        onClick={handleMsgSend}
      >
        Send Now
      </GreenButton>
    </div>
  );

  const [imageModal, setImageModal] = useState(false);
  const handleImageModal = () => {
    setImageModal(true);
  };

  return (
    <>
      <img src='/imageBtn.svg' alt='image' onClick={handleImageModal} />
      <Modal
        open={imageModal}
        onClose={handleClose}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {body}
      </Modal>
    </>
  );
}
