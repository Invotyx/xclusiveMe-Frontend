import NextLink from 'next/link';
import Box from '@material-ui/core/Box';
import ProfileImageAvatar from './profile-image-avatar';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { post as postData } from '../../actions/post/index';
import { currentUserSelector } from '../../selectors/authSelector';
import CommentModal from './commentModel';
import { Button } from '@material-ui/core';
import useEmojiPicker from '../useEmojiPicker';
import { useRouter } from 'next/router';
import PostCommentsList from './postCommentsList';
import PostCommentsList from './postCommentsList';

export default function PostCommentsArea({
  post,
  callbackAction,
  mediaClicked,
}) {
  const router = useRouter();
  const { postId } = router.query;
  const [commentText, setCommentText] = useState('');
  const [forCommentId, setForCommentId] = useState(null);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector(currentUserSelector);
  const [openReply, setOpenReply] = useState(false);
  const searchInput = useRef(null);
  const { closeEmojiPicker, EmojiPicker, emojiPickerRef } = useEmojiPicker();
  const [checkRefs, setCheckRefs] = useState(false);

  const addEmoji = e => {
    let sym = e.unified.split('-');
    let codesArray = [];
    sym.forEach(el => codesArray.push('0x' + el));
    let emoji = String.fromCodePoint(...codesArray);
    setCommentText(commentText + emoji);
  };

  const handleAddComment = event => {
    event.preventDefault();
    closeEmojiPicker();
    if (!commentText || commentText.trim() === '') {
      return;
    }
    dispatch(
      postData.saveComment({
        id: post.id,
        commentText: {
          comment: commentText,
          isReply: false,
        },

        callback: () => {
          setCommentText('');

          callbackAction && callbackAction();
        },
      })
    );
  };

  useEffect(() => {
    mediaClicked && (dispatch(postData.requestOne(post.id)), setOpen(true));
  }, [mediaClicked]);

  useEffect(() => {
    // setOpen(Boolean(postId));
    // postId && dispatch(postData.requestOne(post.id));
    console.log(postId);
  }, [postId]);

  const handleOpen = forReplyId => {
    //
    dispatch(postData.requestOne(post.id));
    // dispatch(postData.requestReplies(forReplyId, post.id));

    setForCommentId(forReplyId);
    searchInput.current?.focus();
    setCheckRefs(true);
    // setOpenReply(true);
    setOpen(true);
  };

  return (
    <>
      {post.comments.length >= 3 ? (
        <NextLink passHref href={`/singlePost?postId=${post.id}`}>
          <p
            style={{
              cursor: 'pointer',
              marginLeft: '21px',
              marginTop: '0px',
              marginBottom: '12px',
              fontWeight: '500',
              fontSize: '14px',
            }}
          >
            {post.media.length === 0 ? '' : 'View previous comments'}
          </p>
        </NextLink>
      ) : (
        ''
      )}

      <CommentModal
        profileData={post.user}
        open={open}
        setOpen={setOpen}
        forCommentId={forCommentId}
        openReply={openReply}
        checkRefs={checkRefs}
        setCheckRefs={setCheckRefs}
      />

      <PostCommentsList
        post={post}
        callbackAction={callbackAction}
        setOpenReply={setOpenReply}
        handleOpen={handleOpen}
      />

      <form onSubmit={handleAddComment}>
        <Box style={{ borderTop: '1px solid #444444' }}>
          <OutlinedInput
            value={commentText}
            onChange={e => setCommentText(e.target.value)}
            name='commentText'
            multiline
            disabled={post.media.length === 0}
            fullWidth
            onKeyDown={e => {
              if (e.keyCode === 13) {
                if (!event.shiftKey) {
                  handleAddComment(e);
                }
              }
            }}
            inputRef={searchInput}
            placeholder='Add a comment'
            startAdornment={
              <ProfileImageAvatar
                user={currentUser}
                style={{ marginRight: '10px' }}
              />
            }
            endAdornment={
              <>
                <span ref={emojiPickerRef}>
                  <EmojiPicker
                    onSelect={addEmoji}
                    popperProps={{ placement: 'bottom-end' }}
                  />
                </span>

                <Button
                  type='submit'
                  style={{
                    backgroundColor: '#111111',
                    border: 'none',
                    marginRight: '-20px',
                  }}
                >
                  <img
                    src='/send.png'
                    alt='send button'
                    style={{ marginRight: '10px' }}
                  />
                </Button>
              </>
            }
          />
        </Box>
      </form>
    </>
  );
}
