import { createSelector } from 'reselect';

const authState = (state) => state.get('authData');

const authDataSelector = createSelector(authState, (state) => {
  const data = state.get('data');

  return data;
});

const loggedInSelector = createSelector(authState, (state) =>
  state.get('loggedIn')
);

const uploadingCoverSelector = createSelector(authState, (state) =>
  state.get('uploadingCover')
);

const fetchingSelector = createSelector(authState, (state) =>
  state.get('fetching')
);

const currentUserSelector = createSelector(authState, (state) =>
  state.get('currentUser')
);

const currentUserFollowersSelector = createSelector(authState, (state) =>
  state.get('followers')
);

const currentUserFollowingsSelector = createSelector(authState, (state) =>
  state.get('followings')
);

const currentUserSessionsSelector = createSelector(authState, (state) =>
  state.get('userSessions')
);

const errorSelector = createSelector(authState, (state) => {
  const error = state.get('error');

  return error;
});

export {
  authDataSelector,
  loggedInSelector,
  fetchingSelector,
  uploadingCoverSelector,
  currentUserFollowersSelector,
  currentUserFollowingsSelector,
  currentUserSelector,
  currentUserSessionsSelector,
  errorSelector,
};
