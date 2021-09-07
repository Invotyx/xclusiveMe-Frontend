import { makeStyles } from '@material-ui/core';
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
  const activeConversationId = useSelector(activeConversationIdSelector);
  const singlechat = useSelector(singleChatSelector);
  const dispatch = useDispatch();
  const pageNum = 1;
  const limit = 50;

  const scrollIntoView = () => {
    myRef.current.scrollIntoView();
  };
  const getOneConversation = clear => {
    clear && dispatch(chat.success({ singleChat: [] }));
    activeConversationId &&
      dispatch(
        chat.getOneConversation({
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
    getOneConversation(true);
  }, [activeConversationId]);

  React.useEffect(() => {
    getOneConversation();
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
            getOneConversation={getOneConversation}
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
