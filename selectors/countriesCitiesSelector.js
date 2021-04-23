import { createSelector } from 'reselect';

const countriesCitiesBase = (state) => state.get('countriesCities');

const fetchingSelector = createSelector(countriesCitiesBase, (state) =>
  state.get('fetching')
);

const countriesSelector = createSelector(countriesCitiesBase, (state) =>
  state.get('countriesList')
);

const planActivatedCountriesSelector = createSelector(
  countriesCitiesBase,
  (state) => state.get('planActivatedCountries')
);

const citiesSelector = createSelector(countriesCitiesBase, (state) =>
  state.get('citiesList')
);

export {
  fetchingSelector,
  countriesSelector,
  citiesSelector,
  planActivatedCountriesSelector,
};
