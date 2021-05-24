import User from '../components/profile/user';
import { useSelector } from 'react-redux';
import { currentUserSelector } from '../selectors/authSelector';

export default function Profile() {
  const u = useSelector(currentUserSelector);

  return <User user={u} />;
}
