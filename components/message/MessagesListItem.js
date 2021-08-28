import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { currentUserSelector } from '../../selectors/authSelector';
import styles from './message.module.css';
import { chat } from '../../actions/chat';
import { useInView } from 'react-intersection-observer';

const MessagesListItem = ({ i, ...props }) => {
  const { ref, inView } = useInView({
    threshold: 0,
  });
  const current = useSelector(currentUserSelector);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!i.isSeen && inView) {
      dispatch(chat.isSeenMessage({ id: i.id }));
    }
  }, [inView]);

  return (
    <div
      ref={ref}
      className={styles.container}
      {...props}
    >
      <div className={styles.chatMessages}>
        {i.sender.id !== current?.id ? (
          <div className={styles.leftSide}>
            <span className={styles.leftMessage}>{i.content}</span>
            <div>{i.mediaLink && i.mediaLink}</div>
          </div>
        ) : (
          <div className={styles.rightSide}>
            <span className={styles.rightMessage}>{i.content}</span>
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
