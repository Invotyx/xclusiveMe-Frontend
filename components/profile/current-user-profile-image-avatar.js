import { useSelector } from 'react-redux';
import { currentUserSelector } from '../../selectors/authSelector';
import ProfileImageAvatar from './profile-image-avatar';

export default function CurrentUserProfileImageAvatar({ user, styles, ...props }) {
  const currentUser = useSelector(currentUserSelector);
  return (
    <ProfileImageAvatar
      user={currentUser}
      style={styles && { width: '65px', height: '65px' }}
      {...props}
    />
  );
}
