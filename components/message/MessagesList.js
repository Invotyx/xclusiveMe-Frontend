import { makeStyles } from '@material-ui/core';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { chat } from '../../actions/chat';
import {
  activeConversationIdSelector,
  singleChatSelector,
} from '../../selectors/chatSelector';
import MessagesListItem from './MessagesListItem';

const useStyles = makeStyles(theme => ({
  mainBox: {
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    overflowY: 'scroll',
    overflowX: 'hidden',
    height: `calc(100vh - 435px)`,
    [theme.breakpoints.down('300')]: {
      height: `calc(100vh - 500px)`,
    },
    [theme.breakpoints.up('md')]: {
      height: `calc(100vh - 420px)`,
      minHeight: `130px`,
    },
  },
}));

const MessagesList = ({
  lastMessageReceived,
  scrollIntoViewPointer,
  activeParticipant,
}) => {
  const myRef = React.useRef(null);
  const messageIdRef = React.useRef(null);
  const activeConversationId = useSelector(activeConversationIdSelector);
  const singlechat = useSelector(singleChatSelector);
  const dispatch = useDispatch();
  const pageNum = 1;
  const limit = 50;

  const router = useRouter();
  const { messageId } = router.query;

  const scrollIntoView = () => {
    if (Boolean(messageId)) {
      messageIdRef.current?.scrollIntoView();
      return;
    }
    myRef.current.scrollIntoView();
  };
  const getConversationMessages = clear => {
    clear && dispatch(chat.success({ singleChat: [] }));
    activeConversationId && Boolean(messageId)
      ? dispatch(
          chat.getConversationMessagesHistory({
            id: activeConversationId,
            messageId,
            callback: () => {
              scrollIntoView();
            },
          })
        )
      : dispatch(
          chat.getConversationMessages({
            id: activeConversationId,
            pageNum: pageNum,
            limit: limit,
            callback: () => {
              scrollIntoView();
            },
          })
        );
  };

  React.useEffect(() => {
    getConversationMessages(true);
  }, [activeConversationId]);

  React.useEffect(() => {
    getConversationMessages();
  }, [lastMessageReceived]);

  React.useEffect(() => {
    scrollIntoView();
  }, [scrollIntoViewPointer]);

  const classes = useStyles();

  return (
    <>
      <div className={classes.mainBox}>
        {singlechat?.map((message, x) => (
          <MessagesListItem
            key={`message${x}`}
            message={message}
            activeConversationId={activeConversationId}
            activeParticipant={activeParticipant}
            getConversationMessages={getConversationMessages}
            messageIdRef={+messageId === message.id ? messageIdRef : null}
          />
        ))}
        <div ref={myRef} style={{ textIndent: '-9999px' }}>
          ..
        </div>
      </div>
    </>
  );
};

export default MessagesList;
