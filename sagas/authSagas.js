import { put, call, takeLatest, all } from 'redux-saga/effects';
import { useRouter } from 'next/router';

import { AUTH } from '../actions/auth/types';

import { auth } from '../actions/auth';
import { snackbar } from '../actions/snackbar';
import {
  login,
  register,
  verifyOtp,
  resendOtp,
  updateProfile,
  updateSubscriptionFee,
  uploadImage,
  uploadCover,
  forgotPassword,
  me,
  logout,
  resetPassword,
  getSessions,
  expireAllSessions,
  refreshToken,
  verifyForgotPasswordToken,
  twoFactorAuthentication,
} from '../services/user.service';
import { bottomalert } from '../actions/bottom-alert';

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
      yield call(auth.me);
      const { callback } = action.payload;
      if (callback) {
        yield call(callback);
      }
    } else {
      yield put(
        snackbar.update({
          open: true,
          message: response.data.message,
          severity: 'success',
        })
      );
      const { callback202 } = action.payload;
      if (callback202) {
        yield call(callback202, response.data.sessionId);
      }
    }
  } catch (e) {
    console.log(e);
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
    console.log(e);
    yield call(logout);
    yield put(auth.failure({ error: { ...e } }));
  }
}

function* handleRegister(action) {
  try {
    const { saveData } = action.payload;

    const { data } = yield call(register, saveData);
    yield put(
      snackbar.update({
        open: true,
        message: 'Check your phone!',
        severity: 'success',
      })
    );
    const { callback } = action.payload;
    if (callback) {
      yield call(callback, data.sessionId);
    }
  } catch (e) {
    console.log(e);
    yield put(auth.failure({ error: { ...e } }));
    yield put(
      snackbar.update({
        open: true,
        message: e.response.data.message,
        severity: 'error',
      })
    );
  }
}

