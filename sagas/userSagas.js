import { List } from 'immutable';
import getConfig from 'next/config';
import apiClient from '../services/axiosInterceptor';
import { put, call, takeLatest, all } from 'redux-saga/effects';

import { USER } from '../actions/user/types';

import { user } from '../actions/user';
import { snackbar } from '../actions/snackbar';

const { publicRuntimeConfig } = getConfig();
const SERVER_ADDRESS = publicRuntimeConfig.backendUrl;

function* handleGet() {
  try {
    const { data } = yield call(apiClient.get, `${SERVER_ADDRESS}/users/all`);
    yield put(user.success({ data: new List(data.results) }));
  } catch (e) {
    yield put(user.failure({ error: { ...e } }));
  }
}

function* handleGetOne(action) {
  try {
    const { id } = action.payload;
    const { data } = yield call(apiClient.get, `${SERVER_ADDRESS}/users/${id}`);
    yield put(user.success({ data }));
  } catch (e) {
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
    yield put(user.success({ data: data.results }));
  } catch (e) {
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
    yield put(user.failure({ error: { ...e } }));
    yield put(
      snackbar.update({
        open: true,
        message: 'Something went wrong!',
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
    yield put(user.failure({ error: { ...e } }));
    yield put(
      snackbar.update({
        open: true,
        message: 'Something went wrong!',
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
    yield put(user.failure({ error: { ...e } }));
    yield put(
      snackbar.update({
        open: true,
        message: 'Something went wrong!',
        severity: 'error',
      })
    );
  }
}

function* watchPresetSagas() {
  yield all([
    takeLatest(USER.GET, handleGet),
    takeLatest(USER.GET_ONE, handleGetOne),
    takeLatest(USER.SEARCH, handleSearch),
    takeLatest(USER.SAVE, handlePost),
    takeLatest(USER.PUT, handlePut),
    takeLatest(USER.PATCH, handlePatch),
    takeLatest(USER.DELETE, handleDelete),
  ]);
}

export default watchPresetSagas;
