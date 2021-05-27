import { useRouter } from 'next/router';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import PAYMENT from '../actions/payment/types';
import { payment } from '../actions/payment';
import { snackbar } from '../actions/snackbar';
import {
  getUserPaymentMethods,
  addPayment,
  deletePaymentMethod,
  setPaymentMethod,
} from '../services/payment.service';

function* handleGet() {
  try {
    const { data } = yield call(getUserPaymentMethods);
    yield put(payment.success({ data: data.paymentMethods }));
  } catch (e) {
    console.log(e);
    yield put(payment.success({ error: true }));
  }
}

function* handlePostPayment(action) {
  try {
    const { name, token } = action.payload;
    const { data } = yield call(addPayment, name, token);
    yield put(payment.success({}));
    const paymentMethods = yield call(getUserPaymentMethods);
    yield put(payment.success({ data: paymentMethods.data.paymentMethods }));
    yield put(
      snackbar.update({
        open: true,
        message: 'Payment Method Added',
        severity: 'success',
      })
    );
    const { callback } = action.payload;
    if (callback) {
      yield call(callback);
    }
  } catch (e) {
    console.log(e);
    yield put(payment.success({ error: true }));
    yield put(
      snackbar.update({
        open: true,
        message: 'Something went wrong!',
        severity: 'error',
      })
    );
  }
}

function* handleDelete(action) {
  try {
    const { id } = action.payload;
    const { data } = yield call(deletePaymentMethod, id);
    yield put(payment.success({}));
    const paymentMethods = yield call(getUserPaymentMethods);
    yield put(payment.success({ data: paymentMethods.data.paymentMethods }));
    yield put(
      snackbar.update({
        open: true,
        message: 'Payment Method deleted successfully!',
        severity: 'success',
      })
    );
  } catch (e) {
    console.log(e);
    yield put(payment.failure({ error: { ...e } }));
    yield put(
      snackbar.update({
        open: true,
        message: 'Something went wrong!',
        severity: 'error',
      })
    );
  }
}

function* handleSetDefault(action) {
  try {
    const { id } = action.payload;
    const { data } = yield call(setPaymentMethod, id);
    yield put(payment.success({}));
    const paymentMethods = yield call(getUserPaymentMethods);
    yield put(payment.success({ data: paymentMethods.data.paymentMethods }));
    yield put(
      snackbar.update({
        open: true,
        message: 'Default Payment Method updated successfully!',
        severity: 'success',
      })
    );
  } catch (e) {
    console.log(e);
    yield put(payment.failure({ error: { ...e } }));
    yield put(
      snackbar.update({
        open: true,
        message: 'Something went wrong!',
        severity: 'error',
      })
    );
  }
}

function* watchPaymentSagas() {
  yield all([
    takeLatest(PAYMENT.GET, handleGet),
    takeLatest(PAYMENT.DELETE, handleDelete),
    takeLatest(PAYMENT.SET_DEFAULT, handleSetDefault),
    takeLatest(PAYMENT.ADD_PAYMENT, handlePostPayment),
  ]);
}

export default watchPaymentSagas;
