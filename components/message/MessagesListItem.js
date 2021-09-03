import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { currentUserSelector } from '../../selectors/authSelector';
import styles from './message.module.css';
import { chat } from '../../actions/chat';
import { useInView } from 'react-intersection-observer';
import ImageListItem from './ImageListItem';
import Box from '@material-ui/core/Box';
import PostMediaVideo from '../profile/post-media-video';
import { Media, Player, controls } from 'react-media-player';
const { PlayPause, SeekBar } = controls;

const PPlayer = ({ src }) => (
  <Media>
    <div>
      <div>
        <PlayPause
          style={{
            color: '#fff',
            backgroundColor: 'transparent',
            border: 0,
            position: 'relative',
          }}
        />
        <SeekBar />
      </div>
      <Player vendor='audio' src={src} />
    </div>
  </Media>
);

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
              <span
                key={`messageMedia${i}`}
              >
                {message.messageMediaType === 'photo' ? (
                  <a href={messageMedia.url} target='_blank'>
                    <ImageListItem src={messageMedia.url} />
                  </a>
                ) : message.messageMediaType === 'audio' ? (
                  <PPlayer src={messageMedia.url} />
                ) : message.messageMediaType === 'video' ? (
                  <Box maxWidth='200px'>
                    <PostMediaVideo src={messageMedia.url} />
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
