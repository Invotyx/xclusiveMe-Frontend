import React from 'react';
import withStyles from '@mui/styles/withStyles';
import GreenButton from '../GreenButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import Typography from '@mui/material/Typography';
import ImageList from '@mui/material/ImageList';
import MuiImageListItem from '@mui/material/ImageListItem';
import MuiImageListItemBar from '@mui/material/ImageListItemBar';
import TextField from '@mui/material/TextField';
import MuiOutlinedInput from '@mui/material/OutlinedInput';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux';
import { post } from '../../actions/post';
import UploadImage from './uploadImage';
import UploadVideo from './uploadVideo';
import CircularProgress from '@mui/material/CircularProgress';
import { currencySymbol } from '../../services/currencySymbol';
import { Fade, Popper } from '@mui/material';
import { Alert, AlertTitle } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import MessageModalMediaCamera from '../message/MessageModalMediaCamera';
import useAudioSend from '../message/useAudioSend';
import CheckIcon from '@mui/icons-material/Check';
import NewPostAudioMenu from './NewPostAudioMenu';
import ClearIcon from '@mui/icons-material/Clear';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import LockIcon from '@mui/icons-material/Lock';
import AudioSend from '../message/AudioSend';

const useStyles = makeStyles(theme => ({
  alertIcon: {
    backgroundColor: 'black',
    border: '1px solid #222',
    color: 'white',
    '& .MuiAlert-icon': {
      color: 'white',
    },
  },
}));

const OutlinedInput = withStyles(() => ({
  notchedOutline: {
    borderWidth: '0 !important',
  },
}))(MuiOutlinedInput);

const ImageListItem = withStyles(() => ({
  tile: {
    borderRadius: 6,
    '& > div': {
      display: 'none',
    },
    '&:hover > div': {
      display: 'flex',
    },
  },
}))(MuiImageListItem);

const ImageListItemBar = withStyles(() => ({
  root: {
    height: `100%`,
    justifyContent: 'center',
  },
  titleWrap: {
    display: 'none',
  },
}))(MuiImageListItemBar);

