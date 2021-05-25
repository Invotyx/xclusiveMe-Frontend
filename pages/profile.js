import User from '../components/profile/user';
import { useSelector } from 'react-redux';
import { currentUserSelector } from '../selectors/authSelector';
import { useEffect, useState } from 'react';

export default function Profile() {
  const u = useSelector(currentUserSelector);

  const [_feed, set_feed] = useState([]);
  useEffect(() => {
    setTimeout(() => {
      set_feed([{}, {}, {}]);
    }, 3000);
  }, []);

  return <User user={u} feed={_feed} />;
}
