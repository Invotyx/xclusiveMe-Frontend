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
  getAllSubscribed,
  getX,
  addComment,
  addLike,
  getComment,
} from '../services/post.service';
import { bottomalert } from '../actions/bottom-alert';

function* handleGet() {
  try {
    const { data } = yield call(getAll);
    yield put(
      post.success({ data: data.results, numberOfPosts: data.totalCount })
    );
  } catch (e) {
    console.log(e);
    yield put(post.success({ error: true }));
  }
}

function* handleGetSubscribed() {
  try {
    const { data } = yield call(getAllSubscribed);
    yield put(post.success({ subscribed: data.posts }));
  } catch (e) {
    console.log(e);
    yield put(post.success({ error: true }));
  }
}

function* handleGetX(action) {
  try {
    const { username } = action.payload;
    const { data } = yield call(getX, username);
    yield put(
      post.success({
        xfeed: data.results,
        xfeed_numberOfPosts: data.totalCount,
      })
    );
  } catch (e) {
    console.log(e);
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
    console.log(e);
    yield put(post.failure({ error: { ...e } }));
    yield put(
      snackbar.update({
        open: true,
        message: e.response.data.message,
        severity: 'error',
      })
    );
  }
}

function* handleGetComment(action) {
  try {
    const { id } = yield call(getComment, id);
    yield put(post.success({}));
    yield call(post.getComment);
  } catch (e) {
    console.log(e);
    yield put(post.success({ error: true }));
  }
}

function* handleComment(action) {
  try {
    const { id, commentText } = action.payload;
    yield call(addComment, id, commentText);
    yield put(post.success({}));
    yield put(
      snackbar.update({
        open: true,
        message: 'Comment Added',
        severity: 'success',
      })
    );
    const { callback } = action.payload;
    if (callback) {
      yield call(callback);
    }
  } catch (e) {
    console.log(e);
    yield put(post.failure({ error: { ...e } }));
    yield put(
      snackbar.update({
        open: true,
        message: e.response.data.message,
        severity: 'error',
      })
    );
  }
}

function* handleLike(action) {
  try {
    const { id } = action.payload;
    yield call(addLike, id);
    yield put(post.success({}));
    yield put(
      snackbar.update({
        open: true,
        message: 'Liked successfully!',
        severity: 'success',
      })
    );
  } catch (e) {
    console.log(e);
    yield put(post.failure({ error: { ...e } }));
    yield put(
      snackbar.update({
        open: true,
        message: e.response.data.message,
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
    console.log(e);
    yield put(post.failure({ error: { ...e } }));
    yield put(
      snackbar.update({
        open: true,
        message: e.response.data.message,
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
    console.log(e);
    yield put(post.failure({ error: { ...e } }));
    yield put(
      snackbar.update({
        open: true,
        message: e.response.data.message,
        severity: 'error',
      })
    );
  }
}

function* handleUploadImage({ payload }) {
  try {
    const { fileObject } = payload;
    const response = yield call(uploadImage, fileObject);
    yield put(
      bottomalert.update({
        open: true,
        message: 'Image Updated Successfully!',
        severity: 'success',
      })
    );
    const { callback } = payload;
    if (callback) {
      yield call(callback, response.data[0]);
    }
  } catch (e) {
    console.log(e);
    console.log('Error occurred in UPLOAD_IMAGE');
    yield put(
      bottomalert.update({
        open: true,
        message: e.response.data.message,
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

    const { callback } = payload;
    if (callback) {
      yield call(callback, res.data[0]);
    }
  } catch (e) {
    console.log(e);
    console.log('Error occurred in UPLOAD_VIDEO');
  }
}

function* handleUploadVideoFinalReq({ payload }) {
  try {
    const { fileObject, url } = payload;
    yield call(uploadVideoFinalReq, fileObject, url);
    yield put(
      bottomalert.update({
        open: true,
        message: 'Video Updated Successfully!',
        severity: 'success',
      })
    );
  } catch (e) {
    console.log(e);
    console.log('Error occurred in UPLOAD_VIDEO');
    yield put(
      bottomalert.update({
        open: true,
        message: e.response.data.message,
        severity: 'error',
      })
    );
  }
}

function* watchPostSagas() {
  yield all([
    takeLatest(POST.GET, handleGet),
    takeLatest(POST.GET_SUBSCRIBED, handleGetSubscribed),
    takeLatest(POST.GET_X, handleGetX),
    takeLatest(POST.SAVE, handlePost),
    takeLatest(POST.ADD_COMMENT, handleComment),
    takeLatest(POST.GET_COMMENTS, handleGetComment),
    takeLatest(POST.UPDATE, handleUpdate),
    takeLatest(POST.DELETE, handleDelete),
    takeLatest(POST.ADD_LIKE, handleLike),
    takeLatest(POST.UPLOAD_IMAGE, handleUploadImage),
    takeLatest(POST.UPLOAD_VIDEO_REQ, handleUploadVideoReq),
    takeLatest(POST.UPLOAD_VIDEO_FINAL_REQ, handleUploadVideoFinalReq),
  ]);
}

export default watchPostSagas;