function* handleResendOtp(action) {
  try {
    const { sessionId } = action.payload;
    const { data } = yield call(resendOtp, sessionId);
    yield put(auth.success({ data }));
    const { callback } = action.payload;
    if (callback) {
      yield call(callback, data.sessionId);
    }
  } catch (e) {
    console.log(e);
    yield put(auth.failure({ error: { ...e } }));
    yield put(
      snackbar.update({
        open: true,
        message: e.response.data.message,
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
    localStorage.setItem('refreshToken', data.refreshToken);
    yield put(
      auth.success({
        accessToken: data.accessToken,
        loggedIn: true,
      })
    );
    yield call(auth.me);
    const { callback } = action.payload;
    if (callback) {
      yield call(callback);
    }
  } catch (e) {
    console.log(e);
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
    const {
      fullName,
      username,
      email,
      password,
      oldPassword,
      phoneNumber,
      gender,
      dob,
      description,
      headline,
    } = action.payload;

    const { data } = yield call(updateProfile, {
      fullName,
      username,
      email,
      password,
      oldPassword,
      phoneNumber,
      gender,
      dob,
      description,
      headline,
    });
    yield put(auth.success({}));
    if ((password || oldPassword) === undefined) {
      yield put(
        bottomalert.update({
          open: true,
          message: 'Profile Updated Successfully!',
          severity: 'success',
        })
      );
    } else {
      yield put(
        bottomalert.update({
          open: true,
          message: 'Password Changed Successfully!',
          severity: 'success',
        })
      );
    }
    const { callback } = action.payload;
    if (callback) {
      yield call(callback);
    }
  } catch (e) {
    console.log(e);
    yield put(auth.failure({ error: { ...e } }));
    yield put(
      bottomalert.update({
        open: true,
        message: e.response.data.message,
        severity: 'error',
      })
    );
    const errorCaught = true;
    const { callback } = action.payload;
    if (callback) {
      yield call(callback, errorCaught);
    }
  }
}

function* handleUpdateSubscriptionFee(action) {
  try {
    const { price } = action.payload;

    yield call(updateSubscriptionFee, {
      isActive: true,
      price: parseInt(price),
    });
    yield put(auth.success({}));
    const { callback } = action.payload;
    if (callback) {
      yield call(callback);
    }
  } catch (e) {
    console.log(e);
    yield put(auth.failure({ error: { ...e } }));
    yield put(
      bottomalert.update({
        open: true,
        message: e.response.data.message,
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
    const { callback } = action.payload;
    if (callback) {
      yield call(callback);
    }
    yield put(
      snackbar.update({
        open: true,
        message: 'Check Email!',
        severity: 'success',
      })
    );
  } catch (e) {
    console.log(e);
    yield put(auth.failure({ error: { ...e } }));
    yield put(
      snackbar.update({
        open: true,
        message: e.response.data.message,
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
    console.log(e);
    yield put(
      snackbar.update({
        open: true,
        message: e.response.data.message,
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
    console.log(e);
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
    console.log(e);
    yield put(auth.failure({ error: { ...e } }));
  }
}

function* handleGetSessions() {
  try {
    const { data } = yield call(getSessions);
    yield put(auth.success({ userSessions: data }));
  } catch (e) {
    console.log(e);
    yield put(auth.failure({ error: { ...e } }));
  }
}

function* handleExpireAllSessions() {
  try {
    yield call(expireAllSessions);
    yield put(auth.success());
  } catch (e) {
    console.log(e);
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
    console.log(e);
    yield put(auth.failure({ error: { ...e } }));
  }
}

function* handleUpdateTwoFactorAuthentication(action) {
  try {
    const { fa2 } = action.payload;
    yield call(twoFactorAuthentication, fa2);
    yield put(auth.success({}));
    yield put(
      snackbar.update({
        open: true,
        message: 'Success!',
        severity: 'success',
      })
    );
    const { callback } = action.payload;
    if (callback) {
      yield call(callback);
    }
  } catch (e) {
    console.log(e);
    yield put(auth.failure({ error: { ...e } }));
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
    const { data } = yield call(uploadImage, fileObject);
    yield put(auth.success({ currentUser: data }));
    yield put(
      bottomalert.update({
        open: true,
        message: 'Image Updated Successfully!',
        severity: 'success',
      })
    );
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

function* handleUploadCover({ payload }) {
  try {
    const { fileObject } = payload;
    yield call(uploadCover, fileObject);
    yield put(
      auth.success({
        uploadingCover: false,
      })
    );
    yield call(auth.me);
    yield put(
      bottomalert.update({
        open: true,
        message: 'Image Updated Successfully!',
        severity: 'success',
      })
    );
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

function* watchAuthSagas() {
  yield all([
    takeLatest(AUTH.LOGIN, handleLogin),
    takeLatest(AUTH.REFRESH_TOKEN, handleRefreshToken),
    takeLatest(AUTH.REGISTER, handleRegister),
    takeLatest(AUTH.VERIFY_OTP, handleVerifyOtp),
    takeLatest(AUTH.RESEND_OTP, handleResendOtp),
    takeLatest(AUTH.UPDATE_PROFILE, handleUpdateProfile),
    takeLatest(AUTH.UPDATE_SUBSCRIPTION_FEE, handleUpdateSubscriptionFee),
    takeLatest(AUTH.UPLOAD_IMAGE, handleUploadImage),
    takeLatest(AUTH.UPLOAD_COVER, handleUploadCover),
    takeLatest(AUTH.FORGOT_PASSWORD, handleForgotPassword),
    takeLatest(AUTH.RESET_PASSWORD, handleResetPassword),
    takeLatest(AUTH.GET_SESSIONS, handleGetSessions),
    takeLatest(AUTH.EXPIRE_ALL_SESSIONS, handleExpireAllSessions),
    takeLatest(AUTH.ME, handleMe),
    takeLatest(AUTH.LOGOUT, handleLogout),
    takeLatest(
      AUTH.UPDATE_TWO_FACTOR_AUTHENTICATION,
      handleUpdateTwoFactorAuthentication
    ),
  ]);
}

export default watchAuthSagas;
