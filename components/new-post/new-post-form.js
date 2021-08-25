import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import GreenButton from '../GreenButton';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import Typography from '@material-ui/core/Typography';
import ImageList from '@material-ui/core/ImageList';
import MuiImageListItem from '@material-ui/core/ImageListItem';
import MuiImageListItemBar from '@material-ui/core/ImageListItemBar';
import TextField from '@material-ui/core/TextField';
import MuiOutlinedInput from '@material-ui/core/OutlinedInput';
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';
import GraphicEqRoundedIcon from '@material-ui/icons/GraphicEqRounded';
import LocalOfferOutlinedIcon from '@material-ui/icons/LocalOfferOutlined';
import AddIcon from '@material-ui/icons/Add';
import { useDispatch } from 'react-redux';
import { post } from '../../actions/post';
import UploadImage from './uploadImage';
import UploadVideo from './uploadVideo';
import CircularProgress from '@material-ui/core/CircularProgress';
import { currencySymbol } from '../../services/currencySymbol';
import { Fade, Popper } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

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
  const dispatch = useDispatch();
  const [disabled, set_disabled] = React.useState(false);
  const [_show_price_input, set_show_price_input] = React.useState(false);
  const [price, set_price] = React.useState(false);
  const [postText, set_postText] = React.useState('');
  const [tileData, set_TileData] = React.useState([]);
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
          set_TileData([]);
          setMedia([]);
          set_postText('');
          dispatch(post.request());
        },
      })
    );
  };

  const imageHandler = source_url => {
    set_TileData(prev => [...prev, source_url.url]);
    setMedia([
      ...media,
      {
        url: source_url.url,
        assetId: source_url.asset_id,
        publicId: source_url.public_id,
        versionId: source_url.version_id,
        signature: source_url.signature,
        thumbnail: source_url.thumbnail,
        type: `${source_url.resource_type}`,
      },
    ]);
  };

  const onUploadVideo = (muxId, mediaType) => {
    set_TileData([...tileData, '/no-media.jpg']);
    setMedia([
      ...media,
      {
        muxId: muxId,
        type: mediaType,
      },
    ]);
  };

  const removeImageHandler = tile => {
    set_TileData(tileData.filter(t => t !== tile));
    setMedia(media.filter(f => f.url !== tile));
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

  return (
    <>
      <Box mb={3}>
        <OutlinedInput
          value={postText}
          onChange={e => set_postText(e.target.value)}
          name='postText'
          multiline
          fullWidth
          rows={5}
          placeholder='Compose a new post'
        />
        <Card>
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
                    actionIcon={
                      <CircularProgress
                        {...item.progressProps}
                        value={progressVideo.val}
                      />
                    }
                  />
                </MuiImageListItem>
              ))}
              {tileData && tileData.length > 0 && (
                <MuiImageListItem>
                  <ImageListItemBar
                    actionIcon={
                      <IconButton size='small' variant='text'>
                        <AddIcon />
                      </IconButton>
                    }
                  />
                </MuiImageListItem>
              )}
            </ImageList>
          </CardContent>
        </Card>
      </Box>
      <Box mb={3}>
        <Card>
          <CardContent>
            <Box display='flex'>
              <Box flexGrow={1}>
                <Typography variant='subtitle1'>Add to your post</Typography>
              </Box>
              <Box mx={1}>
                <Box clone color='#666'>
                  <IconButton size='small'>
                    <CameraAltOutlinedIcon />
                  </IconButton>
                </Box>
              </Box>
              <Box mx={1}>
                <Box clone color='#666'>
                  <UploadImage
                    imageHandler={imageHandler}
                    set_disabled={set_disabled}
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
                    onUploadVideo={onUploadVideo}
                    set_disabled={set_disabled}
                    onVideoUploadProgress={val => setProgressVideo({ val })}
                    onVideoSelect={() => {
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
                <Box clone color='#666'>
                  <IconButton size='small'>
                    <GraphicEqRoundedIcon />
                  </IconButton>
                </Box>
              </Box>
              <Box mx={1}>
                {_show_price_input ? (
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
                      style={{
                        width: '140px',
                        margin: 0,
                        marginTop: '-5px',
                      }}
                      value={price}
                      onChange={e => set_price(e.target.value)}
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
                      onClick={() => set_show_price_input(true)}
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
      <Box mb={3}>
        <GreenButton
          onClick={handleCreatePost}
          fullWidth
          color='primary'
          variant='contained'
          size='large'
          startIcon={<SendIcon />}
          disabled={
            disabled ||
            ((!postText || postText.trim() === '') && media.length === 0)
          }
        >
          Post now
        </GreenButton>
      </Box>
    </>
  );
}
