import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { currentUserSelector } from '../../selectors/authSelector';
import styles from './message.module.css';
import { chat } from '../../actions/chat';
import { useInView } from 'react-intersection-observer';
import ImageListItem from './ImageListItem';
import Box from '@material-ui/core/Box';
import PostMediaVideo from '../profile/post-media-video';

const MessagesListItem = ({ activeConversationId, message, ...props }) => {
  const { ref, inView } = useInView({
    threshold: 0,
  });
  const current = useSelector(currentUserSelector);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!message.isSeen && inView) {
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
          },
        })
      );
    }
  }, [inView]);

  return (
    <div ref={ref} className={styles.container} {...props}>
      <div className={styles.chatMessages}>
        <div
          className={
            message.sender.id !== current?.id
              ? styles.leftSide
              : styles.rightSide
          }
        >
          {message.content && (
            <span
              className={
                message.sender.id !== current?.id
                  ? styles.leftMessage
                  : styles.rightMessage
              }
            >
              {message.content}
            </span>
          )}
          <Box
            display='flex'
            width='100%'
            justifyContent={
              message.sender.id !== current?.id ? 'flex-start' : 'flex-end'
            }
          >
            {message.media?.map((messageMedia, i) => (
              <a
                key={`messageMedia${i}`}
                href={messageMedia.url}
                target='_blank'
              >
                {message.messageMediaType === 'photo' ? (
                  <ImageListItem src={messageMedia.url} />
                ) : message.messageMediaType === 'audio' ? (
                  <audio controls>
                    <source src={messageMedia.url} />
                  </audio>
                ) : message.messageMediaType === 'video' ? (
                  <Box maxWidth='200px'>
                    <PostMediaVideo src={messageMedia.url} />
                  </Box>
                ) : (
                  <p>{message.messageMediaType || 'unknown type'}</p>
                )}
              </a>
            ))}
          </Box>
        </div>
        {message.sender.id !== current?.id ? (
          <div className={styles.leftSide}>
            <div>{message.mediaLink && message.mediaLink}</div>
          </div>
        ) : (
          <div className={styles.rightSide}>
            {message.mediaLink && (
              <div
                style={{
                  marginTop: '10px',
                  border: '1px solid #222222',
                  borderRadius: '8px',
                }}
              >
                <img
                  src={message.mediaLink}
                  alt=''
                  style={{
                    width: '200px',
                    height: '200px',
                    padding: '20px',
                    borderRadius: '8px',
                  }}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesListItem;
