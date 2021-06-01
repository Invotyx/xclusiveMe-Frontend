import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { post } from '../../../actions/post';
import { user } from '../../../actions/user';
import User from '../../../components/profile/user';
import { xfeed_numberOfPostsSelector } from '../../../selectors/postSelector';
import { xfeedSelector } from '../../../selectors/postSelector';
import { singleSelector } from '../../../selectors/userSelector';

export default function Profile() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { username } = router.query;
  useEffect(() => {
    dispatch(user.requestOne(username));
    dispatch(post.requestX({ username }));
  }, [username]);
  const u = useSelector(singleSelector);
  const numberOfPosts = useSelector(xfeed_numberOfPostsSelector);
  const _feed = useSelector(xfeedSelector);

  return (
    <User
      user={u}
      profileData={u && u.creator ? u.creator : u}
      feed={_feed}
      subscriptionPlans={u?.subscriptionPlans}
      numberOfPosts={numberOfPosts}
      afterFollow={() => dispatch(user.requestOne(username))}
    />
  );
}
