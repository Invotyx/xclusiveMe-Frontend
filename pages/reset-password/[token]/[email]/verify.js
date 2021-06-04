import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { auth } from '../../../../actions/auth';

export default function ResetPassword() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { token, email } = router.query;
  dispatch(auth.resetPasswordVerify({ token, email }));
  return <p>loading...</p>;
}
