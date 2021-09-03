import NextLink from 'next/link';
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import ProfileImageAvatar from './profile-image-avatar';
import NormalCaseButton from '../NormalCaseButton';
import PostMedia from './post-media';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { post as postData } from '../../actions/post/index';
import styles from './profile.module.css';
import { currentUserSelector } from '../../selectors/authSelector';
import { singlepostDataSelector } from '../../selectors/postSelector';
import { totalrepliesSelector } from '../../selectors/postSelector';
import CommentModel from './commentModel';
import { Button } from '@material-ui/core';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import PostPurchaseModel from './PostPurchaseModel';
import ReportModal from './ReportModal';
import TipModal from './TipModal';
import { fetchingSelector } from '../../selectors/postSelector';
import LoadingOverlay from 'react-loading-overlay';
import BounceLoader from 'react-spinners/BounceLoader';
import NotBuyedModel from './NotBuyedModel';
import useEmojiPicker from '../useEmojiPicker';
import { useMediaQuery } from 'react-responsive';
import queryString from 'query-string';
import ManuButton from '../../components/menuButton';
import ShowMoreText from 'react-show-more-text';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 0,
    border: '1px solid #444444',
    ['@media and screen and (maxWidth: 600px)']: {
      width: '50px',
      height: '50px',
    },
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 2, 0.9)',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  profileModelStyle: {
    width: '30%',
  },
  modelStyle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  showMore: {
    color: theme.palette.primary.main,
  },
}));
export default function Post({
  post,
  profileData,
  altHeader,
  me,
  username,
}) {
  const classes = useStyles();
  const [commentText, setCommentText] = useState('');
  const [forCommentId, setForCommentId] = useState(null);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector(currentUserSelector);
  const [openReply, setOpenReply] = useState(false);
  const singlePost = useSelector(singlepostDataSelector);
  const replyCount = useSelector(totalrepliesSelector);
  const [openModel, setOpenModel] = useState(false);
  const searchInput = useRef(null);
  const [openReportModal, setreportModal] = useState(false);
  const fetchData = useSelector(fetchingSelector);
  const [notByedModel, setnotBuyedModel] = useState(false);
  const { closeEmojiPicker, EmojiPicker, emojiPickerRef } = useEmojiPicker();
  const isMobile = useMediaQuery({ query: '(max-width: 760px)' });
  const [checkRefs, setCheckRefs] = useState(false);

  const handleOpenModel = () => {
    setOpenModel(true);
  };

  function handleFocus() {
    searchInput.current.focus();
  }

  const addEmoji = e => {
    let sym = e.unified.split('-');
    let codesArray = [];
    sym.forEach(el => codesArray.push('0x' + el));
    let emoji = String.fromCodePoint(...codesArray);
    setCommentText(commentText + emoji);
  };

  const Links = ({ passQueryString, href, children, ...otherProps }) => (
    <NextLink
      href={`${href}?${queryString.stringify(passQueryString)}`}
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

          !username && dispatch(postData.requestSubscribed());
          username && dispatch(postData.requestX({ username }));
        },
      })
    );
  };

  const handleLike = () => {
    // console.log('post.likes = ', post.likes);
    post.likes.length > 0
      ? post.likes.map(like =>
          dispatch(
            postData.deleteLike({
              id: post.id,
              callback: () => {
                dispatch(postData.request());
                dispatch(postData.requestSubscribed());
              },
            })
          )
        )
      : dispatch(
          postData.saveLike({
            id: post.id,
            callback: () => {
              dispatch(postData.request());
              dispatch(postData.requestSubscribed());
            },
          })
        );
  };

  const handleCommentLike = cId => {
    // console.log(cId);
    post.comments.map(comm =>
      comm.likes && comm.likes.length > 0 && comm.id === cId
        ? dispatch(
            postData.delCommentLike({
              id: comm.id,
              callback: () => {
                dispatch(postData.request());
                dispatch(postData.requestSubscribed());
              },
            })
          )
        : comm.id === cId &&
          dispatch(
            postData.saveCommentLike({
              id: comm.id,
              callback: () => {
                dispatch(postData.request());
                dispatch(postData.requestSubscribed());
              },
            })
          )
    );
  };

  const handleOpen = forReplyId => {
    // console.log('commentid', forReplyId);
    dispatch(postData.requestOne(post.id));
    // dispatch(postData.requestReplies(forReplyId, post.id));

    setForCommentId(forReplyId);
    searchInput.current.focus();
    setCheckRefs(true);
    // setOpenReply(true);
    setOpen(true);
  };

  const handleGetSinglePostData = () => {
    dispatch(postData.requestOne(post.id));
  };

  const handleNotOpenn = () => {
    console.log('Post not buyed');
  };

  const nFormatter = n => {
    if (n < 1e3) return n;
    if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + 'K';
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + 'M';
    if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + 'B';
    if (n >= 1e12) return +(n / 1e12).toFixed(1) + 'T';
  };

  return (
    <LoadingOverlay active={fetchData} spinner={<BounceLoader />}>
      <Card className={styles.postCard}>
        {altHeader ? (
          <CardHeader
            action={
              <IconButton aria-label='settings'>
                <MoreHorizIcon />
              </IconButton>
            }
            subheader={moment(post.createdAt).fromNow()}
          />
        ) : (
          <CardHeader
            avatar={<ProfileImageAvatar user={profileData} />}
            action={
              <div>
                <ManuButton
                  post={post}
                  currentUser={currentUser}
                  title='Report'
                  profileImage={post?.user}
                  onConfirm={(reason, callback) =>
                    dispatch(
                      postData.postReport({
                        reportData: {
                          itemId: post?.id,
                          reason,
                        },
                        callback: () => {
                          callback && callback();
                          dispatch(postData.request());
                          dispatch(postData.requestSubscribed());
                        },
                      })
                    )
                  }
                />
              </div>
            }
            title={
              <>
                <Box clone mr={1}>
                  <Typography
                    variant='body2'
                    component='span'
                    style={{ fontWeight: '600' }}
                  >
                    <NextLink href={`/x/${profileData?.username}`} passHref>
                      <Link>{profileData?.fullName || '(no name)'}</Link>
                    </NextLink>
                  </Typography>
                </Box>
                <Typography
                  variant='caption'
                  color='textSecondary'
                  style={{ fontWeight: '900' }}
                >
                  {moment(post.createdAt).fromNow()}
                </Typography>
              </>
            }
            subheader={
              <Typography variant='caption' color='textSecondary'>
                @{profileData?.username}
              </Typography>
            }
          />
        )}
        {post.postText && (
          <CardContent>
            <Typography
              variant='body2'
              component='p'
              style={{
                color: 'white',
                lineHeight: '24px',
                fontWeight: '500',
                fontSize: '16px',
                fontFamily: 'Poppins',
                marginTop: '-13px',
                marginLeft: '4px',
              }}
            >
              <ShowMoreText lines={3} anchorClass={classes.showMore}>
                {post.postText}
              </ShowMoreText>
            </Typography>
          </CardContent>
        )}

        <PostMedia
          media={post.media}
          mediaCount={post.mediaCount}
          post={post}
          onImageClick={handleOpen}
        />

        <div
          style={{
            marginLeft: '4px',
            padding: '5px',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <div style={{ marginLeft: '10px' }}>
              {post.likes.length === 0 ? (
                <NormalCaseButton
                  aria-label='add to favorites'
                  startIcon={<img src='/emptyHeart.png' alt='unliked' />}
                  onClick={
                    post.media.length === 0 ? handleNotOpenn : handleLike
                  }
                >
                  {nFormatter(post.totalLikes)}{' '}
                  <span
                    className={styles.hideOnMobile}
                    style={{ marginLeft: '5px' }}
                  >
                    Likes
                  </span>
                </NormalCaseButton>
              ) : (
                <NormalCaseButton
                  aria-label='add to favorites'
                  startIcon={<img src='/filled.png' alt='liked' />}
                  onClick={
                    post.media.length === 0 ? handleNotOpenn : handleLike
                  }
                >
                  {/* {console.log('likeeddd')} */}
                  {nFormatter(post.totalLikes)}{' '}
                  <span
                    className={styles.hideOnMobile}
                    style={{ marginLeft: '5px' }}
                  >
                    Likes
                  </span>
                </NormalCaseButton>
              )}

              <NormalCaseButton
                aria-label='share'
                startIcon={<img src='/comment.png' alt='comment' />}
                onClick={handleFocus}
              >
                {nFormatter(post.totalComments)}{' '}
                <span
                  className={styles.hideOnMobile}
                  style={{ marginLeft: '5px' }}
                >
                  {' '}
                  Comments
                </span>
              </NormalCaseButton>

              {post?.user?.username == currentUser?.username ? (
                ''
              ) : (
                <span aria-label='tip'>
                  {post.media.length === 0 ? (
                    <>
                      <MonetizationOnOutlinedIcon
                        style={{
                          marginLeft: '5px',
                          marginRight: '5px',
                          marginBottom: isMobile ? '-8px' : '-9px',
                        }}
                      />
                      <span
                        className={styles.hideOnMobile}
                        style={{ marginLeft: '0px', cursor: 'pointer' }}
                      >
                        Tip
                      </span>
                    </>
                  ) : (
                    <>
                      <TipModal
                        profileImage={post?.user}
                        name={post?.user?.fullName}
                        onConfirm={(amount, callback) =>
                          dispatch(
                            postData.addTip({
                              saveData: {
                                itemTipped: post.id,
                                itemTippedType: 'post',
                                amount,
                              },

                              callback: () => {
                                callback && callback();
                                dispatch(postData.request());
                                dispatch(postData.requestSubscribed());
                              },
                            })
                          )
                        }
                      >
                        <NormalCaseButton
                          aria-label='Buy Post'
                          startIcon={<MonetizationOnOutlinedIcon />}
                        >
                          Tip
                        </NormalCaseButton>
                      </TipModal>
                    </>
                  )}
                </span>
              )}
            </div>

            {!me && (
              <div style={{ marginRight: '4px' }}>
                {post.media.length === 0 ? (
                  <NormalCaseButton
                    aria-label='Buy Post'
                    startIcon={<LocalMallIcon />}
                    onClick={handleOpenModel}
                  >
                    Buy Post
                  </NormalCaseButton>
                ) : (
                  ''
                )}
              </div>
            )}
          </div>
          <PostPurchaseModel
            post={post}
            openModel={openModel}
            setOpenModel={setOpenModel}
          />
          <ReportModal
            openReportModal={openReportModal}
            setreportModal={setreportModal}
            post={post}
          />
          <NotBuyedModel
            notByedModel={notByedModel}
            setnotBuyedModel={setnotBuyedModel}
            post={post}
          />
        </div>

        {false && (
          <NormalCaseButton
            aria-label='bookmark'
            startIcon={<BookmarkBorderOutlinedIcon />}
          >
            <Box display={{ xs: 'none', sm: 'none', md: 'flex' }}>Save</Box>
          </NormalCaseButton>
        )}

        {post.comments.length >= 3 ? (
          <Links
            passHref
            href='/singlePost'
            passQueryString={{
              postId: `${post.id}`,
            }}
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
              onClick={handleGetSinglePostData}
            >
              {post.media.length === 0 ? '' : 'View previous comments'}
            </p>
          </Links>
        ) : (
          ''
        )}

        <CommentModel
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

        {post.comments.map(comm => (
          <div style={{ marginBottom: '20px' }}>
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
      </Card>
    </LoadingOverlay>
  );
}
