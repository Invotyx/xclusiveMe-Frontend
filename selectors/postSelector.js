import { createSelector } from 'reselect';

const postState = state => state.get('postData');

const postDataSelector = createSelector(postState, state => {
  const data = state.get('data');
  return data;
});

const purchasedPostsSelector = createSelector(postState, state => {
  const data = state.get('purchased');
  return data;
});

const settingsNotify = createSelector(postState, state => {
  const data = state.get('notiData');
  return data;
});

const profileDataSelector = createSelector(postState, state => {
  const data = state.get('profileData');
  return data;
});

const totalrepliesSelector = createSelector(postState, state => {
  const data = state.get('repliesCount');
  return data;
});

const notificationsData = createSelector(postState, state => {
  const data = state.get('notifications');
  return data;
});

const notificationsCount = createSelector(postState, state => {
  const data = state.get('notiCount');
  return data;
});

const repliesDataSelector = createSelector(postState, state => {
  const data = state.get('repliesData');
  return data;
});

const getCommentsDataSelector = createSelector(postState, state => {
  const data = state.get('Commdata');
  return data;
});

const singlepostDataSelector = createSelector(postState, state => {
  const data = state.get('singleData');
  return data;
});

const singleDataImagesSelector = createSelector(postState, state =>
  state.get('singleDataImages')
);

const numberOfPostsSelector = createSelector(postState, state =>
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
  purchasedPostsSelector,
  notificationsCount,
  profileDataSelector,
  singlepostDataSelector,
  singleDataImagesSelector,
  numberOfPostsSelector,
  subscribedSelector,
  xfeedSelector,
  xfeed_numberOfPostsSelector,
  getCommentsDataSelector,
  fetchingSelector,
  errorSelector,
  repliesDataSelector,
  totalrepliesSelector,
  notificationsData,
  settingsNotify,
};
