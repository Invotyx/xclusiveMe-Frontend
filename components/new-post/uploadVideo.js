import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import VideocamOutlinedIcon from '@material-ui/icons/VideocamOutlined';
import Box from '@material-ui/core/Box';
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
