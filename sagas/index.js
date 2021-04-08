import { all, fork } from 'redux-saga/effects';
import employeeSagas from './employeeSagas';

export default function* rootSaga() {
  yield all([fork(employeeSagas)]);
}
