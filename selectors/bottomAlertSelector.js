import { createSelector } from 'reselect';

const bottomAlertState = (state) => state.get('bottomAlertData');

const bottomAlertMessageSelector = createSelector(bottomAlertState, (state) => {
  const message = state.get('message');

  return message;
});

const openSelector = createSelector(bottomAlertState, (state) =>
  state.get('open')
);

const severitySelector = createSelector(bottomAlertState, (state) =>
  state.get('severity')
);

export { bottomAlertMessageSelector, openSelector, severitySelector };
