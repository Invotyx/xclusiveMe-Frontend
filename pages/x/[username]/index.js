import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { user } from '../../../actions/user';
import User from '../../../components/profile/user';
import { singleSelector } from '../../../selectors/userSelector';

export default function Profile() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { username } = router.query;
  useEffect(() => dispatch(user.requestOne(username)), [username]);
  const u = useSelector(singleSelector);
  const [_feed, set_feed] = useState([]);
  useEffect(() => {
    setTimeout(() => {
      set_feed([{}, {}, {}]);
    }, 3000);
  }, []);

  return <User user={u} feed={_feed} />;
}
