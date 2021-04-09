import { createSelector } from 'reselect';

const paymentState = (state) => state.get('paymentData');

const paymentDataSelector = createSelector(paymentState, (state) => {
  const data = state.get('data');

  return data;
});

const fetchingSelector = createSelector(paymentState, (state) =>
  state.get('fetching')
);

const errorSelector = createSelector(paymentState, (state) => {
  const error = state.get('error');

  return error;
});
export { paymentDataSelector, fetchingSelector, errorSelector };
