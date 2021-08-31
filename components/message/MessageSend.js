import { OutlinedInput } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { currentUserSelector } from '../../selectors/authSelector';
import ProfileImageAvatar from '../profile/profile-image-avatar';
import MessageModalMedia from './MessageModalMedia';
import useAudioSend from './useAudioSend';

export default function MessageSend({ handleSendMessage }) {
  const current = useSelector(currentUserSelector);
  const { AudioSend, isRecording, startRecordingHandler } = useAudioSend();
  const [show, setShow] = useState(false);
  const [msgText, setMsgText] = useState('');

  function handleOnEnter() {
    if (!msgText || msgText.trim() === '') {
      return;
    }

    setShow(false);

    handleSendMessage(msgText, () => {
      setMsgText('');
    });
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

  return (
    <>
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
            opacity: isRecording ? 0 : 1,
          }}
        >
          <MessageModalMedia
            type='camera'
            onMediaUploaded={handleSendMessage}
          >
            <img src='/camera.svg' alt='camera' />
          </MessageModalMedia>
          <MessageModalMedia
            type='photo'
            onMediaUploaded={handleSendMessage}
          >
            <img src='/imageBtn.svg' alt='image' />
          </MessageModalMedia>
          <MessageModalMedia
            type='video'
            onMediaUploaded={handleSendMessage}
          >
            <img src='/videoBtn.svg' alt='video' />
          </MessageModalMedia>
          <img
            src='/voiceBtn.svg'
            alt='voice'
            onClick={startRecordingHandler}
          />
        </div>
      </CardActions>

      <CardActions style={{ padding: 0 }}>
        {!isRecording ? (
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
        ) : (
          <AudioSend
            onAudioUploaded={handleSendMessage}
          />
        )}
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
    </>
  );
}
