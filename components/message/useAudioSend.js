import useMediaRecorder from '@wmik/use-media-recorder';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { snackbar } from '../../actions/snackbar';
import {
  IconButton,
  LinearProgress,
  Paper,
  Typography,
} from '@material-ui/core';
import moment from 'moment';
import ClearIcon from '@material-ui/icons/Clear';
import { chat } from '../../actions/chat';

export default function useAudioSend({ onAudioUploaded }) {
  let { status, mediaBlob, stopRecording, startRecording, pauseRecording } = useMediaRecorder({
    recordScreen: false,
    mediaStreamConstraints: { audio: true, video: false },
    onStop,
  });
  const [seconds, setSeconds] = useState(0);
  const [progress, setProgress] = useState(0);
  const [countInterval, setCountInterval] = React.useState(null);
  const [progressInterval, setProgressInterval] = React.useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const dispatch = useDispatch();

  function init() {
    setIsRecording(true);
    setSeconds(0);
    setProgress(0);
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
    setCountInterval(
      setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000)
    );
  }

  function cleanup() {
    clearInterval(progressInterval);
    clearInterval(countInterval);
    setIsRecording(false);
  }

  useEffect(() => {
    if (status === 'recording') {
      init();
    } else if (status === 'stopped') {
      cleanup();
    } else if (status === 'failed') {
      dispatch(
        snackbar.update({
          open: true,
          message: `MicroPhone Permission Denied `,
          severity: 'error',
        })
      );
      setProgress(0);
      setIsRecording(false);
    }
  }, [status]);

  const startRecordingHandler = () => {
    startRecording();
  };

  const Clear = () => {
    pauseRecording();
    cleanup();
  };

  function onStop(audioData) {
    const date = moment();
    date.format('YYYY-MM-DD');

    const audioFile = new File([audioData], `abc.wav`, {
      type: 'audio/wav',
      lastModified: date,
    });
    voiceMailSend([audioFile]);
  }

  const voiceMailSend = audioFile => {
    dispatch(
      chat.sendVoicemail({
        audioFile,
        callback: data => {
          onAudioUploaded(data);
        },
      })
    );
  };

  const formatTime = () => {
    const getSeconds = `0${seconds % 60}`.slice(-2);
    const minutes = `${Math.floor(seconds / 60)}`;
    const getMinutes = `${minutes % 60}`.slice(-2);
    // const getHours = `0${Math.floor(seconds / 3600)}`.slice(-2)

    return `${getMinutes} : ${getSeconds}`;
  };

  function AudioSend({ finishIcon }) {
    return (
      <Paper
        elevation={10}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          alignItems: 'center',
        }}
      >
        <IconButton onClick={Clear}>
          <ClearIcon />
        </IconButton>
        <LinearProgress
          style={{ display: 'flex', width: '70%' }}
          variant='determinate'
          value={progress}
        />
        <Typography style={{ display: 'flex' }}>{formatTime()}</Typography>
        <IconButton
          onClickCapture={() => {
            stopRecording();
          }}
        >
          {finishIcon || <img src='/send.png' alt='send button' />}
        </IconButton>
      </Paper>
    );
  }

  return {
    AudioSend,
    startRecordingHandler,
    isRecording,
  };
}
