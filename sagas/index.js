import { all, fork } from 'redux-saga/effects';
import employeeSagas from './employeeSagas';
import userSagas from './userSagas';
import authSagas from './authSagas';
import postSagas from './postSagas';
import subscriptionSagas from './subscription.saga';
import paymentMethodSagas from './paymentMethodSagas';
import chatSaga from './chatSaga';

export default function* rootSaga() {
  yield all([
    fork(authSagas),
    fork(userSagas),
    fork(employeeSagas),
    fork(postSagas),
    fork(subscriptionSagas),
    fork(paymentMethodSagas),
    fork(chatSaga),
  ]);
}
