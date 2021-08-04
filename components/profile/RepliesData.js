import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { post as postData } from '../../actions/post/index';
import { repliesDataSelector } from '../../selectors/postSelector';
import ProfileImageAvatar from './profile-image-avatar';
import styles from './profile.module.css';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Box from '@material-ui/core/Box';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { Button } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

const RepliesData = ({
  post,
  comm,
  currentUser,
  isReplyField,
  setisReplyField,
  issubReplyField,
  setissubReplyField,
  commentId,
  setCommentId,
}) => {
  const [showMyReply, setShowMyReply] = useState(false);
  const dispatch = useDispatch();
  const replyData = useSelector(repliesDataSelector);

  const [replyText, setReplyText] = useState('');

  const handleReplyList = commId => {
    setShowMyReply(!showMyReply);
    dispatch(
      postData.requestReplies({
        postId: post.id,
        parentCommentId: commId,
      })
    );
  };

  const hideReply = commId => {
    setShowMyReply(!showMyReply);
    setisReplyField(false);
    setissubReplyField(false);
    dispatch(
      postData.requestReplies({
        postId: post.id,
        parentCommentId: commId,
      })
    );
  };

  const handleReplyLike = repId => {
    replyData?.map(re =>
      re.likes && re.likes.length > 0 && repId === re.id
        ? dispatch(
            postData.delCommentLike({
              id: re.id,
              callback: () => {
                // dispatch(postData.request());
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
                console.log(dispatch(postData.requestOne(sPost.id)));
                // dispatch(postData.request());
              },
            })
          )
    );
  };

  const handleSubReplyField = id => {
    setCommentId(id);
    console.log('reply id', id);
    setissubReplyField({ check: true, id });
  };

  const handleAddReply = event => {
    event.preventDefault();
    console.log(commentId);

    if (!replyText || replyText.trim() === '') {
      console.log('commentId');
      console.log(replyText);
      return;
    }
    dispatch(
      postData.saveComment({
        id: post.id,
        commentText: {
          comment: replyText,
          isReply: true,
          parentCommentId: commentId,
        },

        callback: () => {
          setReplyText('');
          setisReplyField(false);
          setissubReplyField(false);
          dispatch(postData.requestOne(singlePost.id));
          // postData.getComment({
          //   id: post.id,
          // })
        },
      })
    );
  };
  return (
    <>
      <div style={{ display: 'flex' }}>
        <div style={{ marginRight: '10px' }}>
          {comm.totalLikes === 0 ? (
            <div style={{ display: 'flex' }}>
              <p
                style={{
                  marginTop: '0px',
                  marginRight: '5px',
                }}
              >
                0
              </p>
              <FavoriteIcon style={{ color: 'red', fontSize: '15px' }} />
            </div>
          ) : (
            <div style={{ display: 'flex' }}>
              <p
                style={{
                  marginTop: '0px',
                  marginRight: '5px',
                }}
              >
                {comm.totalLikes}{' '}
              </p>
              <FavoriteIcon style={{ color: 'red', fontSize: '15px' }} />
            </div>
          )}
        </div>
        {comm.totalReplies > 0 && (
          <div onClick={() => handleReplyList(comm.id)}>
            {showMyReply === false ? (
              <div>
                <img
                  src='/lineReply.svg'
                  alt='view reply line'
                  style={{
                    marginBottom: '4px',
                    marginRight: '5px',

                    backgroundColor: '#101010',
                    color: 'white',
                  }}
                />
                <span
                  style={{
                    fontSize: '12px',
                    fontFamily: 'Poppins',
                    marginLeft: '7px',
                    fontWeight: '500',
                  }}
                >
                  VIEW REPLIES
                </span>
              </div>
            ) : (
              ''
            )}
          </div>
        )}
      </div>

      {showMyReply === true &&
        replyData?.map(
          reply =>
            reply.parentCommentId === comm.id && (
              <div style={{ width: '90%' }}>
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
                        height: '13vh',
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
                            width: '180px',
                            marginTop: '-10px',
                            fontSize: '14px',
                          }}
                        >
                          {reply.comment}
                        </p>
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
                <div
                  style={{
                    marginLeft: '40px',
                    marginTop: '-10px',
                  }}
                >
                  <p
                    style={{
                      marginLeft: '50px',
                      marginTop: '-10px',
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
                            marginTop: '-5px',
                            marginLeft: '-2.5vw',
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
                            marginLeft: '-2.5vw',
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
            )
        )}

      {(isReplyField.check === true && isReplyField.id === comm.id) ||
      (issubReplyField.check === true && issubReplyField.id === comm.id) ? (
        <form onSubmit={handleAddReply}>
          {/* <img src='/border.png' alt='border' /> */}
          <Box mb={2} ml={5}>
            <OutlinedInput
              style={{ width: '29vw', marginLeft: '-4vw' }}
              value={replyText}
              onChange={e => setReplyText(e.target.value)}
              name='replyText'
              multiline
              // inputRef={replyInput.current[index]}
              onKeyDown={e => {
                if (e.keyCode === 13) {
                  if (!event.shiftKey) {
                    handleAddReply(e);
                  }
                }
              }}
              placeholder={
                issubReplyField.check === true ? 'Tagged user' : 'Add Reply'
              }
              startAdornment={
                <ProfileImageAvatar
                  user={currentUser}
                  style={{ marginRight: '10px' }}
                />
              }
              endAdornment={
                <Button
                  type='submit'
                  style={{
                    backgroundColor: '#111111',
                    border: 'none',
                  }}
                >
                  <img src='/send.png' alt='send button' />
                </Button>
              }
            />
          </Box>
        </form>
      ) : (
        ''
      )}
      {showMyReply === true ? (
        <div onClick={() => hideReply(comm.id)}>
          <img
            src='/lineReply.svg'
            alt='view reply line'
            style={{
              marginBottom: '4px',
            }}
          />
          <span
            style={{
              fontSize: '12px',
              fontFamily: 'Poppins',
              marginLeft: '10px',
            }}
          >
            HIDE REPLIES
          </span>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default RepliesData;
