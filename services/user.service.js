import apiClient from './axiosInterceptor';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const SERVER_ADDRESS = publicRuntimeConfig.backendUrl;

export async function login(email, password) {
  const username = email;
  const data = JSON.stringify({
    username,
    password,
  });
  return apiClient.post(`${SERVER_ADDRESS}/auth/login`, data);
}

export async function register(saveData) {
  const data = JSON.stringify(saveData);

  return apiClient.post(`${SERVER_ADDRESS}/auth/register`, data);
}

export async function verifyOtp(code, sessionId) {
  const data = JSON.stringify({
    code,
    sessionId,
  });

  return apiClient.post(`${SERVER_ADDRESS}/auth/verify`, data);
}

export async function resendOtp(sessionId) {
  const data = JSON.stringify({
    sessionId,
  });

  return apiClient.post(`${SERVER_ADDRESS}/auth/resend`, data);
}

export async function forgotPassword(email) {
  return apiClient.get(`${SERVER_ADDRESS}/users/forgot-password/${email}`);
}

export async function me() {
  const authorizationToken = localStorage.getItem('jwtToken');
  if (!authorizationToken) {
    return null;
  }
  return apiClient.get(`${SERVER_ADDRESS}/users/me`);
}

export async function getSessions() {
  return apiClient.get(`${SERVER_ADDRESS}/auth/get-sessions`);
}

export async function expireAllSessions() {
  return apiClient.post(`${SERVER_ADDRESS}/auth/expire-sessions`);
}

export async function refreshToken() {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) {
    return null;
  }
  return apiClient.get(`${SERVER_ADDRESS}/auth/refresh`);
}

export async function updateProfile(request) {
  const data = JSON.stringify(request);
  return apiClient.put(`${SERVER_ADDRESS}/auth/updateProfile`, data);
}

export async function updateSubscriptionFee(request) {
  const data = JSON.stringify(request);
  return apiClient.post(`${SERVER_ADDRESS}/subscriptions/plans`, data);
}

export async function resetPassword(email, password, token) {
  const data = JSON.stringify({ email, password, token });
  return apiClient.post(`${SERVER_ADDRESS}/users/update-password`, data);
}

export async function verifyForgotPasswordToken(token, email) {
  return apiClient.get(
    `${SERVER_ADDRESS}/users/verify-forgot-password?token=${token}&email=${email}`
  );
}

export async function logout() {
  localStorage.removeItem('jwtToken');
  localStorage.removeItem('refreshToken');
  return apiClient.post(`${SERVER_ADDRESS}/auth/logout`);
}

export async function changePassword(currentPassword, newPassword) {
  const email = localStorage.getItem('userEmail');
  const data = JSON.stringify({ email, currentPassword, newPassword });
  return apiClient.post(`${SERVER_ADDRESS}/auth/reset-password`, data);
}

export async function updateUser(fullName, email, phoneNumber) {
  const data = JSON.stringify({ fullName, email, phoneNumber });
  return apiClient.post(`${SERVER_ADDRESS}/users/update-user`, data);
}

export async function twoFactorAuthentication(fa2) {
  const data = JSON.stringify({ fa2 });
  return apiClient.patch(`${SERVER_ADDRESS}/users/`, data);
}

export async function uploadImage(fileObject) {
  const data = new FormData();
  data.append('image', fileObject);
  return apiClient.post(`${SERVER_ADDRESS}/users/upProfileImage`, data);
}

export async function uploadCover(fileObject) {
  const data = new FormData();
  data.append('image', fileObject);
  return apiClient.post(`${SERVER_ADDRESS}/users/upload-cover`, data);
}
