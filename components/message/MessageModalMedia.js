import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '../DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import UploadImage from './uploadImage';
import ImageList from '@material-ui/core/ImageList';
import MuiImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import CircularProgress from '@material-ui/core/CircularProgress';
import ImageListItem from '@material-ui/core/ImageListItem';
import { Button } from '@material-ui/core';
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

export default function MessageModalMedia({ type, onMediaUploaded, children }) {
  const Children = props => React.cloneElement(children, props);
  const classes = useStyles();
  const [tileData, setTileData] = useState([]);
  const [media, setMedia] = useState([]);
  const [disabled, set_disabled] = useState(false);
  const [loadingItems, setLoadingItems] = useState([]);
  const [sUrl, setSUrl] = useState('');

  const [imageModal, setImageModal] = useState(false);
  const handleImageModal = () => {
    setImageModal(true);
  };

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
      <DialogTitle onClose={handleClose}>
        New Message
      </DialogTitle>
      <DialogContent className={classes.content}>
        {type === 'camera' && (
          <>
            <TextField variant='outlined' fullWidth multiline rows={3} />
            <Button variant='outlined'>Capture</Button>
          </>
        )}
        {type === 'text' && (
          <>
            <TextField
              select
              variant='outlined'
              fullWidth
              margin='dense'
              label='To'
            >
              <MenuItem>Select</MenuItem>
            </TextField>
          </>
        )}
        {(type === 'photo' || type === 'text') && (
          <TextField
            variant='outlined'
            fullWidth
            margin='dense'
            label='Content'
            multiline
            rows={3}
          />
        )}
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
