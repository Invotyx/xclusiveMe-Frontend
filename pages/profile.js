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
  profileDataSelector,
} from '../selectors/postSelector';
import { post } from '../actions/post';
import { auth } from '../actions/auth';

export default function Profile() {
  const dispatch = useDispatch();
  const u = useSelector(currentUserSelector);
  const followers = useSelector(currentUserFollowersSelector);
  const followings = useSelector(currentUserFollowingsSelector);

  const _feed = useSelector(profileDataSelector);
  const numberOfPosts = useSelector(numberOfPostsSelector);
  useEffect(() => {
    u && dispatch(post.request());
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
      followers={followers?.totalCount}
      followings={followings?.totalCount}
    />
  );
}
