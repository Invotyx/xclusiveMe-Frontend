import ImageAvatar from '../image-avatar';

export default function FormDialog(props) {
  const { user, ...other } = props;

  return <ImageAvatar {...other} user={user} />;
}
