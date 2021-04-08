import { all, fork } from 'redux-saga/effects';
import employeeSagas from './employeeSagas';
import authSagas from './authSagas';

export default function* rootSaga() {
  yield all([fork(authSagas), fork(employeeSagas)]);
}
