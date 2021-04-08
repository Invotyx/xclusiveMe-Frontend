import { put, call, takeLatest, all } from 'redux-saga/effects';

import { SNACKBAR } from '../actions/snackbar/types';

import { snackbar } from '../actions/snackbar';

function* handleUpdate(action) {
  const { open } = action.payload;
  if (open) {
    yield put(snackbar.show());
  } else {
    yield put(snackbar.hide());
  }
}

function* watchSnackbarSagas() {
  yield all([takeLatest(SNACKBAR.UPDATE, handleUpdate)]);
}

export default watchSnackbarSagas;
