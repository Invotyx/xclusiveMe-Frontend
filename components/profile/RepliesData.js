import React, { useEffect, useState } from 'react';
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
import { useMediaQuery } from 'react-responsive';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import { totalrepliesSelector } from '../../selectors/postSelector';
import RepliesLists from './RepliesLists';

const RepliesData = ({
  post,
  comm,
  currentUser,
  singlePost,
  isReplyField,
  setisReplyField,
  issubReplyField,
  setissubReplyField,
  commentId,
  setCommentId,
  forCommentId,
  openReply,
  currUser,
}) => {
  const [showMyReply, setShowMyReply] = useState(false);
  const dispatch = useDispatch();
  const replyData = useSelector(repliesDataSelector);
  const isMobile = useMediaQuery({ query: '(max-width: 760px)' });
  const [replyText, setReplyText] = useState('');
  const [show, setShow] = useState(false);
  const totalRepliesCount = useSelector(totalrepliesSelector);
  const [pageNumber, setPageNumber] = useState(1);
  const [commLength, setcommLength] = useState(3);
  var [commentsData, setCommentsData] = useState([]);
  var forComments = replyData;

  const addEmoji = e => {
    let sym = e.unified.split('-');
    let codesArray = [];
    sym.forEach(el => codesArray.push('0x' + el));
    let emoji = String.fromCodePoint(...codesArray);
    setReplyText(replyText + emoji);
  };

  const showEmoji = () => {
    setShow(!show);
  };

  useEffect(() => {
    setCommentsData(commentsData => commentsData?.concat(forComments));
    // return () => {
    //   setCommentsData([]);
    // };
  }, [forComments]);

  const handleReplyList = commId => {
    setShowMyReply(!showMyReply);

    dispatch(
      postData.requestReplies({
        postId: singlePost.id,
        parentCommentId: commId,
        page: 1,
        limit: 3,
      })
    );
  };

  const getPaginatedReplies = commId => {
    setPageNumber(pageNumber + 1);
    setcommLength(commLength + 3);
    dispatch(
      postData.requestReplies({
        postId: singlePost.id,
        parentCommentId: commId,
        page: pageNumber,
        limit: 3,
      })
    );
  };

  useEffect(() => {
    forCommentId && handleReplyList(forCommentId);
  }, [forCommentId]);

  const hideReply = commId => {
    setShowMyReply(!showMyReply);
    setisReplyField(false);
    setissubReplyField(false);
    setCommentsData([]);
    setcommLength(0);
  };

  const handleAddReply = event => {
    event.preventDefault();
    setShow(false);
    console.log(commentId);

    if (!replyText || replyText.trim() === '') {
      console.log('commentId');
      console.log(replyText);
      return;
    }
    dispatch(
      postData.saveComment({
        id: singlePost?.id,
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
    <div>
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
        {comm.totalReplies > 10 && showMyReply === true && (
          <span onClick={() => getPaginatedReplies(comm.id)}>
            {commLength >= comm.totalReplies ? '' : 'View Previous Replies'}
          </span>
        )}
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
                  {comm.totalReplies > 0 ? ' VIEW REPLIES' : ' '}
                </span>
              </div>
            ) : (
              ''
            )}
          </div>
        )}
      </div>

      {comm.totalReplies > 0 && showMyReply === true && (
        <RepliesLists
          showMyReply={showMyReply}
          commentsData={commentsData}
          comm={comm}
          ProfileImageAvatar={ProfileImageAvatar}
          isMobile={isMobile}
          commentId={commentId}
          setCommentId={setCommentId}
          issubReplyField={issubReplyField}
          setissubReplyField={setissubReplyField}
        />
      )}
      {showMyReply === true && comm.totalReplies > 0 ? (
        <div
          onClick={() => hideReply(comm.id)}
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
      ) : (
        ''
      )}

      {(isReplyField.check === true && isReplyField.id === comm.id) ||
      (issubReplyField.check === true && issubReplyField.id === comm.id) ? (
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
                  user={currUser}
                  style={{ marginRight: '10px' }}
                />
              }
              endAdornment={
                <>
                  <Button
                    onClick={showEmoji}
                    style={{
                      backgroundColor: '#111111',
                      border: 'none',
                      marginRight: '-20px',
                    }}
                  >
                    <span role='img'>
                      <InsertEmoticonIcon />
                    </span>
                  </Button>
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
            {show && (
              <span>
                <Picker
                  onSelect={addEmoji}
                  set='facebook'
                  emoji='point_up'
                  theme='dark'
                  skin='1'
                  style={{
                    position: 'absolute',
                    right: isMobile ? '40px' : '90px',
                    bottom: isMobile ? '250px' : '80px',
                    maxWidth: '300px',
                    with: '100%',
                    outline: 'none',
                  }}
                />
              </span>
            )}
          </Box>
        </form>
      ) : (
        ''
      )}
    </div>
  );
};

export default RepliesData;
