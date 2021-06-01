import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

export default function PostMediaVideo(src) {
  const videoRef = useRef(null);

  useEffect(() => {
    let hls;
    if (videoRef.current) {
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
  }, [videoRef]);

  return <video controls ref={videoRef} style={{ width: '100%' }} />;
}
