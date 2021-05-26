import { createSelector } from 'reselect';

const paymentMethodState = (state) => state.get('paymentMethodData');

const paymentMethodDataSelector = createSelector(
  paymentMethodState,
  (state) => {
    const data = state.get('data');

    return data;
  }
);

const fetchingSelector = createSelector(paymentMethodState, (state) =>
  state.get('fetching')
);

const errorSelector = createSelector(paymentMethodState, (state) => {
  const error = state.get('error');

  return error;
});
export { paymentMethodDataSelector, fetchingSelector, errorSelector };
