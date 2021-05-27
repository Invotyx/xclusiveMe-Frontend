import { all, call, put, takeLatest } from 'redux-saga/effects';
import PAYMENT_METHOD from '../actions/payment-method/types';
import { paymentMethod } from '../actions/payment-method';
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
    yield put(paymentMethod.success({ data: data.paymentMethods }));
  } catch (e) {
    console.log(e);
    yield put(paymentMethod.success({ error: true }));
  }
}

function* handlePost(action) {
  try {
    const { name, token } = action.payload;
    yield call(addPayment, name, token);
    yield put(paymentMethod.success({}));
    yield call(paymentMethod.request);
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
    yield put(paymentMethod.failure({ error: { ...e } }));
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
    yield call(deletePaymentMethod, id);
    yield put(paymentMethod.success({}));
    yield call(paymentMethod.request);
    const { callback } = action.payload;
    if (callback) {
      yield call(callback);
    }
    yield put(
      snackbar.update({
        open: true,
        message: 'Payment Method deleted successfully!',
        severity: 'success',
      })
    );
  } catch (e) {
    console.log(e);
    yield put(paymentMethod.failure({ error: { ...e } }));
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
    yield call(setPaymentMethod, id);
    yield put(paymentMethod.success({}));
    yield call(paymentMethod.request);
    const { callback } = action.payload;
    if (callback) {
      yield call(callback);
    }
    yield put(
      snackbar.update({
        open: true,
        message: 'Default Payment Method updated successfully!',
        severity: 'success',
      })
    );
  } catch (e) {
    console.log(e);
    yield put(paymentMethod.failure({ error: { ...e } }));
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
    takeLatest(PAYMENT_METHOD.GET, handleGet),
    takeLatest(PAYMENT_METHOD.SAVE, handlePost),
    takeLatest(PAYMENT_METHOD.SET_DEFAULT, handleSetDefault),
    takeLatest(PAYMENT_METHOD.DELETE, handleDelete),
  ]);
}

export default watchPaymentSagas;
