import { fromJS } from 'immutable';
import COUNTRIES_CITIES from '../actions/countries-cities/types';

const initialState = fromJS({
  countriesList: [],
  planActivatedCountries: [],
  citiesList: [],
  fetching: false,
  success: false,
  error: null,
});

export default function countriesCitiesReducer(state = initialState, action) {
  switch (action.type) {
    case COUNTRIES_CITIES.GET_COUNTRIES:
    case COUNTRIES_CITIES.GET_CITIES:
    case COUNTRIES_CITIES.SUCCESS:
      return state.merge(action.payload);
    default:
      return state;
  }
}
