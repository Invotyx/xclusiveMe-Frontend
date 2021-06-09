import ImageAvatar from '../image-avatar';

export default function ProfileImageAvatar({ user, ...props }) {
  return (
    <ImageAvatar src={user?.profileImage} alt={user?.fullName} {...props} />
  );
}
