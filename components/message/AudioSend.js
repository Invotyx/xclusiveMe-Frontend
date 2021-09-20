import React from 'react';
import {
  IconButton,
  LinearProgress,
  Paper,
  Typography,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

export default function AudioSend({
  time,
  finishIcon,
  handleSend,
  progress,
  handleClear,
}) {
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
      <IconButton onClick={handleClear} size="large">
        <ClearIcon />
      </IconButton>
      <LinearProgress
        style={{ display: 'flex', width: '70%' }}
        variant='determinate'
        value={progress}
      />
      <Typography style={{ display: 'flex' }}>{time}</Typography>
      <IconButton onClickCapture={handleSend} size="large">
        {finishIcon || <img src='/send.png' alt='send button' />}
      </IconButton>
    </Paper>
  );
}
