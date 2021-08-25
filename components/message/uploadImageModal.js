import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import UploadImage from './uploadImage';
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

const useStyles = makeStyles(theme => ({
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

export default function UploadImageModal({ conId, onMediaUploaded }) {
  const classes = useStyles();
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
    if (Array.isArray(source_url)) {
      source_url = source_url[0];
    }
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
    onMediaUploaded({
      type: 'media',
      messageMediaType: 'image',
      media: sUrl,
      content: '',
      isPaid: false,
    });
  };

  const body = (
    <>
      <DialogTitle>
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
      </DialogTitle>
      <DialogContent>
        <div className={classes.content}>
          <div>Upload Your Image</div>
          <div>
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
            </ImageList>
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
      </DialogContent>

      <DialogActions disableSpacing>
        <GreenButton
          variant='contained'
          color='primary'
          className={classes.btnStyle}
          onClick={handleMsgSend}
        >
          Send Now
        </GreenButton>
      </DialogActions>
    </>
  );

  const [imageModal, setImageModal] = useState(false);
  const handleImageModal = () => {
    setImageModal(true);
  };

  return (
    <>
      <img src='/imageBtn.svg' alt='image' onClick={handleImageModal} />
      <Dialog
        open={imageModal}
        onClose={handleClose}
        maxWidth='sm'
        fullWidth
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {body}
      </Dialog>
    </>
  );
}
