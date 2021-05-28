import apiClient from './axiosInterceptor';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const SERVER_ADDRESS = publicRuntimeConfig.backendUrl;

export async function getUserPaymentMethods() {
  return apiClient.get(`${SERVER_ADDRESS}/users/payment-methods`);
}

export async function addPayment(name, token) {
  const data = JSON.stringify({
    name: name,
    token: token,
  });
  return apiClient.post(`${SERVER_ADDRESS}/users/payment-methods`, data);
}

export async function deletePaymentMethod(id) {
  return apiClient.delete(`${SERVER_ADDRESS}/users/payment-methods/${id}`);
}

export async function setPaymentMethod(id) {
  return apiClient.post(
    `${SERVER_ADDRESS}/users/payment-methods/set-default/${id}`
  );
}
