import React, { useEffect, useState } from 'react';
import Layout from '../components/layouts/layout-auth';
import { makeStyles } from '@material-ui/core/styles';
import Message from '../components/message/Message';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import TileTextField from '../components/TileTextField';
import AddCommentIcon from '@material-ui/icons/AddComment';
import { useRouter } from 'next/router';
import InputEmoji from 'react-input-emoji';
import { currentUserSelector } from '../selectors/authSelector';
import { useDispatch, useSelector } from 'react-redux';
import SendIcon from '@material-ui/icons/Send';
import { Button, OutlinedInput } from '@material-ui/core';
import ImageAvatar from '../components/image-avatar';
import { io } from 'socket.io-client';
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

  // const { user, image, userId } = router.query;

  const { conId } = router.query;
  let socket;
  let pageNum = 1;
  let limit = 10;
  const JWTToken =
    typeof window !== 'undefined' ? localStorage.getItem('jwtToken') : null;

  const { publicRuntimeConfig } = getConfig();
  const SERVER_ADDRESS = publicRuntimeConfig.backendUrl;

  // console.log(singlechat[0].sender.fullName);
  // console.log(
  //   'conversationId',
  //   typeof singlechat[0]?.id,
  //   'receiver',
  //   typeof current.id,
  //   'content',
  //   typeof msgText,
  //   'sentTo',
  //   typeof chatsData
  //     .filter(list => list.id == conId)[0]
  //     ?.participants.filter(p => p.id !== current.id)[0].id
  // );

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
        saveData: {
          conversationId: singlechat[0]?.id,
          receiver: current.id,
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
    dispatch(
      chat.getConversations({
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
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <form className={classes.root} noValidate autoComplete='off'>
              <TileTextField
                id='outlined-basic'
                placeholder='Search'
                variant='outlined'
                InputProps={{
                  startAdornment: <SearchIcon style={{ color: '#7c8080' }} />,
                }}
              />
            </form>
            <div
              style={{
                backgroundColor: '#111111',
                padding: '12px',
                borderRadius: '3px',
              }}
            >
              <AddCommentIcon style={{ marginTop: '5px' }} />
            </div>
          </div>

          <div className={classes.messageHeight}>
            <Message />
          </div>
        </div>

        <div>
          <div
            style={{
              width: '41vw',
              backgroundColor: '#101010',
              marginLeft: '30px',
              marginTop: '-6px',
              padding: '10px',
              height: '70vh',
              borderRadius: '6px',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: '10px',
                  marginTop: '-4px',
                }}
              >
                <ImageAvatar />
                <p
                  style={{
                    marginLeft: '20px',
                    fontSize: '20px',
                    fontWeight: 'bold',
                  }}
                >
                  {
                    chatsData
                      .filter(list => list.id == conId)[0]
                      ?.participants.filter(p => p.id !== current.id)[0]
                      .fullName
                  }
                </p>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '10%',
                  marginTop: '-10px',
                  marginRight: '10px',
                }}
              >
                <img src='/money.png' alt='' />
                <img src='/menu.png' alt='' />
              </div>
            </div>
            <div
              style={{
                width: '40vw',
              }}
            >
              <ConvoList singlechat={singlechat} current={current} />
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '30%',
              marginLeft: '4vw',
              marginTop: '10px',
            }}
          >
            <img src='/camera.svg' alt='camera' />
            <img src='/imageBtn.svg' alt='image' />
            <img src='/videoBtn.svg' alt='video' />
            <img src='/voiceBtn.svg' alt='voice' />
          </div>

          <OutlinedInput
            value={msgText}
            onChange={e => setMsgText(e.target.value)}
            name='msgText'
            style={{ width: '40vw', marginLeft: '30px', marginTop: '10px' }}
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
                <Button
                  onClick={showEmoji}
                  style={{
                    backgroundColor: '#111111',
                    border: 'none',
                    marginRight: '-20px',
                  }}
                >
                  <span role='img'>
                    <InsertEmoticonIcon />
                  </span>
                </Button>
                <Button
                  onClick={handleOnEnter}
                  style={{
                    backgroundColor: '#111111',
                    border: 'none',
                  }}
                >
                  <img
                    src='/send.png'
                    alt='send button'
                    style={{ marginRight: '10px' }}
                  />
                </Button>
              </>
            }
          />
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
                  bottom: '-50px',
                  maxWidth: '300px',
                  with: '100%',
                  outline: 'none',
                }}
              />
            </span>
          )}
          <br />
          <br />
        </div>
      </div>
    </Layout>
  );
};

export default Chat;
