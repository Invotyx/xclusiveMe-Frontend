import { OutlinedInput } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { currentUserSelector } from '../../selectors/authSelector';
import ProfileImageAvatar from '../profile/profile-image-avatar';
import MessageModalMedia from './MessageModalMedia';
import useAudioSend from './useAudioSend';
import useEmojiPicker from '../useEmojiPicker';
import AudioSend from './AudioSend';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  button: {
    marginRight: '2rem',
    cursor: 'pointer',
  },
}));

export default function MessageSend({ handleSendMessage }) {
  const classes = useStyles();
  const { closeEmojiPicker, EmojiPicker, emojiPickerRef } = useEmojiPicker();
  const current = useSelector(currentUserSelector);
  const {
    progress,
    startRecordingHandler,
    isRecording,
    formatTime,
    Clear,
    stopRecording,
  } = useAudioSend({
    onAudioUploaded: data =>
      handleSendMessage({
        content: '',
        type: 'media',
        messageMediaType: 'audio',
        media: data,
      }),
  });
  const [msgText, setMsgText] = useState('');

  function handleOnEnter() {
    if (!msgText || msgText.trim() === '') {
      return;
    }

    closeEmojiPicker();

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

  return (
    <>
      <CardActions
        style={{
          backgroundColor: 'black',
        }}
      >
        <div
          style={{
            opacity: isRecording ? 0 : 1,
          }}
        >
          <MessageModalMedia type='camera' onMediaUploaded={handleSendMessage}>
            <img
              src='/camera.svg'
              className={classes.button}
              alt='camera'
            />
          </MessageModalMedia>
          <MessageModalMedia type='photo' onMediaUploaded={handleSendMessage}>
            <img
              src='/imageBtn.svg'
              className={classes.button}
              alt='image'
            />
          </MessageModalMedia>
          <MessageModalMedia type='video' onMediaUploaded={handleSendMessage}>
            <img
              src='/videoBtn.svg'
              className={classes.button}
              alt='video'
            />
          </MessageModalMedia>
          <img
            src='/voiceBtn.svg'
            className={classes.button}
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
              <span ref={emojiPickerRef} style={{ display: 'flex' }}>
                <EmojiPicker onSelect={addEmoji} />
                <IconButton onClick={handleOnEnter}>
                  <img
                    src='/send.png'
                    alt='send button'
                    style={{ marginRight: '10px' }}
                  />
                </IconButton>
              </span>
            }
          />
        ) : (
          <AudioSend
            handleClear={Clear}
            progress={progress}
            time={formatTime()}
            handleSend={stopRecording}
          />
        )}
      </CardActions>
    </>
  );
}
