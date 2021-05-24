import { useRouter } from 'next/router';
import User from '../../../components/profile/user';

export default function Profile() {
  const router = useRouter();
  const { username } = router.query;

  return <User username={username} />;
}
