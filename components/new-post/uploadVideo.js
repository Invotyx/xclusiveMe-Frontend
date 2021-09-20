import React from 'react';
import IconButton from '@mui/material/IconButton';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import Box from '@mui/material/Box';
import UploadVideoX from '../UploadVideo';

export default function UploadVideo(props) {
  return (
    <UploadVideoX {...props}>
      <Box clone color='#666'>
        <IconButton size='small'>
          <VideocamOutlinedIcon />
        </IconButton>
      </Box>
    </UploadVideoX>
  );
}
