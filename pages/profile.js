import User from '../components/profile/user';
import { useDispatch, useSelector } from 'react-redux';
import {
  currentUserSelector,
  currentUserFollowersSelector,
  currentUserFollowingsSelector,
} from '../selectors/authSelector';
import { useEffect } from 'react';
import {
  numberOfPostsSelector,
  postDataSelector,
} from '../selectors/postSelector';
import { post } from '../actions/post';
import { auth } from '../actions/auth';

export default function Profile() {
  const dispatch = useDispatch();
  const u = useSelector(currentUserSelector);
  const followers = useSelector(currentUserFollowersSelector);
  const followings = useSelector(currentUserFollowingsSelector);

  const _feed = useSelector(postDataSelector);
  const numberOfPosts = useSelector(numberOfPostsSelector);
  useEffect(() => {
    u && dispatch(post.request({ userId: u.id }));
    dispatch(auth.requestFollowers());
    dispatch(auth.requestFollowings());
  }, [u]);

  return (
    <User
      user={u}
      profileData={u}
      feed={_feed}
      numberOfPosts={numberOfPosts}
      me={1}
      followers={followers}
      followings={followings}
    />
  );
}
