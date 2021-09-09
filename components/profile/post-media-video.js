import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import FullSizeImage from './FullSizeImage';

export default function PostMediaVideo({ thumbnail, src }) {
  const videoRef = useRef(null);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    let hls;
    if (play) {
      const video = videoRef.current;

      if (video.canPlayType('application/vnd.apple.mpegurl')) {
        // Some browers (safari and ie edge) support HLS natively
        video.src = src;
      } else if (Hls.isSupported()) {
        // This will run in all other modern browsers
        hls = new Hls();
        try {
          hls.loadSource(src);
          hls.attachMedia(video);
        } catch (e) {
          console.log('Failed to load media', e);
        }
      } else {
        console.error("This is a legacy browser that doesn't support MSE");
      }
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [play]);

  return play ? (
    <video controls autoPlay ref={videoRef} style={{ width: '100%' }} />
  ) : (
    <FullSizeImage backgroundImage={thumbnail}>
      <PlayCircleOutlineIcon
        onClick={() => setPlay(true)}
        style={{ cursor: 'pointer' }}
      />
    </FullSizeImage>
  );
}
