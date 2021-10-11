import React from 'react';
import NextLink from 'next/link';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import SmsIcon from '@material-ui/icons/SmsOutlined';
import { useDispatch, useSelector } from 'react-redux';
import ConversationsList from '../message/ConversationsList';
import MessageMenu from '../message/MessageMenu';
import { chat } from '../../actions/chat';
import { hasUnreadMessagesSelector } from '../../selectors/chatSelector';

const chatMenu = 'link';

export default function ChatNavItem() {
  const dispatch = useDispatch();
  const [messageEl, setMessageEl] = React.useState(null);
  const hasUnreadMessages = useSelector(hasUnreadMessagesSelector);

  React.useEffect(() => {
    dispatch(chat.getOneUnreadMessagesCount());
  }, [dispatch]);

  return (
    <>
      {chatMenu === 'link' ? (
        <NextLink href='/chat' passHref>
          <IconButton color='inherit' className='step-6'>
            <Badge color='secondary' variant={hasUnreadMessages ? 'dot' : ''}>
              <SmsIcon style={{ width: '30px', height: '30px' }} />
            </Badge>
          </IconButton>
        </NextLink>
      ) : (
        <>
          <IconButton
            color='inherit'
            className='step-6'
            onClick={e => setMessageEl(e.currentTarget)}
          >
            <Badge color='secondary' variant={'dot'}>
              <SmsIcon style={{ width: '30px', height: '30px' }} />
            </Badge>
          </IconButton>
          <div>
            <MessageMenu anchorEl={messageEl} onClose={messagesClose}>
              <ConversationsList />
            </MessageMenu>
          </div>
        </>
      )}
    </>
  );
}
