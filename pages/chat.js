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
import { io } from 'socket.io-client';
const { publicRuntimeConfig } = getConfig();
const SERVER_ADDRESS = publicRuntimeConfig.backendUrl;

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

function useSocket(url) {
  const JWTToken =
    typeof window !== 'undefined' ? localStorage.getItem('jwtToken') : null;
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketIo = io(url, {
      transports: ['websocket'],
      query: {
        token: `${JWTToken}`,
      },
    });

    setSocket(socketIo);

    function cleanup() {
      socketIo.disconnect();
    }

    return cleanup;
  }, []);

  return socket;
}

const Chat = () => {
  const socket = useSocket(
    `${SERVER_ADDRESS.substring(0, SERVER_ADDRESS.length - 4)}/messages`
  );
  useEffect(() => {
    if (socket) {
      socket.on('connected', data => {
        console.log(data);
      });
      socket.on('exception', data => {
        console.log(data);
      });
      socket.on('disconnect', () => {
        console.log('disconnected');
      });
    }
  }, [socket]);

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
  let pageNum = 1;
  let limit = 50;

  const executeScroll = () => myRef.current.scrollIntoView();
  function handleOnEnter() {
    if (!msgText || msgText.trim() === '') {
      return;
    }

    setShow(false);

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
    // myRef.current.scrollIntoView();
    dispatch(
      chat.getConversations({
        pageNum: pageNum,
        limit: limit,
      })
    );
  }, []);

  useEffect(() => {
    conId &&
      dispatch(
        chat.getOneConversation({
          id: conId,
          pageNum: pageNum,
          limit: limit,
        })
      );
  }, [conId]);

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
                    marginBottom: '10px',
                  }}
                >
                  <form
                    noValidate
                    autoComplete='off'
                    style={{
                      flexGrow: 1,
                      marginRight: '5px',
                    }}
                  >
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
            <Card>
              <CardHeader
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
              <CardContent>
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
                        <img
                          src='/send.png'
                          alt='send button'
                          style={{ marginRight: '10px' }}
                        />
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
