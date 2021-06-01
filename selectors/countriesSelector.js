import { createSelector } from 'reselect';

const authState = (state) => state.get('authData');

const countriesSelector = createSelector(authState, (state) =>
  state.get('countriesList')
);

export { countriesSelector };
