import React, { useEffect, useRef, useState } from 'react';
import Layout from '../components/layouts/layout-auth';
import { makeStyles } from '@material-ui/core/styles';
import Message from '../components/message/Message';
import SearchIcon from '@material-ui/icons/Search';
import TileTextField from '../components/TileTextField';
import AddCommentIcon from '@material-ui/icons/AddComment';
import { useRouter } from 'next/router';
import { currentUserSelector } from '../selectors/authSelector';
import { useDispatch, useSelector } from 'react-redux';
import { Button, OutlinedInput } from '@material-ui/core';
import ImageAvatar from '../components/image-avatar';
import getConfig from 'next/config';
import { chat } from '../actions/chat';
import ProfileImageAvatar from '../components/profile/profile-image-avatar';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import { singleSelector } from '../selectors/userSelector';
import { singleChatSelector } from '../selectors/chatSelector';
import { chatDataSelector } from '../selectors/chatSelector';
import ConvoList from '../components/message/ConvoList';
import UploadImageModal from '../components/message/uploadImageModal';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '40ch',
    },
  },
}));

const Chat = () => {
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [msgText, setMsgText] = useState('');
  const current = useSelector(currentUserSelector);
  const singleUser = useSelector(singleSelector);
  const singlechat = useSelector(singleChatSelector);
  const chatsData = useSelector(chatDataSelector);
  const [imageModal, setImageModal] = useState(false);
  const myRef = useRef(null);

  // const { user, image, userId } = router.query;

  const { conId } = router.query;
  let socket;
  let pageNum = 1;
  let limit = 50;
  const JWTToken =
    typeof window !== 'undefined' ? localStorage.getItem('jwtToken') : null;

  const { publicRuntimeConfig } = getConfig();
  const SERVER_ADDRESS = publicRuntimeConfig.backendUrl;

  const executeScroll = () => myRef.current.scrollIntoView();
  function handleOnEnter() {
    if (!msgText || msgText.trim() === '') {
      return;
    }

    setShow(false);
    // socket.emit('new-message-to-server', {
    //   conversationId: 38,
    //   receiver: userId,
    //   content: msgText,
    // });

    dispatch(
      chat.sendOneMessage({
        conversationId: Number(conId),
        saveData: {
          // receiver: current.id,
          content: msgText,
          // sentTo: chatsData
          //   .filter(list => list.id == conId)[0]
          //   ?.participants.filter(p => p.id !== current.id)[0].id,
          type: 'text',
          isPaid: false,
        },
        callback: () => {
          setMsgText('');

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
  }

  const handleImageModal = () => {
    if (!msgText || msgText.trim() === '') {
      return;
    }
    setImageModal(true);
  };

  const addEmoji = e => {
    let sym = e.unified.split('-');
    let codesArray = [];
    sym.forEach(el => codesArray.push('0x' + el));
    let emoji = String.fromCodePoint(...codesArray);
    setMsgText(msgText + emoji);
  };

  const showEmoji = () => {
    setShow(!show);
  };

  useEffect(() => {
    myRef.current.scrollIntoView();
    dispatch(
      chat.getConversations({
        pageNum: pageNum,
        limit: limit,
      })
    );

    dispatch(
      chat.getOneConversation({
        id: conId,
        pageNum: pageNum,
        limit: limit,
      })
    );

    // socket = io(`${SERVER_ADDRESS}/messages`, {
    //   transports: ['websocket'],
    //   query: {
    //     token: `${JWTToken}`,
    //   },
    // });
  }, []);

  return (
    <Layout>
      <Container maxWidth='md'>
        <Grid container spacing={2}>
          <Grid item>
            <Message
              subheaderPrefix={
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <form className={classes.root} noValidate autoComplete='off'>
                    <TileTextField
                      fullWidth
                      id='outlined-basic'
                      placeholder='Search'
                      variant='outlined'
                      InputProps={{
                        startAdornment: (
                          <SearchIcon style={{ color: '#7c8080' }} />
                        ),
                      }}
                    />
                  </form>
                  <IconButton
                    style={{
                      backgroundColor: '#111111',
                      padding: '16px',
                      borderRadius: '3px',
                    }}
                  >
                    <AddCommentIcon />
                  </IconButton>
                </div>
              }
            />
          </Grid>

          <Grid item style={{ flexGrow: 1 }}>
            <Card
              style={{
                width: '41vw',
                backgroundColor: '#101010',
                height: '70vh',
                borderRadius: '6px',
              }}
            >
              <CardHeader
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
                avatar={<ImageAvatar />}
                title={
                  chatsData
                    .filter(list => list.id == conId)[0]
                    ?.participants.filter(p => p.id !== current?.id)[0].fullName
                }
                subheader='click here for contact info'
                action={
                  <>
                    <IconButton>
                      <MonetizationOnOutlinedIcon />
                    </IconButton>
                    <IconButton>
                      <MoreVertIcon />
                    </IconButton>
                  </>
                }
              />
              <CardContent
                style={{
                  width: '40vw',
                }}
              >
                <ConvoList
                  singlechat={singlechat}
                  current={current}
                  refProp={myRef}
                />
              </CardContent>
              <CardActions
                style={{
                  backgroundColor: 'black',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '30%',
                  }}
                >
                  <img src='/camera.svg' alt='camera' />
                  <img
                    src='/imageBtn.svg'
                    alt='image'
                    onClick={handleImageModal}
                  />
                  <img src='/videoBtn.svg' alt='video' />
                  <img src='/voiceBtn.svg' alt='voice' />
                  <UploadImageModal
                    imageModal={imageModal}
                    setImageModal={setImageModal}
                    msgText={msgText}
                    setMsgText={setMsgText}
                    conId={conId}
                  />
                </div>
              </CardActions>

              <CardActions>
                <OutlinedInput
                  value={msgText}
                  onChange={e => setMsgText(e.target.value)}
                  name='msgText'
                  margin='dense'
                  fullWidth
                  multiline
                  // disabled={post.media.length === 0}
                  onKeyDown={e => {
                    if (e.keyCode === 13) {
                      if (!event.shiftKey) {
                        handleOnEnter(e);
                      }
                    }
                  }}
                  // inputRef={searchInput}
                  placeholder='Write a message'
                  startAdornment={
                    <ProfileImageAvatar
                      user={current}
                      style={{ marginRight: '10px' }}
                    />
                  }
                  endAdornment={
                    <>
                      <IconButton onClick={showEmoji}>
                        <InsertEmoticonIcon />
                      </IconButton>
                      <IconButton onClick={handleOnEnter}>
                        <SendIcon />
                      </IconButton>
                    </>
                  }
                />
              </CardActions>

              {show && (
                <span>
                  <Picker
                    onSelect={addEmoji}
                    set='facebook'
                    emoji='point_up'
                    theme='dark'
                    skin='1'
                    style={{
                      position: 'absolute',
                      bottom: '40px',
                      right: '150px',
                      maxWidth: '300px',
                      with: '100%',
                      outline: 'none',
                    }}
                  />
                </span>
              )}
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default Chat;
