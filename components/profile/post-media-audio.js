import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

export default function PostMediaAudio(props) {
  return <AudioPlayer {...props} onPlay={e => console.log('onPlay')} />;
}
