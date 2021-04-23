import { createActionTypes } from '../../utils';

const CountriesCities = createActionTypes('CountriesCities', [
  'GET_COUNTRIES',
  'GET_CITIES',
  'ERROR',
  'SUCCESS',
]);

export default CountriesCities;
