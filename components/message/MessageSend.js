import { OutlinedInput } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { chat } from '../../actions/chat';
import { currentUserSelector } from '../../selectors/authSelector';
import ProfileImageAvatar from '../profile/profile-image-avatar';
import UploadImageModal from './uploadImageModal';
import useMediaRecorder from '@wmik/use-media-recorder';
import { snackbar } from '../../actions/snackbar';
import AudioSend from './audioSend';

export default function MessageSend({ conId, handleSendMessage }) {
  let { status, mediaBlob, stopRecording, startRecording } = useMediaRecorder({
    recordScreen: false,
    mediaStreamConstraints: { audio: true, video: false },
  });
  const [seconds, setSeconds] = useState(0);
  const current = useSelector(currentUserSelector);
  const [show, setShow] = useState(false);
  const [msgText, setMsgText] = useState('');
  const [addVoice, setAddVoice] = useState(false);
  const [progress, setProgress] = useState(0);
  const [countInterval, setCountInterval] = React.useState(null);
  const [progressInterval, setProgressInterval] = React.useState(null);
  const dispatch = useDispatch();

  function handleOnEnter() {
    if (!msgText || msgText.trim() === '') {
      return;
    }

    setShow(false);

    handleSendMessage(msgText, () => {
      setMsgText('');
    });
  }

  useEffect(() => {
    if (status === 'recording') {
      timer();
    } else if (status === 'stopped') {
      clearInterval(countInterval);
      setSeconds(0);
    } else if (status === 'failed') {
      dispatch(
        snackbar.update({
          open: true,
          message: `MicroPhone Permission Denied `,
          severity: 'error',
        })
      );
      setProgress(0);
      setAddVoice(false);
    }
  }, [status]);

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
  const progressHandler = () => {
    setProgressInterval(
      setInterval(() => {
        setProgress(oldProgress => {
          if (oldProgress === 100) {
            return 0;
          }
          return oldProgress + 0.3;
        });
      }, 300)
    );
  };

  const startRecordingHandler = () => {
    setAddVoice(true);
    progressHandler();
    startRecording();
  };

  const timer = () => {
    setCountInterval(
      setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000)
    );
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
            opacity: addVoice ? 0 : 1,
          }}
        >
          <img src='/camera.svg' alt='camera' />
          <UploadImageModal
            mediaType='photo'
            onMediaUploaded={data => {
              handleSendMessage(data);
            }}
          >
            <img src='/imageBtn.svg' alt='image' />
          </UploadImageModal>
          <img src='/videoBtn.svg' alt='video' />
          <img
            src='/voiceBtn.svg'
            alt='voice'
            onClick={startRecordingHandler}
          />
        </div>
      </CardActions>

      <CardActions style={{ padding: 0 }}>
        {!addVoice ? (
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
            stopRecording={stopRecording}
            mediaBlob={mediaBlob}
            progress={progress}
            progressRef={progressInterval}
            seconds={seconds}
            setProgress={setProgress}
            setAddVoice={setAddVoice}
            onAudioUploaded={data => {
              handleSendMessage(data);
            }}
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
