import ImageAvatar from '../image-avatar';

export default function ProfileImageAvatar({ user, variant,liveLink, ...props }) {
  return (
    <ImageAvatar
      src={user?.profileImage}
      liveLink={liveLink && liveLink}
      alt={user?.fullName}
      variant={variant && variant}
      {...props}
    />
  );
}
