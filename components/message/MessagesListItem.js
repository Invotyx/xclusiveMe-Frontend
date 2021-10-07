import clsx from 'clsx';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { currentUserSelector } from '../../selectors/authSelector';
import styles from './message.module.css';
import { chat } from '../../actions/chat';
import { useInView } from 'react-intersection-observer';
import ImageListItem from './ImageListItem';
import Box from '@material-ui/core/Box';
import PostMediaVideo from '../profile/post-media-video';
import AudioPlayer from './AudioPlayer';
import LockedPost from '../profile/LockedPost';
import usePostPurchaseModal from '../profile/PostPurchaseModel';

const MessagesListItem = ({
  activeConversationId,
  message,
  activeParticipant,
  getConversationMessages,
  messageIdRef,
  ...props
}) => {
  const { PostPurchaseModal, closePurchaseModal, openPurchaseModal } =
    usePostPurchaseModal();
  const { ref, inView } = useInView({ threshold: 0 });
  const current = useSelector(currentUserSelector);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!message.isSeen && inView && message.sender?.id !== current?.id) {
      dispatch(
        chat.isSeenMessage({
          id: activeConversationId,
          callback: () => {
            dispatch(
              chat.getConversations({
                pageNum: 1,
                limit: 50,
              })
            );
            dispatch(chat.getOneUnreadMessagesCount());
          },
        })
      );
    }
  }, [inView]);

  return (
    <div
      ref={ref}
      className={clsx(styles.container, messageIdRef && styles.highlight)}
      {...props}
    >
      <div className={styles.chatMessages} ref={messageIdRef}>
        <div
          className={
            message.sender?.id !== current?.id
              ? styles.leftSide
              : styles.rightSide
          }
        >
          {message.content && (
            <span
              className={clsx(
                styles.message,
                message.sender?.id !== current?.id
                  ? styles.leftMessage
                  : styles.rightMessage
              )}
            >
              {message.content}
            </span>
          )}
          <Box
            display='flex'
            width='100%'
            justifyContent={
              message.sender?.id !== current?.id ? 'flex-start' : 'flex-end'
            }
          >
            {message.isLocked && message.sender?.id !== current?.id && (
              <>
                <LockedPost
                  style={{
                    width: '100px',
                    height: '100px',
                    padding: '0',
                    display: 'flex',
                    alignContent: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                  onClick={openPurchaseModal}
                />
                <PostPurchaseModal
                  handlePurchase={() => {
                    dispatch(
                      chat.purchaseMessage({
                        id: message.id,
                        conversationId: activeConversationId,
                        callback: () => {
                          getConversationMessages();
                          closePurchaseModal();
                        },
                      })
                    );
                  }}
                  modalTitle='Unlock message?'
                  price={message.price}
                  user={activeParticipant}
                />
              </>
            )}
            {(!message.isLocked || message.sender?.id === current?.id) &&
              message.media?.map((messageMedia, i) => (
                <span key={`messageMedia${i}`}>
                  {message.messageMediaType === 'photo' ? (
                    <a href={messageMedia.url} target='_blank'>
                      <ImageListItem src={messageMedia.url} />
                    </a>
                  ) : message.messageMediaType === 'audio' ? (
                    <AudioPlayer src={messageMedia.url} />
                  ) : message.messageMediaType === 'video' ? (
                    <Box maxWidth='200px'>
                      <PostMediaVideo
                        thumbnail={messageMedia.thumbnail}
                        src={messageMedia.url}
                        thumbnailProps={{
                          style: {
                            width: '96px',
                            height: '96px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          },
                        }}
                      />
                    </Box>
                  ) : (
                    <a href={messageMedia.url} target='_blank'>
                      <p>{message.messageMediaType || 'unknown type'}</p>
                    </a>
                  )}
                </span>
              ))}
          </Box>
        </div>
      </div>
    </div>
  );
};

export default MessagesListItem;
