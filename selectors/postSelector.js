import { createSelector } from 'reselect';

const postState = (state) => state.get('postData');

const postDataSelector = createSelector(postState, (state) => {
  const data = state.get('data');

  return data;
});

const subscribedSelector = createSelector(postState, (state) =>
  state.get('subscribed')
);

const fetchingSelector = createSelector(postState, (state) =>
  state.get('fetching')
);

const errorSelector = createSelector(postState, (state) => {
  const error = state.get('error');

  return error;
});
export {
  postDataSelector,
  subscribedSelector,
  fetchingSelector,
  errorSelector,
};
