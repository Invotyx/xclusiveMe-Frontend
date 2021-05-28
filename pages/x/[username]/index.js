import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { user } from '../../../actions/user';
import User from '../../../components/profile/user';
import { xfeed_numberOfPostsSelector } from '../../../selectors/postSelector';
import { singleSelector } from '../../../selectors/userSelector';

export default function Profile() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { username } = router.query;
  useEffect(() => {
    dispatch(user.requestOne(username));
  }, [username]);
  const u = useSelector(singleSelector);
  const numberOfPosts = useSelector(xfeed_numberOfPostsSelector);

  return (
    <User
      user={u}
      profileData={u && u.creator ? u.creator : {}}
      feed={u && u.creator ? u.creator.posts : []}
      follow={(u && !!u.subscriptionPlans) || false}
      numberOfPosts={numberOfPosts}
      afterFollow={() => dispatch(user.requestOne(username))}
    />
  );
}
