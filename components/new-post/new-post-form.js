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
import GridList from '@material-ui/core/GridList';
import MuiGridListTile from '@material-ui/core/GridListTile';
import MuiGridListTileBar from '@material-ui/core/GridListTileBar';
import TextField from '@material-ui/core/TextField';
import MuiOutlinedInput from '@material-ui/core/OutlinedInput';
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';
import GraphicEqRoundedIcon from '@material-ui/icons/GraphicEqRounded';
import LocalOfferOutlinedIcon from '@material-ui/icons/LocalOfferOutlined';
import AddIcon from '@material-ui/icons/Add';
import NewPostPriceHelpPopover from './new-post-price-help-popover';
import { useDispatch } from 'react-redux';
import { post } from '../../actions/post';
import UploadImage from './uploadImage';
import UploadVideo from './uploadVideo';
import CircularProgress from '@material-ui/core/CircularProgress';

const OutlinedInput = withStyles(() => ({
  notchedOutline: {
    borderWidth: '0 !important',
  },
}))(MuiOutlinedInput);

const GridListTile = withStyles(() => ({
  tile: {
    borderRadius: 6,
    '& > div': {
      display: 'none',
    },
    '&:hover > div': {
      display: 'flex',
    },
  },
}))(MuiGridListTile);

const GridListTileBar = withStyles(() => ({
  root: {
    height: `100%`,
    justifyContent: 'center',
  },
  titleWrap: {
    display: 'none',
  },
}))(MuiGridListTileBar);

export default function NewPostForm({ afterSave }) {
  const dispatch = useDispatch();
  const [disabled, set_disabled] = React.useState(false);
  const [_show_price_input, set_show_price_input] = React.useState(false);
  const [price, set_price] = React.useState(false);
  const [postText, set_postText] = React.useState('');
  const [tileData, set_TileData] = React.useState([]);
  const [fileObj, set_FileObj] = React.useState([]);
  const [progressVideo, setProgressVideo] = React.useState({ val: 0 });
  const [loadingItems, setLoadingItems] = React.useState([]);

  const handleCreatePost = () => {
    if (!postText || postText.trim() === '') {
      return;
    }
    dispatch(
      post.save({
        saveData: {
          price: parseFloat(price),
          postText,
          isPaid: price ? true : false,
          media: fileObj,
          mediaCount: 1,
        },
        callback: () => {
          afterSave && afterSave();
          set_TileData([]);
          set_FileObj([]);
          set_postText('');
          dispatch(post.request());
        },
      })
    );
  };

  const imageHandler = source_url => {
    set_TileData([...tileData, source_url.url]);
    set_FileObj([
      ...fileObj,
      {
        url: source_url.url,
        assetId: source_url.asset_id,
        publicId: source_url.public_id,
        versionId: source_url.version_id,
        signature: source_url.signature,
        type: `${source_url.resource_type}/${source_url.format}`,
      },
    ]);
  };

  const onUploadVideo = (muxId, mediaType) => {
    set_TileData([...tileData, '/no-media.jpg']);
    set_FileObj([
      ...fileObj,
      {
        muxId: muxId,
        type: mediaType,
      },
    ]);
  };

  const removeImageHandler = tile => {
    set_TileData(tileData.filter(t => t !== tile));
    set_FileObj(fileObj.filter(f => f.url !== tile));
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
            <GridList cellHeight={100} cols={4}>
              {tileData.map((tile, i) => (
                <GridListTile key={`tile${i}`}>
                  <img src={tile} alt={'no Image'} />
                  <GridListTileBar
                    titlePosition='top'
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
                </GridListTile>
              ))}
              {loadingItems.map((item, i) => (
                <MuiGridListTile key={`loadingItems${i}`}>
                  <img src={item.src} alt={'no Image'} />
                  <GridListTileBar
                    titlePosition='top'
                    actionPosition='left'
                    actionIcon={
                      <CircularProgress
                        {...item.progressProps}
                        value={progressVideo.val}
                      />
                    }
                  />
                </MuiGridListTile>
              ))}
              {tileData && tileData.length > 0 && (
                <MuiGridListTile>
                  <GridListTileBar
                    actionIcon={
                      <IconButton size='small' variant='text'>
                        <AddIcon />
                      </IconButton>
                    }
                  />
                </MuiGridListTile>
              )}
            </GridList>
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
                    onImageSelect={imgSrc =>
                      setLoadingItems([...loadingItems, { src: imgSrc }])
                    }
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
                <Box clone color='#666'>
                  {_show_price_input ? (
                    <TextField
                      name='price'
                      type='number'
                      variant='outlined'
                      margin='dense'
                      InputProps={{
                        startAdornment: <LocalOfferOutlinedIcon />,
                        endAdornment: <NewPostPriceHelpPopover />,
                      }}
                      style={{
                        width: '140px',
                        margin: 0,
                        marginTop: '-5px',
                      }}
                      value={price}
                      onChange={e => set_price(e.target.value)}
                    />
                  ) : (
                    <IconButton
                      size='small'
                      onClick={() => set_show_price_input(true)}
                    >
                      <LocalOfferOutlinedIcon />
                    </IconButton>
                  )}
                </Box>
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
          disabled={disabled || !postText || postText.trim() === ''}
        >
          Post now
        </GreenButton>
      </Box>
    </>
  );
}
