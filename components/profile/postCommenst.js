import NextLink from 'next/link';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import ProfileImageAvatar from './profile-image-avatar';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { post as postData } from '../../actions/post/index';
import styles from './profile.module.css';
import { currentUserSelector } from '../../selectors/authSelector';
import { singlepostDataSelector } from '../../selectors/postSelector';
import { totalrepliesSelector } from '../../selectors/postSelector';
import CommentModal from './commentModel';
import { Button } from '@material-ui/core';
import useEmojiPicker from '../useEmojiPicker';

export default function PostComments({
  post,
  profileData,
  altHeader,
  callbackAction,
  mediaClicked,
}) {
  const [commentText, setCommentText] = useState('');
  const [forCommentId, setForCommentId] = useState(null);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector(currentUserSelector);
  const [openReply, setOpenReply] = useState(false);
  const singlePost = useSelector(singlepostDataSelector);
  const replyCount = useSelector(totalrepliesSelector);
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

  const Links = ({  href, children, ...otherProps }) => (
    <NextLink
      href={`${href}`}
      {...otherProps}
    >
      {children}
    </NextLink>
  );

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

  const handleCommentLike = cId => {
    //
    post.comments.map(comm =>
      comm.likes && comm.likes.length > 0 && comm.id === cId
        ? dispatch(
            postData.delCommentLike({
              id: comm.id,
              callback: () => {
                callbackAction && callbackAction();
              },
            })
          )
        : comm.id === cId &&
          dispatch(
            postData.saveCommentLike({
              id: comm.id,
              callback: () => {
                callbackAction && callbackAction();
              },
            })
          )
    );
  };

  useEffect(() => {
    mediaClicked && (dispatch(postData.requestOne(post.id)), setOpen(true));
  }, [mediaClicked]);

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

  const handleNotOpenn = () => {};

  return (
    <>
      {post.comments.length >= 3 ? (
        <Links
          passHref
          href=`/singlePost?postId=${post.id}`
        >
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
        </Links>
      ) : (
        ''
      )}

      <CommentModal
        post={post}
        profileData={profileData}
        altHeader={altHeader}
        singlePost={singlePost}
        open={open}
        setOpen={setOpen}
        replyCount={replyCount}
        currentUser={currentUser}
        forCommentId={forCommentId}
        openReply={openReply}
        checkRefs={checkRefs}
        setCheckRefs={setCheckRefs}
      />

      {post.comments.map((comm, i) => (
        <div style={{ marginBottom: '20px' }} key={`abcdef${i}`}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{
                display: 'flex',
                marginLeft: '14px',
              }}
            >
              <div style={{ display: 'flex', marginLeft: '3px' }}>
                <NextLink href={`/x/${comm?.user?.username}`} passHref>
                  <Link>
                    <ProfileImageAvatar user={comm?.user} />
                  </Link>
                </NextLink>

                <NextLink href={`/x/${comm?.user?.username}`} passHref>
                  <Link>
                    <p
                      style={{
                        marginTop: '7px',
                        marginLeft: '15px',
                        fontWeight: '600',
                        fontSize: '14px',
                        cursor: 'pointer',
                      }}
                      className={styles.userNameMobile}
                    >
                      {comm?.user?.fullName}
                    </p>
                  </Link>
                </NextLink>
              </div>

              <p
                style={{
                  marginLeft: '10px',
                  marginTop: '7px',
                  textAlign: 'left',
                  color: '#ACACAC',
                  fontSize: '14px',
                  fontWeight: '600',
                  whiteSpace: 'normal',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {comm.comment}
              </p>
            </div>
            <div
              style={{
                display: 'flex',
                marginRight: '14px',
                marginTop: '5px',
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
                onClick={
                  post.media.length === 0
                    ? handleNotOpenn
                    : () => handleOpen(comm.id)
                }
              />

              {/* <ChatBubbleOutlineIcon
                style={{ marginRight: '9px' }}
                id={comm.id}
                fontSize='small'
                onClick={() => handleReplyField(comm.id)}
              /> */}

              {comm.likes && comm.likes.length === 0 ? (
                <img
                  src='/emptyHeart.png'
                  alt='unliked'
                  style={{
                    width: '20px',
                    height: '20px',
                    cursor: 'pointer',
                    marginRight: '7px',
                  }}
                  onClick={() =>
                    handleCommentLike(
                      post.media.length === 0 ? handleNotOpenn : comm.id
                    )
                  }
                />
              ) : (
                <img
                  src='/filled.png'
                  alt='unliked'
                  style={{
                    width: '20px',
                    height: '20px',
                    cursor: 'pointer',
                    marginRight: '7px',
                  }}
                  onClick={() =>
                    handleCommentLike(
                      post.media.length === 0 ? handleNotOpenn : comm.id
                    )
                  }
                />
              )}
            </div>
          </div>

          <div onClick={() => setOpenReply(true)}>
            <p
              style={{
                marginLeft: '72px',
                marginTop: '-10px',
                marginBottom: '0px',
                cursor: 'pointer',
                fontSize: '13px',
                display: 'flex',
              }}
              onClick={() => handleOpen(comm.id)}
            >
              {comm.totalReplies === 0 || post.media.length === 0 ? (
                ''
              ) : (
                <div>
                  <img
                    src='/lineReply.svg'
                    alt='line'
                    style={{
                      marginBottom: '5px',
                      marginRight: '3px',
                    }}
                  />
                </div>
              )}
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: '500',
                  marginLeft: '10px',
                }}
              >
                {comm.totalReplies === 0 || post.media.length === 0
                  ? ''
                  : 'VIEW REPLIES'}
              </span>
            </p>
          </div>
        </div>
      ))}

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