export default function NewPostForm({ afterSave }) {
  const {
    progress,
    startRecordingHandler,
    isRecording,
    formatTime,
    Clear,
    stopRecording,
  } = useAudioSend({
    onAudioUploaded: audioHandler,
  });
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = React.useState('');
  const [disabled, setDisabled] = React.useState(false);
  const [showPriceInput, setShowPriceInput] = React.useState(false);
  const [price, setPrice] = React.useState(false);
  const [postText, setPostText] = React.useState('');
  const [media, setMedia] = React.useState([]);
  const [progressVideo, setProgressVideo] = React.useState({ val: 0 });
  const [loadingItems, setLoadingItems] = React.useState([]);
  const classes = useStyles();

  const handleCreatePost = () => {
    if (!postText || postText.trim() === '') {
      return;
    }
    dispatch(
      post.save({
        saveData: {
          price: parseFloat(price),
          postText,
          media,
        },
        callback: () => {
          afterSave && afterSave();
          setMedia([]);
          setPostText('');
        },
      })
    );
  };

  const imageHandler = images => {
    setMedia(prev => [
      ...prev,
      ...images.map(source_url => ({
        url: source_url.url,
        assetId: source_url.asset_id,
        publicId: source_url.public_id,
        versionId: source_url.version_id,
        signature: source_url.signature,
        thumbnail: source_url.thumbnail,
        type: `${source_url.resource_type}`,
        isPreview: false,
      })),
    ]);
  };

  const onUploadVideoComplete = (muxId, mediaType) => {
    setDisabled(false);
    setMedia(prev => [
      ...prev,
      {
        muxId: muxId,
        type: mediaType,
        isPreview: false,
      },
    ]);
  };

  function audioHandler(data) {
    setDisabled(false);
    setMedia(prev => [
      ...prev,
      ...data.map(d => {
        d.isPreview = false;
        return d;
      }),
    ]);
  }

  const removeImageHandler = index => {
    setMedia(prev => prev.filter((p, i) => i !== index));
  };

  const [popperOpen, setPopperOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopperClose = () => {
    setPopperOpen(false);
  };

  const handlePopperMouseUp = event => {
    setPopperOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const togglePreview = index => {
    const prev = media.slice();
    prev[index].isPreview = !prev[index].isPreview;
    setMedia(prev);
  };

  return (
    <>
      <Box mb={3} style={{ display: activeTab === '' ? 'block' : 'none' }}>
        <OutlinedInput
          value={postText}
          onChange={e => setPostText(e.target.value)}
          name='postText'
          multiline
          fullWidth
          rows={5}
          placeholder='Compose a new post'
        />
        <Card>
          <CardContent>
            <ImageList rowHeight={100} cols={4}>
              {media.map((tile, i) => (
                <ImageListItem key={`tile${i}`}>
                  <img
                    src={tile.thumbnail || '/no-media.jpg'}
                    alt={'no Image'}
                  />
                  <ImageListItemBar
                    position='top'
                    actionPosition='left'
                    actionIcon={
                      <>
                        {Boolean(price) && (
                          <span
                            onClick={() => togglePreview(i)}
                            style={{ cursor: 'pointer', color: '#ccc' }}
                          >
                            {!tile.isPreview ? (
                              <LockIcon />
                            ) : (
                              <LockOpenOutlinedIcon />
                            )}
                          </span>
                        )}
                        <span
                          onClick={() => removeImageHandler(i)}
                          style={{
                            cursor: 'pointer',
                            color: '#ccc',
                            position: Boolean(price) ? 'absolute' : '',
                            top: Boolean(price) ? '10px' : '',
                            right: Boolean(price) ? '10px' : '',
                          }}
                        >
                          <ClearIcon fontSize='small' />
                        </span>
                      </>
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
                    actionIcon={
                      <CircularProgress
                        {...item.progressProps}
                        value={progressVideo.val}
                      />
                    }
                  />
                </MuiImageListItem>
              ))}
              {/* {media && media.length > 0 && (
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
        </Card>
      </Box>
      {isRecording && (
        <Box mb={3}>
          <AudioSend
            handleClear={Clear}
            progress={progress}
            time={formatTime()}
            handleSend={stopRecording}
            finishIcon={<CheckIcon />}
          />
        </Box>
      )}
      <Box mb={3} style={{ display: activeTab === '' ? 'block' : 'none' }}>
        <Card>
          <CardContent>
            <Box display='flex'>
              <Box flexGrow={1}>
                <Typography variant='subtitle1'>Add to your post</Typography>
              </Box>
              <Box mx={1}>
                <Box clone color='#666'>
                  <IconButton
                    size='small'
                    onClick={() => setActiveTab('camera')}
                  >
                    <CameraAltOutlinedIcon />
                  </IconButton>
                </Box>
              </Box>
              <Box mx={1}>
                <Box clone color='#666'>
                  <UploadImage
                    imageHandler={imageHandler}
                    set_disabled={setDisabled}
                    onImageSelect={imgSrc => {
                      setLoadingItems(prev => [...prev, { src: imgSrc }]);
                    }}
                    onImageUploaded={() =>
                      setLoadingItems(
                        loadingItems.filter(
                          (a, i) => i !== loadingItems.length - 1
                        )
                      )
                    }
                  />
                </Box>
              </Box>
              <Box mx={1}>
                <Box clone color='#666'>
                  <UploadVideo
                    onUploadVideoComplete={onUploadVideoComplete}
                    onVideoError={() => setDisabled(false)}
                    onVideoUploadProgress={val => setProgressVideo({ val })}
                    onVideoSelect={() => {
                      setDisabled(true);
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
                        loadingItems.filter(
                          (a, i) => i !== loadingItems.length - 1
                        )
                      );
                    }}
                  />
                </Box>
              </Box>
              <Box mx={1}>
                <NewPostAudioMenu
                  startRecordingHandler={startRecordingHandler}
                  uploadResponseHandler={audioHandler}
                  onFileSelection={() => {
                    setLoadingItems([
                      ...loadingItems,
                      { src: '/no-media.jpg' },
                    ]);
                  }}
                  onUploadComplete={() =>
                    setLoadingItems(
                      loadingItems.filter(
                        (a, i) => i !== loadingItems.length - 1
                      )
                    )
                  }
                />
              </Box>
              <Box mx={1}>
                {showPriceInput ? (
                  <div onMouseLeave={handlePopperClose}>
                    <TextField
                      name='price'
                      type='number'
                      variant='outlined'
                      margin='dense'
                      InputProps={{
                        startAdornment: (
                          <>
                            <LocalOfferOutlinedIcon />
                            {currencySymbol}
                          </>
                        ),
                      }}
                      onKeyDown={e => {
                        e.key === '.' && e.preventDefault();
                      }}
                      onPaste={e => {
                        e.preventDefault();
                        setPrice(e.target.value.replace('.', ''));
                      }}
                      style={{
                        width: '140px',
                        margin: 0,
                        marginTop: '-5px',
                      }}
                      value={price}
                      onChange={e => setPrice(e.target.value)}
                      onMouseUp={handlePopperMouseUp}
                    />
                    <Popper
                      open={popperOpen}
                      anchorEl={anchorEl}
                      transition
                      placement='top-end'
                      style={{
                        zIndex: 11111,
                        maxWidth: '450px',
                        marginBottom: 10,
                      }}
                    >
                      {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={350}>
                          <Alert severity='info' className={classes.alertIcon}>
                            <AlertTitle>What this means</AlertTitle>
                            Setting a Tip here means that every one of your
                            followers will have to pay this amount to view your
                            content.
                          </Alert>
                        </Fade>
                      )}
                    </Popper>
                  </div>
                ) : (
                  <Box clone color='#666'>
                    <IconButton
                      size='small'
                      onClick={() => setShowPriceInput(true)}
                    >
                      <LocalOfferOutlinedIcon />
                    </IconButton>
                  </Box>
                )}
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Box mb={3} style={{ display: activeTab === '' ? 'block' : 'none' }}>
        <GreenButton
          onClick={handleCreatePost}
          fullWidth
          backgroundColor='white'
          color='black'
          variant='contained'
          size='large'
          startIcon={<SendIcon />}
          disabled={
            // disabled ||
            // ((!postText || postText.trim() === '') && media.length === 0)
            disabled || !postText || postText.trim() === ''
          }
        >
          Post now
        </GreenButton>
      </Box>
      {activeTab === 'camera' && (
        <Box textAlign='center'>
          <MessageModalMediaCamera
            handleClose={() => setActiveTab('')}
            imageHandler={imageHandler}
            onImageSelect={imgSrc => {
              setActiveTab('');
              setLoadingItems(prev => [...prev, { src: imgSrc }]);
            }}
            onImageUploaded={() =>
              setLoadingItems(
                loadingItems.filter((a, i) => i !== loadingItems.length - 1)
              )
            }
          />
        </Box>
      )}
    </>
  );
}
