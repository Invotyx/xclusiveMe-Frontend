import React from 'react';
import Box from '@mui/material/Box';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { Media, Player, controls, withMediaProps } from 'react-media-player';

function CustomPlayPause({ media }) {
  return media.isPlaying ? (
    <PauseIcon onClick={media.playPause} />
  ) : (
    <PlayArrowIcon onClick={media.playPause} />
  );
}

const { SeekBar } = controls;

export const AudioPlayer = ({ src }) => {
  const PlayPause = withMediaProps(CustomPlayPause);
  return (
    <Media>
      <div>
        <Box display='flex' bgcolor='#666' borderRadius='10px' p='6px 12px'>
          <PlayPause
            style={{
              color: '#fff',
              backgroundColor: 'transparent',
              border: 0,
              position: 'relative',
            }}
          />
          <SeekBar />
        </Box>
        <Player vendor='audio' src={src} />
      </div>
    </Media>
  );
};
export default AudioPlayer;
