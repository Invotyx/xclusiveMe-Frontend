import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { currentUserSelector } from '../../selectors/authSelector';
import styles from './message.module.css';
import { chat } from '../../actions/chat';
import { useInView } from 'react-intersection-observer';
import ImageListItem from './ImageListItem';
import Box from '@material-ui/core/Box';

const MessagesListItem = ({ activeConversationId, i, ...props }) => {
  const { ref, inView } = useInView({
    threshold: 0,
  });
  const current = useSelector(currentUserSelector);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!i.isSeen && inView) {
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
    <div
      ref={ref}
      className={styles.container}
      {...props}
    >
      <div className={styles.chatMessages}>
        <div
          className={
            i.sender.id !== current?.id ? styles.leftSide : styles.rightSide
          }
        >
          <span
            className={
              i.sender.id !== current?.id
                ? styles.leftMessage
                : styles.rightMessage
            }
          >
            {i.content}
          </span>
          <Box
            display='flex'
            width='100%'
            justifyContent={
              i.sender.id !== current?.id ? 'flex-start' : 'flex-end'
            }
          >
            {i.media.map((messageMedia, i) => (
              <ImageListItem key={`messageMedia${i}`} src={messageMedia.url} />
            ))}
          </Box>
        </div>
        {i.sender.id !== current?.id ? (
          <div className={styles.leftSide}>
            <div>{i.mediaLink && i.mediaLink}</div>
          </div>
        ) : (
          <div className={styles.rightSide}>
            {i.mediaLink && (
              <div
                style={{
                  marginTop: '10px',
                  border: '1px solid #222222',
                  borderRadius: '8px',
                }}
              >
                <img
                  src={i.mediaLink}
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
