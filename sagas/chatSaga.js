import { all, call, put, takeLatest } from 'redux-saga/effects';
import CHAT from '../actions/chat/types';
import { chat } from '../actions/chat';
import { snackbar } from '../actions/snackbar';
import {
  send,
  getConversations,
  getSingleChat,
  sendSingleMsg,
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
    const { id, saveData } = action.payload;
    console.log(saveData);
    yield call(sendSingleMsg, id, saveData);
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
    console.log(data.results);
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

function* watchChatSagas() {
  yield all([
    takeLatest(CHAT.SEND, handleSendMessage),
    takeLatest(CHAT.GET, handlegetConversations),
    takeLatest(CHAT.GET_ONE, handleGetOneCon),
    takeLatest(CHAT.SEND_ONE, handleSendSingleMessage),
  ]);
}

export default watchChatSagas;
