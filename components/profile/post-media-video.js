import ReactHlsPlayer from 'react-hls-player';

export default function PostMediaVideo({ src }) {
  return (
    <ReactHlsPlayer
      src={src}
      autoPlay={false}
      controls={true}
      width='100%'
      height='auto'
    />
  );
}
