import NextLink from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { post as postData } from '../../actions/post/index';
import CommentModal from './commentModel';
import { useRouter } from 'next/router';
import PostCommentsList from './PostCommentsList';
import PostCommentsForm from './PostCommentsForm';

export default function PostCommentsArea({
  post,
  callbackAction,
  mediaClicked,
}) {
  const router = useRouter();
  const { postId } = router.query;
  const [forCommentId, setForCommentId] = useState(null);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [openReply, setOpenReply] = useState(false);
  const searchInput = useRef(null);
  const [checkRefs, setCheckRefs] = useState(false);

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

      <PostCommentsForm
        post={post}
        callbackAction={callbackAction}
        searchInput={searchInput}
      />
    </>
  );
}
