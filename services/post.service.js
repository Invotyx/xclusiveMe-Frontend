import apiClient from './axiosInterceptor';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const SERVER_ADDRESS = publicRuntimeConfig.backendUrl;

export async function getAll() {
  return apiClient.get(`${SERVER_ADDRESS}/posts/`);
}

export async function getOnePost(id) {
  return apiClient.get(`${SERVER_ADDRESS}/posts/${id}`);
}

export async function getReplies(postId, commentId) {
  return apiClient.get(
    `${SERVER_ADDRESS}/posts/${postId}/comments/${commentId}/replies`
  );
}

export async function getAllSubscribed() {
  return apiClient.get(`${SERVER_ADDRESS}/posts/subscribed`);
}

export async function getX(username) {
  return apiClient.get(`${SERVER_ADDRESS}/users/posts/${username}`);
}

export async function add(saveData) {
  const data = JSON.stringify(saveData);
  return apiClient.post(`${SERVER_ADDRESS}/posts`, data);
}

export async function addComment(id, commentData) {
  const data = JSON.stringify(commentData);
  return apiClient.post(`${SERVER_ADDRESS}/posts/${id}/comments`, data);
}

export async function getComment(id, pageNum, limit) {
  return apiClient.get(
    `${SERVER_ADDRESS}/posts/${id}/comments?page=${pageNum}&limit=${limit}`,
    data
  );
}

export async function addCommentLike(id) {
  return apiClient.patch(`${SERVER_ADDRESS}/posts/comments/${id}/like`);
}

export async function delCommentLike(id) {
  return apiClient.delete(`${SERVER_ADDRESS}/posts/comments/${id}/like`);
}

export async function addLike(id) {
  return apiClient.patch(`${SERVER_ADDRESS}/posts/${id}/like`);
}

export async function deleteLikes(id) {
  return apiClient.delete(`${SERVER_ADDRESS}/posts/${id}/like`);
}

export async function update(id, data) {
  return apiClient.put(`${SERVER_ADDRESS}/posts/${id}`, data);
}

export async function destory(id) {
  return apiClient.delete(`${SERVER_ADDRESS}/posts/${id}/remove`);
}

export async function uploadImage(fileObject) {
  const data = new FormData();
  data.append('images', fileObject);
  return apiClient.post(`${SERVER_ADDRESS}/posts/images`, data);
}

export async function uploadVideoReq1(fileObject) {
  const data = { totalVideos: fileObject };
  return apiClient.post(`${SERVER_ADDRESS}/posts/videos`, data);
}

export async function uploadVideoFinalReq(fileObject, url) {
  const data = new FormData();
  data.append('video', fileObject);
  return apiClient.post(`${url}`, data);
}

export async function getNotifications() {
  return apiClient.get(`${SERVER_ADDRESS}/notifications`);
}

export async function viewNotification(id, notify) {
  const data = JSON.stringify(notify);
  return apiClient.patch(`${SERVER_ADDRESS}/notifications/${id}/read`, data);
}

export async function getSettingNotifications() {
  return apiClient.get(`${SERVER_ADDRESS}/notifications/settings`);
}

export async function addSettingNotification(notiData) {
  const data = JSON.stringify(notiData);
  return apiClient.post(`${SERVER_ADDRESS}/notifications/settings`, data);
}

export async function postPurchase(id) {
  return apiClient.post(`${SERVER_ADDRESS}/posts/purchase/${id}`);
}
