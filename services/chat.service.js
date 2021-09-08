import apiClient from './axiosInterceptor';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const SERVER_ADDRESS = publicRuntimeConfig.backendUrl;

export async function send(saveData) {
  const data = JSON.stringify(saveData);
  return apiClient.post(`${SERVER_ADDRESS}/conversations`, data);
}

export async function search(q) {
  return apiClient.get(`${SERVER_ADDRESS}/conversations/search`, {
    params: { search: q },
  });
}

export async function sendSingleMsg(id, saveData) {
  const data = JSON.stringify(saveData);
  return apiClient.post(`${SERVER_ADDRESS}/conversations/${id}/messages`, data);
}

export async function purchaseMessage(id, conversationId) {
  return apiClient.post(
    `${SERVER_ADDRESS}/conversations/${conversationId}/messages/${id}/purchase`
  );
}

export async function getConversations(pageNum, limit) {
  return apiClient.get(
    `${SERVER_ADDRESS}/conversations?page=${pageNum}&limit=${limit}`
  );
}

export async function getSingleChat(id, pageNum, limit) {
  return apiClient.get(
    `${SERVER_ADDRESS}/conversations/${id}/messages?page=${pageNum}&limit=${limit}`
  );
}

export async function isSeen(id) {
  return apiClient.patch(
    `${SERVER_ADDRESS}/conversations/${id}/messages/seen`,
    {
      isSeen: true,
    }
  );
}

export async function uploadAudio(files) {
  const data = new FormData();
  if (files.length) {
    for (let i = 0; i < files.length; i++) {
      data.append('audio', files[i]);
    }
  } else {
    data.append('audio', files);
  }
  return apiClient.post(`${SERVER_ADDRESS}/uploads/audio`, data);
}
