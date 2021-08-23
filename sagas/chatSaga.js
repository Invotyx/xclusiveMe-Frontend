import { all, call, put, takeLatest } from 'redux-saga/effects';
import CHAT from '../actions/chat/types';
import { chat } from '../actions/chat';
import { snackbar } from '../actions/snackbar';
import {
  send,
  getConversations,
  getSingleChat,
  sendSingleMsg,
  addVoicemail,
} from '../services/chat.service';

function* handleSendMessage(action) {
  try {
    const { saveData } = action.payload;
    yield call(send, saveData);
    yield put(chat.success({}));

    const { callback } = action.payload;
    if (callback) {
      yield call(callback);
    }
  } catch (e) {
    console.log(e);
    yield put(chat.failure({ error: { ...e } }));
    yield put(
      snackbar.update({
        open: true,
        message: e.response.data.message,
        severity: 'error',
      })
    );
  }
}
function* handleSendSingleMessage(action) {
  try {
    const { conversationId, saveData } = action.payload;
    yield call(sendSingleMsg, conversationId, saveData);
    yield put(chat.success({}));

    const { callback } = action.payload;
    if (callback) {
      yield call(callback);
    }
  } catch (e) {
    console.log(e);
    yield put(chat.failure({ error: { ...e } }));
    yield put(
      snackbar.update({
        open: true,
        message: e.response.data.message,
        severity: 'error',
      })
    );
  }
}

function* handlegetConversations(action) {
  try {
    const { pageNum, limit } = action.payload;
    const { data } = yield call(getConversations, pageNum, limit);
    yield put(
      chat.success({ chats: data.results, chatCount: data.totalCount })
    );
  } catch (e) {
    console.log(e);
    yield put(chat.success({ error: true }));
  }
}

function* handleGetOneCon(action) {
  try {
    const { id, pageNum, limit } = action.payload;
    const { data } = yield call(getSingleChat, id, pageNum, limit);
    yield put(chat.success({ singleChat: data.results }));
    const { callback } = action.payload;
    if (callback) {
      yield call(callback);
    }
  } catch (e) {
    console.log(e);
    yield put(chat.success({ error: true }));
  }
}

function* handleAddVoicemail(action) {
  try {
    const { audioFile, callback } = action.payload;
    yield call(addVoicemail, audioFile);
    yield put(chat.success({}));
    yield put(
      snackbar.update({
        open: true,
        message: 'Audio send successfully',
        severity: 'success',
      })
    );
    if (callback) {
      yield call(callback);
    }
    // yield put(chat.success({}));
  } catch (e) {
    console.log(e);
    yield put(chat.failure({ error: { ...e } }));
  }
}

function* watchChatSagas() {
  yield all([
    takeLatest(CHAT.SEND, handleSendMessage),
    takeLatest(CHAT.GET, handlegetConversations),
    takeLatest(CHAT.GET_ONE, handleGetOneCon),
    takeLatest(CHAT.SEND_ONE, handleSendSingleMessage),
    takeLatest(CHAT.SEND_VOICEMAIL, handleAddVoicemail),
  ]);
}

export default watchChatSagas;
