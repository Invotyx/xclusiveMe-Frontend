import { createSelector } from 'reselect';

const userState = state => state.get('userData');

const userDataSelector = createSelector(userState, state => {
  const data = state.get('data');

  return data;
});

const singleSelector = createSelector(userState, state => state.get('single'));

const followersSelector = createSelector(userState, state =>
  state.get('followersData')
);

const followerCountSelector = createSelector(userState, state =>
  state.get('followersCount')
);

const allUsersSelector = createSelector(userState, state =>
  state.get('allData')
);

const fetchingSelector = createSelector(userState, state =>
  state.get('fetching')
);

const searchedSelector = createSelector(userState, state =>
  state.get('searched')
);

const errorSelector = createSelector(userState, state => {
  const error = state.get('error');

  return error;
});
export {
  userDataSelector,
  followersSelector,
  followerCountSelector,
  allUsersSelector,
  singleSelector,
  fetchingSelector,
  searchedSelector,
  errorSelector,
};
