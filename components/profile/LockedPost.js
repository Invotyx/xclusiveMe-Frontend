import LockIcon from '@mui/icons-material/Lock';
import FullSizeImage from './FullSizeImage';

export default function LockedPost(props) {
  return (
    <FullSizeImage backgroundImage={'/post-blurred.jpg'} {...props}>
      <LockIcon />
    </FullSizeImage>
  );
}
