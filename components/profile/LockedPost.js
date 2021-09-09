import LockIcon from '@material-ui/icons/Lock';
import FullSizeImage from './FullSizeImage';

export default function LockedPost(props) {
  return (
    <FullSizeImage backgroundImage={'/post-blurred.jpg'} {...props}>
      <LockIcon />
    </FullSizeImage>
  );
}
