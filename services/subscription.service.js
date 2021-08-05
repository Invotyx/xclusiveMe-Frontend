import apiClient from './axiosInterceptor';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const SERVER_ADDRESS = publicRuntimeConfig.backendUrl;

// export async function getUserSubscriptions() {
//   return apiClient.get(`${SERVER_ADDRESS}/subscriptions`);
// }

export async function addSubscription(id) {
  return apiClient.post(`${SERVER_ADDRESS}/users/subscriptions/purchase/${id}`);
}

export async function unSubscribed(id) {
  return apiClient.patch(`${SERVER_ADDRESS}/users/${id}/unsubscribe`);
}

// export async function updateSubscription(id) {
//   return apiClient.delete(`${SERVER_ADDRESS}/subscriptions/${id}`);
// }
