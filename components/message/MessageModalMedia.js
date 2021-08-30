import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '../DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import UploadImage from './uploadImage';
import ImageListItem from './ImageListItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import GreenButton from '../GreenButton';
import UploadVideo from '../UploadVideo';
import { currencySymbol } from '../../services/currencySymbol';
import MessageModalMediaFollowingsSelect from './MessageModalMediaFollowingsSelect';
import MessageModalMediaCamera from './MessageModalMediaCamera';

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
  const [content, setContent] = useState('');
  const [sentTo, setSentTo] = useState('');
  const [price, setPrice] = useState(0);
  const [tileData, setTileData] = useState([]);
  const [disabled, set_disabled] = useState(false);
  const [loadingItems, setLoadingItems] = useState([]);
  const [progressVideo, setProgressVideo] = React.useState({ val: 0 });
  const [sUrl, setSUrl] = useState('');

  const [imageModal, setImageModal] = useState(false);
  const handleClickOpen = () => {
    setImageModal(true);
  };

  React.useEffect(() => {
    if (!imageModal) {
      setTileData([]);
      setLoadingItems([]);
      setSUrl('');
      setContent('');
      setSentTo('');
      setPrice('');
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
  };

  const removeImageHandler = tile => {
    setTileData(tileData.filter(t => t !== tile));
  };

  const handleMsgSend = () => {
    if (type === 'text') {
      onMediaUploaded(
        {
          type: 'text',
          isPaid: false,
          sentTo,
          content,
        },
        () => {
          handleClose();
        }
      );
    } else {
      onMediaUploaded(
        {
          type: 'media',
          messageMediaType: 'photo',
          media: sUrl,
          content,
          isPaid: Boolean(price),
          price,
        },
        () => {
          handleClose();
        }
      );
    }
  };

  const body = (
    <>
      <DialogTitle onClose={handleClose}>New Message</DialogTitle>
      <DialogContent className={classes.content}>
        {type === 'camera' && (
          <>
            <MessageModalMediaCamera imageHandler={imageHandler} />
          </>
        )}
        {type === 'text' && (
          <>
            <MessageModalMediaFollowingsSelect
              value={sentTo}
              onChange={e => setSentTo(e.target.value)}
            />
          </>
        )}
        {(type === 'photo' || type === 'video' || type === 'text') && (
          <TextField
            variant='outlined'
            fullWidth
            margin='dense'
            label='Content'
            multiline
            rows={5}
            value={content}
            onChange={e => setContent(e.target.value)}
          />
        )}
        {(type === 'photo' || type === 'video') && (
          <Box display='flex' width='100%'>
            {tileData.map((tile, i) => (
              <ImageListItem key={`tile${i}`} src={tile}>
                <Button
                  size='small'
                  variant='outlined'
                  onClick={() => removeImageHandler(tile)}
                >
                  Remove
                </Button>
              </ImageListItem>
            ))}
            {loadingItems.map((item, i) => (
              <ImageListItem key={`tile${i}`} src={item.src}>
                <CircularProgress
                  {...item.progressProps}
                  value={progressVideo.val}
                />
              </ImageListItem>
            ))}
          </Box>
        )}
        {(type === 'photo' || type === 'video') && (
          <Box display='flex' width='100%' alignItems='center'>
            <Box display='flex' flexGrow={1}>
              <Typography>Add media</Typography>
            </Box>
            <Box mx={1}>
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
            >
              <img src='/imageBtn.svg' alt='image' />
            </UploadImage>
            </Box>
            <Box mx={1}>
            <UploadVideo
              onUploadVideoComplete={(muxId, mediaType) => {
                set_disabled(false);
                setTileData([...tileData, '/no-media.jpg']);
              }}
              onVideoError={() => set_disabled(false)}
              onVideoUploadProgress={val => {
                setProgressVideo({ val });
              }}
              onVideoSelect={() => {
                set_disabled(true);
                setProgressVideo({ val: 0 });
                setLoadingItems([
                  ...loadingItems,
                  {
                    src: '/no-media.jpg',
                    progressProps: {
                      variant: 'determinate',
                      // value: progressVideo.val,
                    },
                  },
                ]);
              }}
              onVideoUploaded={() => {
                setProgressVideo({ val: 100 });
                setLoadingItems(
                  loadingItems.filter((a, i) => i !== loadingItems.length - 1)
                );
              }}
            >
              <img src='/videoBtn.svg' alt='video' />
            </UploadVideo>
            </Box>
          </Box>
        )}
        {(type === 'photo' || type === 'video') && (
          <Box display='flex' width='100%' alignItems='center'>
            <Box display='flex' flexGrow={1}>
              <Typography>
                Price <small>(optional)</small>
              </Typography>
            </Box>
            <TextField
              value={price}
              onChange={e => setPrice(e.target.value)}
              placeholder='0.00'
              variant='outlined'
              margin='dense'
              InputProps={{
                endAdornment: currencySymbol,
              }}
              style={{ width: '100px' }}
            />
          </Box>
        )}
      </DialogContent>

      <DialogActions disableSpacing>
        <GreenButton
          variant='contained'
          color='primary'
          fullWidth
          disabled={disabled}
          onClick={handleMsgSend}
        >
          Send Now
        </GreenButton>
      </DialogActions>
    </>
  );

  return (
    <>
      <Children onClick={handleClickOpen} />
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
