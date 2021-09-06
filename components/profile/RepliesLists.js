import React from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import styles from './profile.module.css';
import { repliesDataSelector } from '../../selectors/postSelector';
import { useDispatch, useSelector } from 'react-redux';
import { post as postData } from '../../actions/post/index';

const RepliesLists = ({
  showMyReply,
  commentsData,
  comm,
  ProfileImageAvatar,
  isMobile,
  commentId,
  setCommentId,
  issubReplyField,
  setissubReplyField,
}) => {
  const replyData = useSelector(repliesDataSelector);
  const dispatch = useDispatch();

  const handleSubReplyField = id => {
    setCommentId(id);
    console.log('reply id', id);
    setissubReplyField({ check: true, id });
  };

  const handleReplyLike = repId => {
    replyData?.map(re =>
      re.likes && re.likes.length > 0 && repId === re.id
        ? dispatch(
            postData.delCommentLike({
              id: re.id,
              callback: () => {
                console.log('eee');
                dispatch(postData.requestOne(sPost.id));
              },
            })
          )
        : repId === re.id &&
          dispatch(
            postData.saveCommentLike({
              id: re.id,
              callback: () => {
                console.log('ddd');
                dispatch(postData.requestOne(sPost.id));
              },
            })
          )
    );
  };
  return (
    <div
      style={{
        overflowY: showMyReply === true ? 'scroll' : 'hidden',
        overflowX: 'hidden',
        maxHeight: isMobile ? '30vh' : '200px',
      }}
      className={styles.hScrollBar}
    >
      {showMyReply === true &&
        commentsData?.map(
          reply =>
            reply?.parentCommentId === comm.id && (
              <div
                style={{
                  width: '100%',
                  marginLeft: isMobile ? '-10px' : '20px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                  }}
                >
                  <div style={{ display: 'flex' }}>
                    <img
                      src='/horizentolLine.svg'
                      alt='reply line'
                      style={{
                        height: '14vh',
                        marginBottom: '-1vh',
                        marginLeft: '-4vw',
                      }}
                    />
                    <div
                      style={{
                        display: 'flex',
                        marginLeft: '15px',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          marginBottom: '10px',
                          marginTop: '5px',
                        }}
                      >
                        {<ProfileImageAvatar user={reply?.user} />}
                      </div>
                      <div
                        style={{
                          marginTop: '-9px',
                          marginLeft: '10px',
                        }}
                      >
                        <p
                          style={{
                            fontWeight: 'bold',
                            marginRight: '5px',
                            fontSize: '14px',
                          }}
                        >
                          {reply?.user?.fullName}
                        </p>
                        <p
                          style={{
                            color: '#ACACAC',

                            overflowWrap: 'break-word',
                            // overflow: 'hidden',
                            // textOverflow: 'ellipsis',
                            width: isMobile ? '100px' : '260px',
                            marginTop: '-10px',
                            fontSize: '14px',
                          }}
                        >
                          {reply.comment.slice(0, 511)}
                        </p>
                        <div style={{}}>
                          <p
                            style={{
                              marginBottom: '0px',
                              cursor: 'pointer',
                              fontSize: '13px',
                              display: 'flex',
                            }}
                          >
                            <div
                              style={{
                                marginTop: '-10px',
                              }}
                            >
                              {reply.totalLikes === 0 ? (
                                <div
                                  style={{
                                    display: 'flex',
                                  }}
                                >
                                  <p
                                    style={{
                                      marginTop: '0px',
                                      marginRight: '5px',
                                    }}
                                  >
                                    0
                                  </p>
                                  <FavoriteIcon
                                    style={{
                                      color: 'red',
                                      fontSize: '15px',
                                    }}
                                  />
                                </div>
                              ) : (
                                <div
                                  style={{
                                    display: 'flex',
                                    marginLeft: '-3.3vw',
                                    marginTop: '-5px',
                                  }}
                                >
                                  <p
                                    style={{
                                      marginTop: '0px',
                                      marginRight: '5px',
                                      fontSize: '12px',
                                    }}
                                  >
                                    {reply.totalLikes}{' '}
                                  </p>
                                  <FavoriteIcon
                                    style={{
                                      color: 'red',
                                      fontSize: '15px',
                                    }}
                                  />
                                </div>
                              )}
                            </div>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      marginTop: '10px',
                    }}
                  >
                    <img
                      src='/comment.png'
                      alt='reply button'
                      style={{
                        width: '20px',
                        height: '20px',
                        marginRight: '9px',
                        cursor: 'pointer',
                      }}
                      className={styles.commMobile}
                      id={comm.id}
                      onClick={() => handleSubReplyField(comm.id)}
                    />
                    {/* <ChatBubbleOutlineIcon
                                          style={{ marginRight: '9px' }}
                                          id={comm.id}
                                          fontSize='small'
                                          onClick={() =>
                                            handleSubReplyField(comm.id)
                                          }
                                        /> */}
                    {reply.likes && reply.likes.length === 0 ? (
                      // <FavoriteIcon
                      //   fontSize='small'
                      //   onClick={() =>
                      //     handleReplyLike(reply.id)
                      //   }
                      // />
                      <img
                        src='/emptyHeart.png'
                        alt='unliked'
                        style={{
                          width: '20px',
                          height: '20px',
                          cursor: 'pointer',
                        }}
                        onClick={() => handleReplyLike(reply.id)}
                      />
                    ) : (
                      // <FavoriteIcon
                      //   fontSize='small'
                      //   style={{
                      //     color: 'red',
                      //   }}
                      //   onClick={() =>
                      //     handleReplyLike(reply.id)
                      //   }
                      // />
                      <img
                        src='/filled.png'
                        alt='unliked'
                        style={{
                          width: '20px',
                          height: '20px',
                          cursor: 'pointer',
                        }}
                        onClick={() => handleReplyLike(reply.id)}
                      />
                    )}
                  </div>
                </div>
              </div>
            )
        )}
    </div>
  );
};

export default RepliesLists;
