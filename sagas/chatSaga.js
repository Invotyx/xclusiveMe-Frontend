import { all, call, put, takeLatest } from 'redux-saga/effects';
import CHAT from '../actions/chat/types';
import { chat } from '../actions/chat';
import { snackbar } from '../actions/snackbar';
import {
  send,
  search,
  getConversations,
  getSingleChat,
  sendSingleMsg,
  purchaseMessage,
  uploadAudio,
  isSeen,
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

function* handleSearch(action) {
  try {
    const { query } = action.payload;
    const { data } = yield call(search, query);
    yield put(chat.success({ searchResults: data.result }));

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

function* handlePurchaseMessage(action) {
  try {
    const { id, conversationId } = action.payload;
    yield call(purchaseMessage, id, conversationId);
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

function* handleUploadAudio(action) {
  try {
    const { audioFile, callback } = action.payload;
    const { data } = yield call(uploadAudio, audioFile);
    yield put(chat.success({}));
    if (callback) {
      yield call(callback, data);
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

function* handleUpdateIsSeen(action) {
  try {
    const { id } = action.payload;
    const { data } = yield call(isSeen, id);
    yield put(chat.success({}));
    const { callback } = action.payload;
    if (callback) {
      yield call(callback, data);
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

function* watchChatSagas() {
  yield all([
    takeLatest(CHAT.SEND, handleSendMessage),
    takeLatest(CHAT.SEARCH_MESSAGES, handleSearch),
    takeLatest(CHAT.GET, handlegetConversations),
    takeLatest(CHAT.GET_ONE, handleGetOneCon),
    takeLatest(CHAT.SEND_ONE, handleSendSingleMessage),
    takeLatest(CHAT.PURCHASE_MESSAGE, handlePurchaseMessage),
    takeLatest(CHAT.SEND_VOICEMAIL, handleUploadAudio),
    takeLatest(CHAT.IS_SEEN, handleUpdateIsSeen),
  ]);
}

export default watchChatSagas;
