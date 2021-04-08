import { createSelector } from 'reselect';

const snackbarState = (state) => state.get('snackbarData');

const snackbarMessageSelector = createSelector(snackbarState, (state) => {
  const message = state.get('message');

  return message;
});

const openSelector = createSelector(snackbarState, (state) =>
  state.get('open')
);

const severitySelector = createSelector(snackbarState, (state) =>
  state.get('severity')
);

export { snackbarMessageSelector, openSelector, severitySelector };
