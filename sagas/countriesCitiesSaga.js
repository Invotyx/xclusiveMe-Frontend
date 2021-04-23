import { all, call, put, takeLatest } from 'redux-saga/effects';
import COUNTRIES_CITIES from '../actions/countries-cities/types';
import { countriesCities } from '../actions/countries-cities';

import {
  getCities,
  getCountries,
  getPlanActivatedCountries,
} from '../services/countriesCities';

function* GET_COUNTRIES(action) {
  try {
    if (action.payload.planActivated) {
      const { data } = yield call(getPlanActivatedCountries);
      yield put(countriesCities.success({ planActivatedCountries: data }));
    } else {
      const { data } = yield call(getCountries);
      yield put(countriesCities.success({ countriesList: data.countries }));
    }
  } catch (error) {
    yield put(countriesCities.failure({ error: { ...error } }));
  }
}

function* GET_CITIES(action) {
  try {
    const { countryId } = action.payload;
    const { data } = yield call(getCities, countryId);
    yield put(countriesCities.success({ citiesList: data.data }));
  } catch (error) {
    yield put(countriesCities.failure({ error: { ...error } }));
  }
}

function* watchCountriesCitiesSagas() {
  yield all([
    takeLatest(COUNTRIES_CITIES.GET_COUNTRIES, GET_COUNTRIES),
    takeLatest(COUNTRIES_CITIES.GET_CITIES, GET_CITIES),
  ]);
}

export default watchCountriesCitiesSagas;
