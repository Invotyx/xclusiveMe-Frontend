import {
  IconButton,
  LinearProgress,
  Paper,
  Typography,
} from '@material-ui/core';
import React from 'react';
import moment from 'moment';
import ClearIcon from '@material-ui/icons/Clear';
import { useDispatch } from 'react-redux';
import { chat } from '../../actions/chat';

export default function audioSend({
  stopRecording,
  mediaBlob,
  progress,
  seconds,
  progressRef,
  setProgress,
  setAddVoice,
}) {
  const dispatch = useDispatch();

  const voiceSendHandler = () => {
    onStop(mediaBlob);
  };

  const Clear = () => {
    setProgress(0);
    setAddVoice(false);
  };

  const onStop = audioData => {
    const date = moment();
    date.format('YYYY-MM-DD');

    const audioFile = new File([audioData], `abc.wav`, {
      type: 'audio/wav',
      lastModified: date,
    });
    voiceMailSend(audioFile);
  };

  const voiceMailSend = audioFile => {
    clearInterval(progressRef);
    stopRecording();
    dispatch(
      chat.sendVoicemail({
        audioFile,
        callback: () => {
          Clear();
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
      <IconButton onClickCapture={voiceSendHandler}>
        <img src='/send.png' alt='send button' />
      </IconButton>
    </Paper>
  );
}
