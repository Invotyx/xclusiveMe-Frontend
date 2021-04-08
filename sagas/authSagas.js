import { put, call, takeLatest, all } from 'redux-saga/effects';
import { useRouter } from 'next/router';

import { AUTH } from '../actions/auth/types';

import { auth } from '../actions/auth';
import { snackbar } from '../actions/snackbar';
import {
  login,
  register,
  forgotPassword,
  me,
  logout,
  resetPassword,
  refreshToken,
  verifyForgotPasswordToken,
} from '../services/user';

function* handleLogin(action) {
  try {
    const { email, password } = action.payload;

    const { data } = yield call(login, email, password);
    localStorage.setItem('jwtToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    yield put(
      auth.success({
        accessToken: data.accessToken,
        loggedIn: true,
      })
    );
    const currentUser = yield call(me);
    yield put(
      auth.success({
        currentUser: currentUser.data,
      })
    );
    yield put(
      snackbar.update({
        open: true,
        message: 'Auth Logged In!',
        severity: 'success',
      })
    );
    const { callback } = action.payload;
    callback && callback();
  } catch (e) {
    yield put(auth.failure({ error: { ...e } }));
    yield put(
      snackbar.update({
        open: true,
        message: 'LOGIN FAILED: Invalid Username/Password!',
        severity: 'error',
      })
    );
  }
}

function* handleRefreshToken(action) {
  const { data } = yield call(refreshToken);
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
    const currentAuth = yield call(me);
    yield put(
      auth.success({
        currentAuth: currentAuth.data,
        accessToken: data.accessToken,
        loggedIn: true,
      })
    );
    yield put(
      snackbar.update({
        open: true,
        message: 'Auth Registered Successfully!',
        severity: 'success',
      })
    );
    const { callback } = action.payload;
    callback && callback();
  } catch (e) {
    yield put(auth.failure({ error: { ...e } }));
    yield put(
      snackbar.update({
        open: true,
        message: 'Auth Registered Failed!',
        severity: 'error',
      })
    );
  }
}

function* handleForgotPassword(action) {
  try {
    const { email } = action.payload;
    const { data } = yield call(forgotPassword, email);
    yield put(auth.success({ data }));
    yield put(useRouter().push('/login'));
    yield put(
      snackbar.update({
        open: true,
        message: 'Check Email!',
        severity: 'success',
      })
    );
  } catch (e) {
    yield put(auth.failure({ error: { ...e } }));
    yield put(
      snackbar.update({
        open: true,
        message: 'Auth Registered Failed!',
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
    yield put(auth.success({ currentAuth: data }));
  } catch (e) {
    yield put(auth.failure({ error: { ...e } }));
  }
}

function* handleLogout() {
  yield call(logout);
  yield put(useRouter().push('/login'));
}

function* watchAuthSagas() {
  yield all([
    takeLatest(AUTH.LOGIN, handleLogin),
    takeLatest(AUTH.REFRESH_TOKEN, handleRefreshToken),
    takeLatest(AUTH.REGISTER, handleRegister),
    takeLatest(AUTH.FORGOT_PASSWORD, handleForgotPassword),
    takeLatest(AUTH.RESET_PASSWORD, handleResetPassword),
    takeLatest(
      AUTH.RESET_PASSWORD_TOKEN_VERIFY,
      handleResetPasswordTokenVerify
    ),
    takeLatest(AUTH.ME, handleMe),
    takeLatest(AUTH.LOGOUT, handleLogout),
  ]);
}

export default watchAuthSagas;
