import { put, call, takeLatest, all } from 'redux-saga/effects';
import { useRouter } from 'next/router';

import { AUTH } from '../actions/auth/types';

import { auth } from '../actions/auth';
import { snackbar } from '../actions/snackbar';
import {
  login,
  register,
  verifyOtp,
  updateProfile,
  forgotPassword,
  me,
  logout,
  resetPassword,
  refreshToken,
  verifyForgotPasswordToken,
  twoFactorAuthentication,
} from '../services/user';

function* handleLogin(action) {
  try {
    const { email, password } = action.payload;

    const response = yield call(login, email, password);
    if (response.status !== 202) {
      localStorage.setItem('jwtToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      yield put(
        auth.success({
          accessToken: response.data.accessToken,
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
          message: 'User Logged In!',
          severity: 'success',
        })
      );
    } else {
      yield put(
        snackbar.update({
          open: true,
          message: response.data.message,
          severity: 'success',
        })
      );
    }
    const { callback } = action.payload;
    if (callback) {
      yield call(callback, response.data.sessionId);
    }
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
  try {
    if (localStorage.getItem('refreshToken')) {
      const { data } = yield call(refreshToken);
      localStorage.setItem('jwtToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      const { callback } = action.payload;
      if (callback) {
        yield call(callback);
      }
    } else {
      yield call(logout);
      yield put(useRouter().push('/login')); // TODO: needs to be updated
    }
  } catch (e) {
    yield call(logout);
    yield put(auth.failure({ error: { ...e } }));
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
    yield put(
      snackbar.update({
        open: true,
        message: 'Check your phone!',
        severity: 'success',
      })
    );
    const { callback } = action.payload;
    if (callback) {
      yield call(callback);
    }
  } catch (e) {
    yield put(auth.failure({ error: { ...e } }));
    yield put(
      snackbar.update({
        open: true,
        message: 'Something went wrong!',
        severity: 'error',
      })
    );
  }
}

function* handleVerifyOtp(action) {
  try {
    const { code, sessionId } = action.payload;

    const { data } = yield call(verifyOtp, code, sessionId);
    localStorage.setItem('jwtToken', data.accessToken);
    const currentUser = yield call(me);
    yield put(
      auth.success({
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
    if (callback) {
      yield call(callback);
    }
  } catch (e) {
    yield put(auth.failure({ error: { ...e } }));
    yield put(
      snackbar.update({
        open: true,
        message: 'Invalid code!',
        severity: 'error',
      })
    );
  }
}

function* handleUpdateProfile(action) {
  try {
    const { fullName, username, email, password, phoneNumber } = action.payload;

    const { data } = yield call(updateProfile, {
      fullName,
      username,
      email,
      password,
      phoneNumber,
    });
    yield put(
      snackbar.update({
        open: true,
        message: 'Profile Update Successfully!',
        severity: 'success',
      })
    );
    const { callback } = action.payload;
    if (callback) {
      yield call(callback);
    }
  } catch (e) {
    yield put(auth.failure({ error: { ...e } }));
    yield put(
      snackbar.update({
        open: true,
        message: 'User Registration Failed!',
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
    yield put(useRouter().push('/login')); // TODO: needs to be updated
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
        message: 'User Registration Failed!',
        severity: 'error',
      })
    );
  }
}

function* handleResetPassword(action) {
  try {
    const { token, email, password } = action.payload;
    const { data } = yield call(resetPassword, email, password, token);
    yield put(useRouter().push(`/login`)); // TODO: needs to be updated
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
    yield put(useRouter().push(`/reset-password/${token}/${email}/proceed`)); // TODO: needs to be updated
  } catch (e) {
    yield put(useRouter().push('/login')); // TODO: needs to be updated
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
    yield put(auth.success({ currentUser: data }));
  } catch (e) {
    yield put(auth.failure({ error: { ...e } }));
  }
}

function* handleLogout(action) {
  try {
    yield call(logout);
    const { callback } = action.payload;
    if (callback) {
      yield call(callback);
    }
  } catch (e) {
    yield put(auth.failure({ error: { ...e } }));
  }
}

function* handleUpdateTwoFactorAuthentication(action) {
  try {
    const { fa2 } = action.payload;
    yield call(twoFactorAuthentication, fa2);
    yield put(auth.success({}));
    const { callback } = action.payload;
    if (callback) {
      yield call(callback);
    }
  } catch (e) {
    yield put(auth.failure({ error: { ...e } }));
  }
}

function* watchAuthSagas() {
  yield all([
    takeLatest(AUTH.LOGIN, handleLogin),
    takeLatest(AUTH.REFRESH_TOKEN, handleRefreshToken),
    takeLatest(AUTH.REGISTER, handleRegister),
    takeLatest(AUTH.VERIFY_OTP, handleVerifyOtp),
    takeLatest(AUTH.UPDATE_PROFILE, handleUpdateProfile),
    takeLatest(AUTH.FORGOT_PASSWORD, handleForgotPassword),
    takeLatest(AUTH.RESET_PASSWORD, handleResetPassword),
    takeLatest(
      AUTH.RESET_PASSWORD_TOKEN_VERIFY,
      handleResetPasswordTokenVerify
    ),
    takeLatest(AUTH.ME, handleMe),
    takeLatest(AUTH.LOGOUT, handleLogout),
    takeLatest(
      AUTH.UPDATE_TWO_FACTOR_AUTHENTICATION,
      handleUpdateTwoFactorAuthentication
    ),
  ]);
}

export default watchAuthSagas;
