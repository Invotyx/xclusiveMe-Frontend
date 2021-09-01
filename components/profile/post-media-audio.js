import { makeStyles } from '@material-ui/core';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const useStyles = makeStyles(theme => ({
  player: {
    display: 'block',
    '&.rhap_container': {
      backgroundColor: 'transparent',
      '& svg': {
        color: '#eee',
      },
    },
    '& .rhap_progress-indicator': {
      backgroundColor: '#eee',
    },
    '& .rhap_volume-indicator': {
      backgroundColor: '#eee',
    },
    '& .rhap_time': {
      color: '#eee',
    },
    '& .rhap_button-clear': {
      overflow: 'visible',
    },
  },
}));

export default function PostMediaAudio(props) {
  const classes = useStyles();
  return (
    <AudioPlayer
      className={classes.player}
      {...props}
      onPlay={e => console.log('onPlay')}
      customAdditionalControls={[]}
    />
  );
}
