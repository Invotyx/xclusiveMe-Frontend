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

const searchResultsSelector = createSelector(chatState, state =>
  state.get('searchResults')
);

const hasUnreadMessagesSelector = createSelector(chatState, state =>
  state.get('hasUnreadMessages')
);

export {
  chatDataSelector,
  chatCountSelector,
  singleChatSelector,
  activeConversationIdSelector,
  searchResultsSelector,
  hasUnreadMessagesSelector,
};
