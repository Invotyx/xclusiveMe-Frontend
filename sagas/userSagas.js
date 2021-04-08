import { put, call, takeLatest, all } from 'redux-saga/effects';
import { useRouter } from 'next/router';

import { USER } from '../actions/user/types';

import { user } from '../actions/user';
import { snackbar } from '../actions/snackbar';
import {
  login,
  register,
  forgotPassword,
  me,
  logout,
  resetPassword,
  verifyForgotPasswordToken,
} from '../services/user';

function* handleLogin(action) {
  try {
    const { email, password } = action.payload;

    const { data } = yield call(login, email, password);
    localStorage.setItem('jwtToken', data.accessToken);
    const currentUser = yield call(me);
    yield put(
      user.success({
        currentUser: currentUser.data,
        accessToken: data.accessToken,
        loggedIn: true,
      })
    );
    yield put(
      snackbar.update({
        open: true,
        message: 'User Logged In!',
        severity: 'success',
      })
    );
    const { callback } = action.payload;
    callback && callback();
  } catch (e) {
    yield put(user.failure({ error: { ...e } }));
    yield put(
      snackbar.update({
        open: true,
        message: 'LOGIN FAILED: Invalid Username/Password!',
        severity: 'error',
      })
    );
  }
}

function* handleRegister(action) {
  try {
    const { fullName, username, email, password, phoneNumber } = action.payload;

    const { data } = yield call(
      register,
      fullName,
      username,
      email,
      password,
      phoneNumber
    );
    localStorage.setItem('jwtToken', data.accessToken);
    const currentUser = yield call(me);
    yield put(
      user.success({
        currentUser: currentUser.data,
        accessToken: data.accessToken,
        loggedIn: true,
      })
    );
    yield put(
      snackbar.update({
        open: true,
        message: 'User Registered Successfully!',
        severity: 'success',
      })
    );
    const { callback } = action.payload;
    callback && callback();
  } catch (e) {
    yield put(user.failure({ error: { ...e } }));
    yield put(
      snackbar.update({
        open: true,
        message: 'User Registered Failed!',
        severity: 'error',
      })
    );
  }
}

function* handleForgotPassword(action) {
  try {
    const { email } = action.payload;
    const { data } = yield call(forgotPassword, email);
    yield put(user.success({ data }));
    yield put(useRouter().push('/login'));
    yield put(
      snackbar.update({
        open: true,
        message: 'Check Email!',
        severity: 'success',
      })
    );
  } catch (e) {
    yield put(user.failure({ error: { ...e } }));
    yield put(
      snackbar.update({
        open: true,
        message: 'User Registered Failed!',
        severity: 'error',
      })
    );
  }
}

function* handleResetPassword(action) {
  try {
    const { token, email, password } = action.payload;
    const { data } = yield call(resetPassword, email, password, token);
    yield put(useRouter().push(`/login`));
    yield put(
      snackbar.update({
        open: true,
        message: 'Password Resetted Successfully',
        severity: 'success',
      })
    );
  } catch (e) {
    yield put(
      snackbar.update({
        open: true,
        message: 'Something went wrong!',
        severity: 'error',
      })
    );
  }
}

function* handleResetPasswordTokenVerify(action) {
  try {
    const { token, email } = action.payload;
    const { data } = yield call(verifyForgotPasswordToken, token, email);
    yield put(useRouter().push(`/reset-password/${token}/${email}/proceed`));
  } catch (e) {
    yield put(useRouter().push('/login'));
    yield put(
      snackbar.update({
        open: true,
        message: 'Invalid Token',
        severity: 'error',
      })
    );
  }
}

function* handleMe() {
  try {
    const { data } = yield call(me);
    yield put(user.success({ currentUser: data }));
  } catch (e) {
    yield put(user.failure({ error: { ...e } }));
  }
}

function* handleLogout() {
  yield call(logout);
  yield put(useRouter().push('/login'));
}

function* watchUserSagas() {
  yield all([
    takeLatest(USER.LOGIN, handleLogin),
    takeLatest(USER.REGISTER, handleRegister),
    takeLatest(USER.FORGOT_PASSWORD, handleForgotPassword),
    takeLatest(USER.RESET_PASSWORD, handleResetPassword),
    takeLatest(
      USER.RESET_PASSWORD_TOKEN_VERIFY,
      handleResetPasswordTokenVerify
    ),
    takeLatest(USER.ME, handleMe),
    takeLatest(USER.LOGOUT, handleLogout),
  ]);
}

export default watchUserSagas;
