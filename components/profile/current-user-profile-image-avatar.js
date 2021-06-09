import { useSelector } from 'react-redux';
import { currentUserSelector } from '../../selectors/authSelector';
import ProfileImageAvatar from './profile-image-avatar';

export default function CurrentUserProfileImageAvatar({ user, ...props }) {
  const currentUser = useSelector(currentUserSelector);
  return <ProfileImageAvatar user={currentUser} />;
}
