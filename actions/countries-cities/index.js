import { createAction } from '../../utils';
import COUNTRIES_CITIES from './types';

export const countriesCities = {
  getCountries: (data) =>
    createAction(COUNTRIES_CITIES.GET_COUNTRIES, {
      ...data,
      fetching: true,
      success: false,
      error: null,
    }),
  getCities: (countryId) =>
    createAction(COUNTRIES_CITIES.GET_CITIES, {
      countryId,
      fetching: true,
      success: false,
      error: null,
    }),
  success: (data) =>
    createAction(COUNTRIES_CITIES.SUCCESS, {
      ...data,
      fetching: false,
      success: true,
      error: 'helllo',
    }),
  failure: (error) =>
    createAction(COUNTRIES_CITIES.FAILURE, {
      ...error,
      fetching: false,
      success: false,
    }),
};
