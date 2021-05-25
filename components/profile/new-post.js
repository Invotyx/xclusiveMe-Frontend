import React from 'react';
import Image from 'next/image';
import { withStyles } from '@material-ui/core/styles';
import GreenButton from '../GreenButton';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@material-ui/icons/Send';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import MuiGridListTile from '@material-ui/core/GridListTile';
import MuiGridListTileBar from '@material-ui/core/GridListTileBar';
import RoundedButton from '../RoundedButton';
import TextField from '@material-ui/core/TextField';
import MuiOutlinedInput from '@material-ui/core/OutlinedInput';
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';
import GraphicEqRoundedIcon from '@material-ui/icons/GraphicEqRounded';
import LocalOfferOutlinedIcon from '@material-ui/icons/LocalOfferOutlined';
import AddIcon from '@material-ui/icons/Add';
import NewPostPriceHelpPopover from './new-post-price-help-popover';
import { useDispatch } from 'react-redux';
import { post } from '../../actions/post';
import UploadImage from '../uploadImage';
import UploadVideo from '../uploadVideo';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Box textAlign='center'>
        <Typography variant='h6'>{children}</Typography>
      </Box>
      {onClose ? (
        <IconButton
          aria-label='close'
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const OutlinedInput = withStyles((theme) => ({
  notchedOutline: {
    borderWidth: '0 !important',
  },
}))(MuiOutlinedInput);

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const GridListTile = withStyles(() => ({
  tile: {
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
  tile: {
    borderRadius: 6,
  },
  titleWrap: {
    display: 'none',
  },
}))(MuiGridListTileBar);

export default function NewPostDialog() {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [disabled, set_disabled] = React.useState(false);
  const [_show_price_input, set_show_price_input] = React.useState(false);
  const [price, set_price] = React.useState(false);
  const [postText, set_postText] = React.useState('');
  const [tileData, set_TileData] = React.useState([]);
  const [fileObj, set_FileObj] = React.useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleCreatePost = () => {
    dispatch(
      post.save({
        saveData: {
          price: parseFloat(price),
          postText,
          isPaid: price ? true : false,
          media: fileObj,
          mediaCount: 1,
        },
        callback: (res) => {
          if (res === true) {
            setOpen(false);
          }
        },
      })
    );
  };

  const imageHandler = (Image, fileObject, source_url) => {
    set_TileData([...tileData, Image]);
    let fileData = [];
    let obj = {};
    fileData.push(fileObject);
    fileData.map((data) => {
      obj = { url: source_url, type: data.type };
    });
    set_FileObj([...fileObj, obj]);
  };

  return (
    <>
      <RoundedButton
        color='inherit'
        startIcon={
          <Image
            width={20}
            height={20}
            src='/new-post-icon.svg'
            alt='new post'
          />
        }
        onClick={handleClickOpen}
      >
        New Post
      </RoundedButton>
      <Dialog
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}
        maxWidth='sm'
        fullWidth={true}
      >
        <DialogTitle id='customized-dialog-title' onClose={handleClose}>
          Create a new post
        </DialogTitle>
        <DialogContent>
          <Box mb={3}>
            <OutlinedInput
              value={postText}
              onChange={(e) => set_postText(e.target.value)}
              name='postText'
              multiline
              fullWidth
              rows={5}
              placeholder='Compose a new post'
            />
            <Card>
              <CardContent>
                <GridList cellHeight={100} cols={4}>
                  {tileData.map((tile) => (
                    <GridListTile>
                      <img src={tile} alt={'no Image'} />
                      <GridListTileBar
                        titlePosition='top'
                        actionPosition='left'
                        actionIcon={
                          <Button size='small' variant='outlined'>
                            Remove
                          </Button>
                        }
                      />
                    </GridListTile>
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
                    <Typography variant='subtitle1'>
                      Add to your post
                    </Typography>
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
                      />
                    </Box>
                  </Box>
                  <Box mx={1}>
                    <Box clone color='#666'>
                      <UploadVideo />
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
                          onChange={(e) => set_price(e.target.value)}
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
              disabled={disabled}
            >
              Post now
            </GreenButton>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
