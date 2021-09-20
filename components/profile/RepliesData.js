import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { post as postData } from '../../actions/post/index';
import { repliesDataSelector } from '../../selectors/postSelector';
import ProfileImageAvatar from './profile-image-avatar';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Box from '@material-ui/core/Box';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { Button } from '@material-ui/core';
import useEmojiPicker from '../useEmojiPicker';
import RepliesLists from './RepliesLists';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { currentUserSelector } from '../../selectors/authSelector';

const RepliesData = ({
  comment,
  postId,
  isReplyField,
  setisReplyField,
  issubReplyField,
  setissubReplyField,
  commentId,
  setCommentId,
  forCommentId,
  openReply,
  replyRef,
  checkRefs,
  closeCheck,
}) => {
  const currUser = useSelector(currentUserSelector);

  const [showMyReply, setShowMyReply] = useState(false);

  const dispatch = useDispatch();
  const replyData = useSelector(repliesDataSelector);
  const isMobile = useMediaQuery('(max-width: 760px)');
  const [replyText, setReplyText] = useState('');
  const { closeEmojiPicker, EmojiPicker, emojiPickerRef } = useEmojiPicker();
  const [pageNumber, setPageNumber] = useState(2);
  const [commLength, setcommLength] = useState(3);
  var [commentsData, setCommentsData] = useState([]);
  var forComments = replyData;
  const inputField = useRef(null);
  const [checkId, setChekId] = useState(null);

  const addEmoji = e => {
    let sym = e.unified.split('-');
    let codesArray = [];
    sym.forEach(el => codesArray.push('0x' + el));
    let emoji = String.fromCodePoint(...codesArray);
    setReplyText(replyText + emoji);
  };

  useEffect(() => {
    setCommentsData(commentsData => commentsData?.concat(forComments));
    // return () => {
    //   setCommentsData([]);
    // };
  }, [forComments]);

  useEffect(() => {
    closeCheck &&
      (setShowMyReply(false),
      setisReplyField(false),
      setissubReplyField(false),
      setCommentsData([]),
      setcommLength(0));
  }, [closeCheck]);

  const handleReplyList = commId => {
    setShowMyReply(true);
    setChekId(commId);
    dispatch(
      postData.requestReplies({
        postId,
        parentCommentId: commId,
        page: 1,
        limit: 3,
      })
    );
  };

  useEffect(() => {
    checkRefs === true && inputField.current?.focus();
  }, [checkRefs, inputField, isReplyField, issubReplyField]);

  useEffect(() => {
    openReply === true &&
      forCommentId &&
      (setShowMyReply(true),
      setChekId(forCommentId),
      dispatch(
        postData.requestReplies({
          postId,
          parentCommentId: forCommentId,
          page: 1,
          limit: 3,
        })
      ));
  }, [forCommentId]);

  const getPaginatedReplies = commId => {
    setPageNumber(pageNumber + 1);

    setcommLength(commLength + 3);
    dispatch(
      postData.requestReplies({
        postId,
        parentCommentId: commId,
        page: pageNumber,
        limit: 3,
      })
    );
  };

  const hideReply = commId => {
    setShowMyReply(false);
    setisReplyField(false);
    setissubReplyField(false);
    setCommentsData([]);
    setcommLength(0);
  };

  // const handleClose = () => {
  //   setShowMyReply(false);
  //   setisReplyField(false);
  //   setissubReplyField(false);
  //   setCommentsData([]);
  //   setcommLength(0);
  // };

  const handleAddReply = event => {
    event.preventDefault();
    closeEmojiPicker();

    if (!replyText || replyText.trim() === '') {
      return;
    }
    dispatch(
      postData.saveComment({
        id: postId,
        commentText: {
          comment: replyText,
          isReply: true,
          parentCommentId: commentId,
        },

        callback: () => {
          setReplyText('');
          setisReplyField(false);
          setissubReplyField(false);
          dispatch(postData.requestOne(postId));

          // postData.getComment({
          //   id: postId,
          // })
        },
      })
    );
  };

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div style={{ marginRight: '10px' }}>
          {comment.totalLikes === 0 ? (
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
                {comment.totalLikes}{' '}
              </p>
              <FavoriteIcon style={{ color: 'red', fontSize: '15px' }} />
            </div>
          )}
        </div>
        {comment.totalReplies > 3 && showMyReply === true && (
          <span onClick={() => getPaginatedReplies(comment.id)}>
            {commLength >= comment.totalReplies ? '' : 'View Previous Replies'}
          </span>
        )}
        {comment.totalReplies > 0 && (
          <div onClick={() => handleReplyList(comment.id)}>
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
                  {comment.totalReplies > 0 ? ' VIEW REPLIES' : ' '}
                </span>
              </div>
            ) : (
              ''
            )}
          </div>
        )}

        {comment.totalReplies > 0 && (
          <div onClick={() => handleReplyList(comment.id)}>
            {checkId !== comment.id && openReply === true ? (
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
                  {comment.totalReplies > 0 ? ' VIEW REPLIES' : ' '}
                </span>
              </div>
            ) : (
              ''
            )}
          </div>
        )}
      </div>

      {comment.totalReplies > 0 && showMyReply === true && (
        <RepliesLists
          showMyReply={showMyReply}
          commentsData={commentsData}
          comment={comment}
          ProfileImageAvatar={ProfileImageAvatar}
          isMobile={isMobile}
          commentId={commentId}
          setCommentId={setCommentId}
          issubReplyField={issubReplyField}
          setissubReplyField={setissubReplyField}
        />
      )}

      {showMyReply === true && comment.totalReplies > 0 && checkId === comment.id && (
        <div
          onClick={() => hideReply(comment.id)}
          style={{ marginLeft: isMobile ? '5px' : '5px' }}
        >
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
      )}

      {(isReplyField.check === true && isReplyField.id === comment.id) ||
      (issubReplyField.check === true && issubReplyField.id === comment.id) ? (
        <form onSubmit={handleAddReply}>
          {/* <img src='/border.png' alt='border' /> */}
          <Box mb={2} ml={5}>
            <OutlinedInput
              style={{
                width: isMobile ? '80vw' : '29vw',
                marginLeft: isMobile ? '-10vw' : '-4vw',
              }}
              value={replyText}
              onChange={e => setReplyText(e.target.value)}
              name='replyText'
              multiline
              inputRef={inputField}
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
                  user={currUser}
                  style={{ marginRight: '10px' }}
                />
              }
              endAdornment={
                <>
                  <span ref={emojiPickerRef}>
                    <EmojiPicker
                      onSelect={addEmoji}
                      popperProps={{ style: { zIndex: 1111111 } }}
                    />
                  </span>

                  <Button
                    type='submit'
                    style={{
                      backgroundColor: '#111111',
                      border: 'none',
                    }}
                  >
                    <img src='/send.png' alt='send button' />
                  </Button>
                </>
              }
            />
          </Box>
        </form>
      ) : (
        ''
      )}
    </div>
  );
};

export default RepliesData;
