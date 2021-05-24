import { createSelector } from 'reselect';

const postState = (state) => state.get('postData');

const postDataSelector = createSelector(postState, (state) => {
  const data = state.get('data');

  return data;
});

const fetchingSelector = createSelector(postState, (state) =>
  state.get('fetching')
);

const errorSelector = createSelector(postState, (state) => {
  const error = state.get('error');

  return error;
});
export { postDataSelector, fetchingSelector, errorSelector };
