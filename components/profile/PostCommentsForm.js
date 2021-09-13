import Box from '@material-ui/core/Box';
import ProfileImageAvatar from './profile-image-avatar';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { post as postData } from '../../actions/post/index';
import { currentUserSelector } from '../../selectors/authSelector';
import { Button } from '@material-ui/core';
import useEmojiPicker from '../useEmojiPicker';

export default function PostCommentsForm({ post, callbackAction }) {
  const dispatch = useDispatch();
  const searchInput = useRef(null);
  const currentUser = useSelector(currentUserSelector);
  const { closeEmojiPicker, EmojiPicker, emojiPickerRef } = useEmojiPicker();
  const [commentText, setCommentText] = useState('');

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

  return (
    <>
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
