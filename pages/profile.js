import User from '../components/profile/user';
import { useDispatch, useSelector } from 'react-redux';
import { currentUserSelector } from '../selectors/authSelector';
import { useEffect } from 'react';
import {
  numberOfPostsSelector,
  postDataSelector,
} from '../selectors/postSelector';
import { post } from '../actions/post';

export default function Profile() {
  const dispatch = useDispatch();
  const u = useSelector(currentUserSelector);

  const _feed = useSelector(postDataSelector);
  const numberOfPosts = useSelector(numberOfPostsSelector);
  useEffect(() => {
    u && dispatch(post.request({ userId: u.id }));
  }, [u]);

  return <User user={u} feed={_feed} numberOfPosts={numberOfPosts} me={1} />;
}
