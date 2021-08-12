import React from 'react';
import styles from './message.module.css';

const ConvoList = ({ singlechat, current }) => {
  console.log('single', singlechat, 'current', current);
  return (
    <div
      style={{ overflowY: 'scroll', overflowX: 'hidden', maxHeight: '480px' }}
      className={styles.mainBox}
    >
      {singlechat?.map((i, x) => (
        <div className={styles.container}>
          <div className={styles.chatMessages}>
            {i.sender.id !== current.id ? (
              <div className={styles.leftSide}>
                <span className={styles.leftMessage}>{i.content}</span>
              </div>
            ) : (
              <div className={styles.rightSide}>
                <span className={styles.rightMessage}>{i.content}</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ConvoList;
