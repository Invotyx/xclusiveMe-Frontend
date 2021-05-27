import getConfig from 'next/config';
import apiClient from '../services/axiosInterceptor';
import { put, call, takeLatest, all } from 'redux-saga/effects';

import { EMPLOYEE } from '../actions/employee/types';

import { employee } from '../actions/employee';
import { snackbar } from '../actions/snackbar';

const { publicRuntimeConfig } = getConfig();
const SERVER_ADDRESS = publicRuntimeConfig.backendUrl;

function* handleGet() {
  try {
    const { data } = yield call(apiClient.get, `${SERVER_ADDRESS}/employees/`);
    yield put(employee.success({ data: data.employee }));
  } catch (e) {
    console.log(e);
    yield put(employee.failure({ error: { ...e } }));
  }
}

function* handleGetOne(action) {
  try {
    const { id } = action.payload;
    const { data } = yield call(
      apiClient.get,
      `${SERVER_ADDRESS}/employees/${id}`
    );
    yield put(employee.success({ data }));
  } catch (e) {
    console.log(e);
    yield put(employee.failure({ error: { ...e } }));
  }
}

function* handlePost(action) {
  try {
    const { saveData } = action.payload;
    const { data } = yield call(
      apiClient.post,
      `${SERVER_ADDRESS}/employees/`,
      saveData
    );
    // yield put(employee.success({ data }))
    yield put(
      snackbar.update({
        open: true,
        message: 'EMPLOYEE added successfully!',
        severity: 'success',
      })
    );
  } catch (e) {
    console.log(e);
    yield put(employee.failure({ error: { ...e } }));
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
    yield call(apiClient.put, `${SERVER_ADDRESS}/employees/${id}`, { body });
    const { data } = yield call(apiClient.get, `${SERVER_ADDRESS}/employees/`);
    yield put(employee.success({ data: data.employee }));
    yield put(
      snackbar.update({
        open: true,
        message: 'EMPLOYEE updated successfully!',
        severity: 'success',
      })
    );
    // yield put(employee.success({ data }))
  } catch (e) {
    console.log(e);
    yield put(employee.failure({ error: { ...e } }));
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
      `${SERVER_ADDRESS}/employees/${id}`,
      { updateData }
    );
    yield put(employee.success({ data }));
  } catch (e) {
    console.log(e);
    yield put(employee.failure({ error: { ...e } }));
  }
}

function* handleDelete(action) {
  try {
    const { id } = action.payload;
    const { data } = yield call(
      apiClient.delete,
      `${SERVER_ADDRESS}/employees/${id}`
    );
    yield put(employee.success({ data }));
    yield put(
      snackbar.update({
        open: true,
        message: 'EMPLOYEE deleted successfully!',
        severity: 'success',
      })
    );
  } catch (e) {
    console.log(e);
    yield put(employee.failure({ error: { ...e } }));
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
    takeLatest(EMPLOYEE.GET, handleGet),
    takeLatest(EMPLOYEE.GET_ONE, handleGetOne),
    takeLatest(EMPLOYEE.SAVE, handlePost),
    takeLatest(EMPLOYEE.PUT, handlePut),
    takeLatest(EMPLOYEE.PATCH, handlePatch),
    takeLatest(EMPLOYEE.DELETE, handleDelete),
  ]);
}

export default watchPresetSagas;
