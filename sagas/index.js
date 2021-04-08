import { all, fork } from 'redux-saga/effects';
import employeeSagas from './employeeSagas';
import userSagas from './userSagas';

export default function* rootSaga() {
  yield all([fork(userSagas), fork(employeeSagas)]);
}
