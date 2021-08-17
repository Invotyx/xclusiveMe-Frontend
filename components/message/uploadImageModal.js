import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import UploadImage from './uploadImage';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import GridList from '@material-ui/core/GridList';
import MuiGridListTile from '@material-ui/core/GridListTile';
import MuiGridListTileBar from '@material-ui/core/GridListTileBar';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import CircularProgress from '@material-ui/core/CircularProgress';
import GridListTile from '@material-ui/core/GridListTile';
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

export default function UploadImageModal({
  imageModal,
  setImageModal,
  msgText,
  setMsgText,
  conId,
}) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [tileData, set_TileData] = useState([]);
  const [mediaa, setMedia] = useState([]);
  const [disabled, set_disabled] = useState(false);
  const [loadingItems, setLoadingItems] = useState([]);
  const [progressVideo, setProgressVideo] = useState({ val: 0 });
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
          content: msgText,
          type: 'media',
          messageMediaType: 'photo',
          isPaid: false,

          media: {
            type: 'photo',
            url: sUrl.url,
          },
        },
        callback: () => {
          setMsgText('');
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
        <h3>{msgText}</h3>
        <div>Upload Your Image</div>
        <div>
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
              {/* {tileData && tileData.length > 0 && (
              <MuiGridListTile>
                <GridListTileBar
                  actionIcon={
                    <IconButton size='small' variant='text'>
                      <AddIcon />
                    </IconButton>
                  }
                />
              </MuiGridListTile>
            )} */}
            </GridList>
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

      <UploadImageModal />
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

  return (
    <div>
      <Modal
        open={imageModal}
        onClose={handleClose}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {body}
      </Modal>
    </div>
  );
}
