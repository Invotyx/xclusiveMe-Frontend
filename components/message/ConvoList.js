import React from 'react';
import styles from './message.module.css';
import { css } from 'emotion';

const ConvoList = ({ singlechat, current, refProp }) => {
  return (
    <>
      <div
        style={{ overflowY: 'scroll', overflowX: 'hidden', maxHeight: '28vh' }}
        className={styles.mainBox}
        ref={refProp}
      >
        {singlechat?.map((i, x) => (
          <div className={styles.container}>
            <div className={styles.chatMessages}>
              {i.sender.id !== current.id ? (
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
        ))}
      </div>
    </>
  );
};

export default ConvoList;
