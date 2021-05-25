import { createSelector } from 'reselect';

const subscriptionState = (state) => state.get('subscriptionData');

const subscriptionDataSelector = createSelector(subscriptionState, (state) => {
  const data = state.get('data');

  return data;
});

const fetchingSelector = createSelector(subscriptionState, (state) =>
  state.get('fetching')
);

const errorSelector = createSelector(subscriptionState, (state) => {
  const error = state.get('error');

  return error;
});
export { subscriptionDataSelector, fetchingSelector, errorSelector };
