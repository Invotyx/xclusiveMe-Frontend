import { createSelector } from 'reselect';

const chatState = state => state.get('chatData');

const chatDataSelector = createSelector(chatState, state => {
  const data = state.get('chats');
  return data;
});

const chatCountSelector = createSelector(chatState, state => {
  const data = state.get('chatCount');
  return data;
});

const singleChatSelector = createSelector(chatState, state => {
  const data = state.get('singleChat');
  return data;
});

const activeConversationIdSelector = createSelector(chatState, state =>
  state.get('activeConversationId')
);

export {
  chatDataSelector,
  chatCountSelector,
  singleChatSelector,
  activeConversationIdSelector,
};
