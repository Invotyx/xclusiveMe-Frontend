import { createSelector } from 'reselect';

const postState = state => state.get('postData');

const postDataSelector = createSelector(postState, state => {
  const data = state.get('data');

  return data;
});

const numberOfPostsSelector = createSelector(postState, (state) =>
  state.get('numberOfPosts')
);

const subscribedSelector = createSelector(postState, state =>
  state.get('subscribed')
);

const xfeedSelector = createSelector(postState, state => state.get('xfeed'));

const xfeed_numberOfPostsSelector = createSelector(postState, state =>
  state.get('xfeed_numberOfPosts')
);

const fetchingSelector = createSelector(postState, state =>
  state.get('fetching')
);

const errorSelector = createSelector(postState, state => {
  const error = state.get('error');

  return error;
});
export {
  postDataSelector,
  singlepostDataSelector,
  numberOfPostsSelector,
  subscribedSelector,
  xfeedSelector,
  xfeed_numberOfPostsSelector,
  fetchingSelector,
  errorSelector,
};
