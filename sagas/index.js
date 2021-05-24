import { all, fork } from 'redux-saga/effects';
import employeeSagas from './employeeSagas';
import userSagas from './userSagas';
import authSagas from './authSagas';
import paymentSagas from './payment.saga';
import postSagas from './postSagas';

export default function* rootSaga() {
  yield all([
    fork(authSagas),
    fork(userSagas),
    fork(employeeSagas),
    fork(paymentSagas),
    fork(postSagas),
  ]);
}
