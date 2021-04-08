import { createSelector } from 'reselect';

const authState = (state) => state.get('authData');

const authDataSelector = createSelector(authState, (state) => {
  const data = state.get('data');

  return data;
});

const loggedInSelector = createSelector(authState, (state) =>
  state.get('loggedIn')
);

const fetchingSelector = createSelector(authState, (state) =>
  state.get('fetching')
);

const currentUserSelector = createSelector(authState, (state) =>
  state.get('currentUser')
);

export {
  authDataSelector,
  loggedInSelector,
  fetchingSelector,
  currentUserSelector,
};
