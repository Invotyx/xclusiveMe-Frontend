import { all, call, put, takeLatest } from 'redux-saga/effects';
import POST from '../actions/post/types';
import { post } from '../actions/post';
import { snackbar } from '../actions/snackbar';
import {
  getAll,
  add,
  update,
  destory,
} from '../services/post.service';

function* handleGet() {
  try {
    const { data } = yield call(getAll);
    yield put(post.success({ data: data.posts }));
  } catch (e) {
    yield put(post.success({ error: true }));
  }
}

function* handleGetSubscribed() {
  try {
    const { data } = yield call(getAllSubscribed);
    yield put(post.success({ subscribed: data.posts }));
  } catch (e) {
    yield put(post.success({ error: true }));
  }
}

function* handlePost(action) {
  try {
    const { saveData } = action.payload;
    yield call(add, saveData);
    yield put(post.success({}));
    yield call(post.request);
    yield put(
      snackbar.update({
        open: true,
        message: 'Post Added',
        severity: 'success',
      })
    );
    const { callback } = action.payload;
    if (callback) {
      yield call(callback);
    }
  } catch (e) {
    yield put(post.failure({ error: { ...e } }));
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
    yield call(destory, id);
    yield put(post.success({}));
    yield call(post.request);
    yield put(
      snackbar.update({
        open: true,
        message: 'Post deleted successfully!',
        severity: 'success',
      })
    );
  } catch (e) {
    yield put(post.failure({ error: { ...e } }));
    yield put(
      snackbar.update({
        open: true,
        message: 'Something went wrong!',
        severity: 'error',
      })
    );
  }
}

function* handleUpdate(action) {
  try {
    const { id } = action.payload;
    yield call(update, id);
    yield put(post.success({}));
    yield call(post.request);
    yield put(
      snackbar.update({
        open: true,
        message: 'Default Post updated successfully!',
        severity: 'success',
      })
    );
  } catch (e) {
    yield put(post.failure({ error: { ...e } }));
    yield put(
      snackbar.update({
        open: true,
        message: 'Something went wrong!',
        severity: 'error',
      })
    );
  }
}

function* watchPostSagas() {
  yield all([
    takeLatest(POST.GET, handleGet),
    takeLatest(POST.GET_SUBSCRIBED, handleGetSubscribed),
    takeLatest(POST.SAVE, handlePost),
    takeLatest(POST.UPDATE, handleUpdate),
    takeLatest(POST.DELETE, handleDelete),
  ]);
}

export default watchPostSagas;
