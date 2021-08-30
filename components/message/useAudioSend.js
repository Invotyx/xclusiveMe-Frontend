import useMediaRecorder from '@wmik/use-media-recorder';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { snackbar } from '../../actions/snackbar';
import AudioSend from './audioSend';

export default function useAudioSend() {
  let { status, mediaBlob, stopRecording, startRecording } = useMediaRecorder({
    recordScreen: false,
    mediaStreamConstraints: { audio: true, video: false },
  });
  const [seconds, setSeconds] = useState(0);
  const [progress, setProgress] = useState(0);
  const [countInterval, setCountInterval] = React.useState(null);
  const [progressInterval, setProgressInterval] = React.useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === 'recording') {
      setCountInterval(
        setInterval(() => {
          setSeconds(seconds => seconds + 1);
        }, 1000)
      );
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
      setIsRecording(false);
    }
  }, [status]);

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
    setIsRecording(true);
    progressHandler();
    startRecording();
  };

  return {
    AudioSend: props => (
      <AudioSend
        stopRecording={stopRecording}
        mediaBlob={mediaBlob}
        progress={progress}
        progressRef={progressInterval}
        seconds={seconds}
        setProgress={setProgress}
        setIsRecording={setIsRecording}
        {...props}
      />
    ),
    startRecordingHandler,
    isRecording,
  };
}
