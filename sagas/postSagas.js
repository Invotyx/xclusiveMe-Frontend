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
  deleteLikes,
  getComment,
  addCommentLike,
  delCommentLike,
  getOnePost,
  getReplies,
  getNotifications,
  viewNotification,
  addSettingNotification,
  getSettingNotifications,
  postPurchase,
  reportPost,
  getCommentsData,
  tipPost,
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

function* handleGetProfile() {
  try {
    const { data } = yield call(getAll);
    yield put(
      post.success({
        profileData: data.results,
        numberOfPosts: data.totalCount,
      })
    );
  } catch (e) {
    console.log(e);
    yield put(post.success({ error: true }));
  }
}

function* getAllNotifications() {
  try {
    const { data } = yield call(getNotifications);
    yield put(
      post.success({ notifications: data.results, notiCount: data.totalCount })
    );
  } catch (e) {
    yield put(post.success({ error: true }));
  }
}

function* getSettingsNotifications() {
  try {
    const { data } = yield call(getSettingNotifications);
    console.log(data);
    yield put(post.success({ notiData: data.notifications }));
  } catch (e) {
    console.log(e);
    yield put(post.success({ error: true }));
  }
}

function* handleAddSettingNotifications(action) {
  try {
    const { data } = action.payload;
    yield call(addSettingNotification, data);
    yield put(post.success({}));
    yield call(post.request);
    yield put(
      snackbar.update({
        open: true,
        message: 'Saved',
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

function* handleGetOne(action) {
  try {
    const { id } = action.payload;
    const { data } = yield call(getOnePost, id);
    yield put(post.success({ singleData: data[0] }));
    const { callback } = action.payload;
    if (callback) {
      yield call(callback);
    }
  } catch (e) {
    console.log(e);
    yield put(post.success({ error: true }));
  }
}

function* handleViewNotify(action) {
  try {
    const { id, isNotify } = action.payload;
    yield call(viewNotification, id, isNotify);
    yield put(post.success({}));
    yield put(
      snackbar.update({
        open: true,
        message: 'Viewed successfully!',
        severity: 'success',
      })
    );
    const { callback } = action.payload;
    if (callback) {
      yield call(callback);
    }
  } catch (e) {
    console.log(e);
    yield put(post.success({ error: true }));
  }
}

function* handleGetSubscribed() {
  try {
    const { data } = yield call(getAllSubscribed);
    yield put(post.success({ subscribed: data.results }));
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
    const { id, page, limit } = action.payload;
    console.log(id, page, limit);
    const { data } = yield call(getCommentsData, id, page, limit);
    yield put(post.success({ Commdata: data }));
  } catch (e) {
    console.log(e);
    yield put(post.success({ error: true }));
  }
}

function* handleGetReplies(action) {
  try {
    const { postId, parentCommentId, page, limit } = action.payload;
    const { data } = yield call(
      getReplies,
      postId,
      parentCommentId,
      page,
      limit
    );
    yield put(
      post.success({
        repliesData: data.results,
        repliesCount: data.totalCount,
      })
    );
  } catch (e) {
    console.log(e);
    yield put(post.success({ error: true }));
  }
}

// function* handleGetX(action) {
//   try {
//     const { username } = action.payload;
//     const { data } = yield call(getX, username);
//     yield put(
//       post.success({
//         xfeed: data.results,
//         xfeed_numberOfPosts: data.totalCount,
//       })
//     );
//   } catch (e) {
//     console.log(e);
//     yield put(post.success({ error: true }));
//   }
// }

function* handleComment(action) {
  try {
    const { id, commentText } = action.payload;
    yield call(addComment, id, commentText);
    yield put(post.success({}));
    yield put(
      snackbar.update({
        open: true,
        message: 'Added',
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
    yield call(post.request);
    yield call(post.requestSubscribed);
    yield put(
      snackbar.update({
        open: true,
        message: 'Liked successfully!',
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

function* handlePostPurchase(action) {
  try {
    const { id } = action.payload;
    yield call(postPurchase, id);
    yield put(post.success({}));

    yield put(
      snackbar.update({
        open: true,
        message: 'Sended successfully!',
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

function* handleCommentLike(action) {
  try {
    const { id } = action.payload;
    yield call(addCommentLike, id);
    yield put(post.success({}));
    yield call(post.request);
    yield call(post.requestSubscribed);
    yield put(
      snackbar.update({
        open: true,
        message: 'Liked successfully!',
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

function* handleDelCommentLike(action) {
  try {
    const { id } = action.payload;
    yield call(delCommentLike, id);
    yield put(post.success({}));

    yield put(
      snackbar.update({
        open: true,
        message: 'Like deleted successfully!',
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

function* handleDelLike(action) {
  try {
    const { id } = action.payload;
    yield call(deleteLikes, id);
    yield put(post.success({}));

    yield put(
      snackbar.update({
        open: true,
        message: 'Like deleted successfully!',
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
    console.log(payload);
    const { fileObject } = payload;
    const response = yield call(uploadImage, fileObject);
    console.log(response);
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
function* postsReport(action) {
  try {
    const { reportData } = action.payload;
    yield call(reportPost, reportData);
    yield put(post.success({}));
    yield call(post.request);
    yield put(
      snackbar.update({
        open: true,
        message: ' Reported',
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

function* handleAddTip(action) {
  try {
    const { saveData } = action.payload;
    yield call(tipPost, saveData);
    yield put(post.success({}));
    yield call(post.request);
    yield put(
      snackbar.update({
        open: true,
        message: 'Tip Added',
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

function* watchPostSagas() {
  yield all([
    takeLatest(POST.GET, handleGet),
    takeLatest(POST.GET, handleGetProfile),
    takeLatest(POST.PURCHASE_POST, handlePostPurchase),
    takeLatest(POST.GET_NOTIFICATIONS, getAllNotifications),
    takeLatest(POST.ADD_SETTING_NOTIFICATIONS, handleAddSettingNotifications),
    takeLatest(POST.GET_SETTING_NOTIFICATIONS, getSettingsNotifications),
    takeLatest(POST.VIEW_NOTIFICATION, handleViewNotify),
    takeLatest(POST.GET_ONE, handleGetOne),
    takeLatest(POST.GET_SUBSCRIBED, handleGetSubscribed),
    takeLatest(POST.GET_X, handleGetX),
    takeLatest(POST.SAVE, handlePost),
    takeLatest(POST.ADD_COMMENT, handleComment),
    takeLatest(POST.GET_COMMENTS, handleGetComment),
    takeLatest(POST.GET_REPLIES, handleGetReplies),
    takeLatest(POST.UPDATE, handleUpdate),
    takeLatest(POST.DELETE, handleDelete),
    takeLatest(POST.ADD_LIKE, handleLike),
    takeLatest(POST.DELETE_LIKES, handleDelLike),
    takeLatest(POST.COMMENT_LIKE, handleCommentLike),
    takeLatest(POST.DEL_COMMENT_LIKE, handleDelCommentLike),
    takeLatest(POST.UPLOAD_IMAGE, handleUploadImage),
    takeLatest(POST.UPLOAD_VIDEO_REQ, handleUploadVideoReq),
    takeLatest(POST.UPLOAD_VIDEO_FINAL_REQ, handleUploadVideoFinalReq),
    takeLatest(POST.REPORT_POST, postsReport),
    takeLatest(POST.TIP, handleAddTip),
  ]);
}

export default watchPostSagas;
