import NextLink from 'next/link';
import Link from '@material-ui/core/Link';
import ProfileImageAvatar from './profile-image-avatar';
import { useDispatch } from 'react-redux';
import { post as postData } from '../../actions/post/index';
import styles from './profile.module.css';
import RepliesData from './RepliesData';

export default function PostCommentsList({
  post,
  callbackAction,
  setOpenReply,
  handleOpen,
  replies,
}) {
  const dispatch = useDispatch();

  const handleCommentLike = cId => {
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

  const handleNotOpenn = () => {
    return false;
  };

  return (
    <>
      {post?.comments?.map((comm, i) => (
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
                  onClick={() => handleCommentLike(comm.id)}
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
                  onClick={() => handleCommentLike(comm.id)}
                />
              )}
            </div>
          </div>

          {!replies ? (
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
          ) : (
            <div
              style={{
                marginLeft: '50px',
                marginTop: '-10px',
                marginBottom: '0px',
                cursor: 'pointer',
                fontSize: '11px',
              }}
            >
              <RepliesData
                dksjgalksdjgkldsjaglsdkagjl={392683409684309}
                dksjgalksdjgkldsjaglsdkagjl={392683409684309}
                comment={comm}
                post={post}
              />
            </div>
          )}
        </div>
      ))}
    </>
  );
}
