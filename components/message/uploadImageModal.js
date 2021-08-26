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
import ProfileImageAvatar from '../profile/profile-image-avatar';
import CloseIcon from '@material-ui/icons/Close';
import GreenButton from '../GreenButton';
import UploadVideo from '../new-post/uploadVideo';

const useStyles = makeStyles(theme => ({
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export default function UploadImageModal({ type, onMediaUploaded, children }) {
  const Children = props => React.cloneElement(children, props);
  const classes = useStyles();
  const [tileData, setTileData] = useState([]);
  const [media, setMedia] = useState([]);
  const [disabled, set_disabled] = useState(false);
  const [loadingItems, setLoadingItems] = useState([]);
  const [sUrl, setSUrl] = useState('');

  React.useEffect(() => {
    if (!imageModal) {
      setTileData([]);
      setMedia([]);
      setLoadingItems([]);
      setSUrl('');
    }
  }, [imageModal]);

  const handleClose = () => {
    setImageModal(false);
  };

  const imageHandler = source_url => {
    if (Array.isArray(source_url)) {
      source_url = source_url[0];
    }
    setSUrl(source_url);
    setTileData(prev => [...prev, source_url.url]);
    setMedia([
      ...media,
      {
        type: `${source_url.resource_ytpe}/${source_url.format}`,
        url: source_url.url,
      },
    ]);
  };

  const removeImageHandler = tile => {
    setTileData(tileData.filter(t => t !== tile));
    setMedia(media.filter(f => f.url !== tile));
  };

  const handleMsgSend = () => {
    onMediaUploaded({
      type: 'media',
      messageMediaType: 'photo',
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
      <DialogContent className={classes.content}>
        {type === 'photo' && (
          <>
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
          </>
        )}
        {type === 'video' && (
          <UploadVideo
            onUploadVideoComplete={(muxId, mediaType) => {
              set_disabled(false);
            }}
            onVideoError={() => set_disabled(false)}
            onVideoUploadProgress={val => {
            }}
            onVideoSelect={() => {
              set_disabled(true);
            }}
            onVideoUploaded={() => {
            }}
          />
        )}
      </DialogContent>

      <DialogActions disableSpacing>
        <GreenButton
          variant='contained'
          color='primary'
          fullWidth
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
      <Children onClick={handleImageModal} />
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
