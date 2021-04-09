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

export async function register(
  fullName,
  username,
  email,
  password,
  phoneNumber
) {
  const data = JSON.stringify({
    fullName,
    username,
    email,
    password,
    phoneNumber,
  });

  return apiClient.post(`${SERVER_ADDRESS}/auth/register`, data);
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
  return true;
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
