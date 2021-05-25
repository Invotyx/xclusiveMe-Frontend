import apiClient from './axiosInterceptor';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const SERVER_ADDRESS = publicRuntimeConfig.backendUrl;

export async function getAll() {
  return apiClient.get(`${SERVER_ADDRESS}/post`);
}

export async function getAllSubscribed() {
  return apiClient.get(`${SERVER_ADDRESS}/post/subscribed`);
}

export async function getX(username) {
  return apiClient.get(`${SERVER_ADDRESS}/users/posts/${username}`);
}

export async function add(saveData) {
  const data = JSON.stringify(saveData);
  return apiClient.post(`${SERVER_ADDRESS}/post`, data);
}

export async function update(id, data) {
  return apiClient.put(`${SERVER_ADDRESS}/post/${id}`, data);
}

export async function destory(id) {
  return apiClient.delete(`${SERVER_ADDRESS}/post/${id}/remove`);
}
