import { all, call, put, takeLatest } from 'redux-saga/effects';
import POST from '../actions/post/types';
import { post } from '../actions/post';
import { snackbar } from '../actions/snackbar';
import {
  getAll,
  uploadImage,
  update,
  destory,
  uploadVideoReq1,
  uploadVideoFinalReq,
  add,
} from '../services/post.service';
import { bottomalert } from '../actions/bottom-alert';

function* handleGet() {
  try {
    const { data } = yield call(getAll);
    yield put(post.success({ data: data.posts }));
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

function* handleUploadImage({ payload }) {
  try {
    const { fileObject } = payload;
    const response = yield call(uploadImage, fileObject);
    yield call(post.save);
    yield put(
      bottomalert.update({
        open: true,
        message: 'Image Updated Successfully!',
        severity: 'success',
      })
    );
    const { callback } = payload;
    if (callback) {
      yield call(callback, response.data[0].url);
    }
  } catch (error) {
    console.log('Error occurred in UPLOAD_IMAGE');
    console.log(error);
    yield put(
      bottomalert.update({
        open: true,
        message: 'SomeThing Went Wrong!',
        severity: 'error',
      })
    );
  }
}

function* handleUploadVideoReq({ payload }) {
  try {
    const { fileObject } = payload;
    const res = yield call(uploadVideoReq1, fileObject);
    const url = res.data[0].url;
    yield call(post.save);

    const { callback } = payload;
    if (callback) {
      yield call(callback, url);
    }
  } catch (error) {
    console.log('Error occurred in UPLOAD_VIDEO');
    console.log(error);
  }
}

function* handleUploadVideoFinalReq({ payload }) {
  try {
    const { fileObject, url } = payload;
    yield call(uploadVideoFinalReq, fileObject, url);
    yield call(post.save);
    yield put(
      bottomalert.update({
        open: true,
        message: 'Video Updated Successfully!',
        severity: 'success',
      })
    );
  } catch (error) {
    console.log('Error occurred in UPLOAD_VIDEO');
    console.log(error);
    yield put(
      bottomalert.update({
        open: true,
        message: 'SomeThing Went Wrong!',
        severity: 'error',
      })
    );
  }
}

function* watchPostSagas() {
  yield all([
    takeLatest(POST.GET, handleGet),
    takeLatest(POST.SAVE, handlePost),
    takeLatest(POST.UPDATE, handleUpdate),
    takeLatest(POST.DELETE, handleDelete),
    takeLatest(POST.UPLOAD_IMAGE, handleUploadImage),
    takeLatest(POST.UPLOAD_VIDEO_REQ, handleUploadVideoReq),
    takeLatest(POST.UPLOAD_VIDEO_FINAL_REQ, handleUploadVideoFinalReq),
  ]);
}

export default watchPostSagas;
