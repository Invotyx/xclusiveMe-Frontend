import { all, call, put, takeLatest } from 'redux-saga/effects';
import { snackbar } from '../actions/snackbar';
import { SUBSCRIPTION } from '../actions/subscription/types';
import { subscription } from '../actions/subscription';
import {
  // getUserSubscriptions,
  addSubscription,
  updateSubscription,
} from '../services/subscription.service';

function* handleGet() {
  try {
    // const { data } = yield call(getUserSubscriptions);
    // yield put(subscription.success({ data }));
    yield put(subscription.success({}));
  } catch (e) {
    console.log(e);
  }
}

function* handleAddSubscription(action) {
  try {
    const { id } = action.payload;
    yield call(addSubscription, id);
    yield put(subscription.success({}));
    const { callback } = action.payload;
    if (callback) {
      yield call(callback);
    }
    yield put(
      snackbar.update({
        open: true,
        message: 'Subscription Successfull',
        severity: 'success',
      })
    );
  } catch (e) {
    console.log(e);
    yield put(subscription.failure({ error: { ...e } }));
    yield put(
      snackbar.update({
        open: true,
        message: e.response.data.message,
        severity: 'error',
      })
    );
  }
}

function* handleRemoveSubscription(action) {
  try {
    const { id } = action.payload;
    // yield call(updateSubscription, id);
    yield put(subscription.success({}));
    yield put(
      snackbar.update({
        open: true,
        message: 'Subscription removed successfully',
        severity: 'success',
      })
    );
  } catch (e) {
    console.log(e);
    yield put(subscription.failure({ error: { ...e } }));
    yield put(
      snackbar.update({
        open: true,
        message: e.response.data.message,
        severity: 'error',
      })
    );
  }
}

function* watchSubscriptionSagas() {
  yield all([
    takeLatest(SUBSCRIPTION.GET, handleGet),
    takeLatest(SUBSCRIPTION.ADD, handleAddSubscription),
    takeLatest(SUBSCRIPTION.REMOVE, handleRemoveSubscription),
  ]);
}

export default watchSubscriptionSagas;
