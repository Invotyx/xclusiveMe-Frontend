import { createSelector } from 'reselect';

const userState = state => state.get('userData');

const userDataSelector = createSelector(userState, state => {
  const data = state.get('data');

  return data;
});

const singleSelector = createSelector(userState, state => state.get('single'));

const fetchingSelector = createSelector(userState, state =>
  state.get('fetching')
);

const errorSelector = createSelector(userState, state => {
  const error = state.get('error');

  return error;
});
export { userDataSelector, singleSelector, fetchingSelector, errorSelector };
