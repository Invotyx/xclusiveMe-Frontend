import { createSelector } from 'reselect';

const userState = (state) => state.get('userData');

const userDataSelector = createSelector(userState, (state) => {
  const data = state.get('data');

  return data;
});

const loggedInSelector = createSelector(userState, (state) =>
  state.get('loggedIn')
);

const fetchingSelector = createSelector(userState, (state) =>
  state.get('fetching')
);

const currentUserSelector = createSelector(userState, (state) =>
  state.get('currentUser')
);

export {
  userDataSelector,
  loggedInSelector,
  fetchingSelector,
  currentUserSelector,
};
