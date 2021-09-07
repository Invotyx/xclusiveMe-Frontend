import { List } from 'immutable';
import getConfig from 'next/config';
import apiClient from '../services/axiosInterceptor';
import { put, call, takeLatest, all } from 'redux-saga/effects';

import { USER } from '../actions/user/types';

import { user } from '../actions/user';
import { snackbar } from '../actions/snackbar';
import { post } from '../actions/post';
import { getFollowers, reportUser } from '../services/user.service';

const { publicRuntimeConfig } = getConfig();
const SERVER_ADDRESS = publicRuntimeConfig.backendUrl;

function* handleGet() {
  try {
    const { data } = yield call(apiClient.get, `${SERVER_ADDRESS}/users/all`);
    yield put(user.success({ data: new List(data.results) }));
  } catch (e) {
    console.log(e);
    yield put(user.failure({ error: { ...e } }));
  }
}

function* handleGetAll(action) {
  try {
    const { limit, pageNumber } = action.payload;
    const { data } = yield call(
      apiClient.get,
      `${SERVER_ADDRESS}/users?limit=${limit}&page=${pageNumber}`
    );
    yield put(user.success({ allData: new List(data.users) }));
  } catch (e) {
    console.log(e);
    yield put(user.failure({ error: { ...e } }));
  }
}

function* handleGetSuggestions(action) {
  try {
    const { limit, pageNumber } = action.payload;
    const { data } = yield call(
      apiClient.get,
      `${SERVER_ADDRESS}/users/suggestions?limit=${limit}&page=${pageNumber}`
    );
    yield put(user.success({ suggestions: data.results }));
  } catch (e) {
    console.log(e);
    yield put(user.failure({ error: { ...e } }));
  }
}

function* handleGetOne(action) {
  try {
    const { id } = action.payload;
    const { data } = yield call(
      apiClient.get,
      `${SERVER_ADDRESS}/users/get/${id}`
    );
    yield put(user.success({ single: data }));
    yield put(post.success({ xfeed_numberOfPosts: data.totalCount }));
  } catch (e) {
    console.log(e);
    yield put(user.failure({ error: { ...e } }));
  }
}

function* handleGetFollowers(action) {
  try {
    const { userId, limit, page, append } = action.payload;
    const { data } = yield call(
      apiClient.get,
      `${SERVER_ADDRESS}/users/${userId}/followers?limit=${limit}&page=${page}`
    );
    yield put(
      user.success({
        followersData: append ? [...data.results] : data.results,
        followersCount: data.totalCount,
      })
    );
  } catch (e) {
    console.log(e);
    yield put(user.failure({ error: { ...e } }));
  }
}

function* handleGetFollowings(action) {
  try {
    const { userId, limit, page, append, prevfollowingData } = action.payload;
    const { data } = yield call(
      apiClient.get,
      `${SERVER_ADDRESS}/users/${userId}/followings?limit=${limit}&page=${page}`
    );
    yield put(
      user.success({
        followingData:
          append && prevfollowingData
            ? [...prevfollowingData, ...data.results]
            : data.results,
        followingCount: data.totalCount,
      })
    );
  } catch (e) {
    console.log(e);
    yield put(user.failure({ error: { ...e } }));
  }
}

function* handleSearch(action) {
  try {
    const { q } = action.payload;
    const { data } = yield call(
      apiClient.get,
      `${SERVER_ADDRESS}/users/look/${q}`
    );
    yield put(user.success({ data: data.results, searched: true }));
  } catch (e) {
    console.log(e);
    yield put(user.failure({ error: { ...e } }));
  }
}

function* handlePost(action) {
  try {
    const { saveData } = action.payload;
    const { data } = yield call(
      apiClient.post,
      `${SERVER_ADDRESS}/users/`,
      saveData
    );
    // yield put(user.success({ data }))
    yield put(
      snackbar.update({
        open: true,
        message: 'USER added successfully!',
        severity: 'success',
      })
    );
  } catch (e) {
    console.log(e);
    yield put(user.failure({ error: { ...e } }));
    yield put(
      snackbar.update({
        open: true,
        message: e.response.data.message,
        severity: 'error',
      })
    );
  }
}

function* handlePut(action) {
  try {
    const { id, body } = action.payload;
    yield call(apiClient.put, `${SERVER_ADDRESS}/users/${id}`, { body });
    const { data } = yield call(apiClient.get, `${SERVER_ADDRESS}/users/`);
    yield put(user.success({ data: data.user }));
    yield put(
      snackbar.update({
        open: true,
        message: 'USER updated successfully!',
        severity: 'success',
      })
    );
    // yield put(user.success({ data }))
  } catch (e) {
    console.log(e);
    yield put(user.failure({ error: { ...e } }));
    yield put(
      snackbar.update({
        open: true,
        message: e.response.data.message,
        severity: 'error',
      })
    );
  }
}

function* handlePatch(action) {
  try {
    const { id, updateData } = action.payload;
    const { data } = yield call(
      apiClient.patch,
      `${SERVER_ADDRESS}/users/${id}`,
      { updateData }
    );
    yield put(user.success({ data }));
  } catch (e) {
    console.log(e);
    yield put(user.failure({ error: { ...e } }));
  }
}

function* handleDelete(action) {
  try {
    const { id } = action.payload;
    const { data } = yield call(
      apiClient.delete,
      `${SERVER_ADDRESS}/users/${id}`
    );
    yield put(user.success({ data }));
    yield put(
      snackbar.update({
        open: true,
        message: 'USER deleted successfully!',
        severity: 'success',
      })
    );
  } catch (e) {
    console.log(e);
    yield put(user.failure({ error: { ...e } }));
    yield put(
      snackbar.update({
        open: true,
        message: e.response.data.message,
        severity: 'error',
      })
    );
  }
}

function* usersReport(action) {
  try {
    const { reportData } = action.payload;
    yield call(reportUser, reportData);
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

function* watchPresetSagas() {
  yield all([
    takeLatest(USER.GET, handleGet),
    takeLatest(USER.GET_ALL, handleGetAll),
    takeLatest(USER.GET_SUGGESTIONS, handleGetSuggestions),
    takeLatest(USER.GET_ONE, handleGetOne),
    takeLatest(USER.GET_FOLLOWERS, handleGetFollowers),
    takeLatest(USER.GET_FOLLOWINGS, handleGetFollowings),
    takeLatest(USER.SEARCH, handleSearch),
    takeLatest(USER.SAVE, handlePost),
    takeLatest(USER.PUT, handlePut),
    takeLatest(USER.PATCH, handlePatch),
    takeLatest(USER.DELETE, handleDelete),
    takeLatest(USER.REPORT_USER, usersReport),
  ]);
}

export default watchPresetSagas;
