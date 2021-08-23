import NextLink from 'next/link';
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import ProfileImageAvatar from './profile-image-avatar';
import NormalCaseButton from '../NormalCaseButton';
import PostMedia from './post-media';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import SendIcon from '@material-ui/icons/Send';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { post as postData } from '../../actions/post/index';
import styles from './profile.module.css';
import { currentUserSelector } from '../../selectors/authSelector';
import { singlepostDataSelector } from '../../selectors/postSelector';
import { totalreplies } from '../../selectors/postSelector';
import RemoveIcon from '@material-ui/icons/Remove';
import CommentModel from './commentModel';
import { Button } from '@material-ui/core';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import { Hidden } from '@material-ui/core';
import PostPurchaseModel from './PostPurchaseModel';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import ReportModal from './ReportModal';
import TipModal from './TipModal';
import { Check, TramRounded } from '@material-ui/icons';
import { getCommentsDataSelector } from '../../selectors/postSelector';
import CircularProgress from '@material-ui/core/CircularProgress';
import { fetchingSelector } from '../../selectors/postSelector';
import LoadingOverlay from 'react-loading-overlay';
import BounceLoader from 'react-spinners/BounceLoader';
import Notifications from '../../components/notification';
import NotBuyedModel from './NotBuyedModel';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import { useMediaQuery } from 'react-responsive';
import queryString from 'query-string';
import { useRouter } from 'next/router';
import ManuButton from '../menuButton';

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
}));
export default function Post({
  post,
  profileData,
  altHeader,
  me,
  subscriptionPlans,
}) {
  const classes = useStyles();
  const [commentText, setCommentText] = useState('');
  const [replyText, setReplyText] = useState('');
  const [liked, setLiked] = useState(false);
  const [commentedId, setCommentedId] = useState(null);
  const [forCommentId, setForCommentId] = useState(null);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector(currentUserSelector);
  const [commentId, setCommentId] = useState(null);
  const [openReply, setOpenReply] = useState(false);
  const [replyid, setReplyId] = useState(null);
  const [isReplyField, setisReplyField] = useState(false);
  const singlePost = useSelector(singlepostDataSelector);
  const replyCount = useSelector(totalreplies);
  const [openModel, setOpenModel] = useState(false);
  const [focused, setFocused] = useState(false);
  const searchInput = useRef(null);
  const [openReportModal, setreportModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const fetchData = useSelector(fetchingSelector);
  const [notByedModel, setnotBuyedModel] = useState(false);
  const [openforComment, setOpenforComment] = useState({
    id: '',
    check: false,
  });
  const [show, setShow] = useState(false);
  const isMobile = useMediaQuery({ query: '(max-width: 760px)' });
  const router = useRouter();
  const { postId } = router.query;

  const Links = ({ passQueryString, href, children, ...otherProps }) => (
    <NextLink
      href={`${href}?${queryString.stringify(passQueryString)}`}
      {...otherProps}
    >
      {children}
    </NextLink>
  );

  const handleOpenModel = () => {
    setOpenModel(true);
  };

  const handleReportModal = () => {
    setreportModal(true);
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

  const showEmoji = () => {
    setShow(!show);
  };

  const handleAddComment = event => {
    event.preventDefault();
    setShow(false);
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

          dispatch(
            postData.requestSubscribed()
            // postData.getComment({
            //   id: post.id,
            // })
          );
        },
      })
    );
  };

  const handleReplyField = id => {
    setCommentId(id);
    setisReplyField(true);
  };

  const handleAddReply = () => {
    setisReplyField(false);
    // console.log(commentId);

    if (!replyText || replyText.trim() === '') {
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
          dispatch(
            postData.requestSubscribed()
            // postData.getComment({
            //   id: post.id,
            // })
          );
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
                setLiked(false);
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
              setLiked(true);
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
    console.log('commentid', forReplyId);
    // dispatch(postData.requestOne(postId));
    setReplyId(forReplyId);
    // console.log(replyid);
    setForCommentId(forReplyId);
    searchInput.current.focus();
    // setOpenReply(true);
    // setOpen(true);
  };

  useEffect(() => {
    console.log(postId);
    postId && (dispatch(postData.requestOne(postId)), setOpen(true));
  }, [postId]);

  useEffect(() => {
    replyid !== null &&
      postId &&
      (dispatch(postData.requestReplies(replyid, postId)),
      setOpen(true),
      setOpenforComment({ id: replyid, Check: true }));
    // console.log('replyid', replyid);
    // console.log('forcomm', openforComment.id, '999');
  }, [replyid, postId]);

  const handleNotOpen = () => {
    setnotBuyedModel(true);
  };

  const handleNotOpenn = () => {
    console.log('Post not buyed');
  };

  const handleClose = () => {
    setOpen(false);
  };

  const options = ['Report'];
  const ITEM_HEIGHT = 48;

  const [anchorEl, setAnchorEl] = useState(null);
  // const openM = Boolean(anchorEl);

  const handleOpenmenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleOpenReportModal = () => {
    setAnchorEl(null);
    setreportModal(true);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
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
              // <IconButton aria-label='settings'>
              //   <MoreVertIcon />
              // </IconButton>

              <div>
                {post.media.length === 0 ? (
                  <IconButton aria-label='settings'>
                    <MoreVertIcon />
                  </IconButton>
                ) : (
                  <ManuButton
                    title='Report this Post'
                    profileImage={post?.user?.profileImage}
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
                )}
              </div>

              // <div>
              //   <IconButton
              //     aria-label='more'
              //     aria-controls='simple-menu'
              //     aria-haspopup='true'
              //     onClick={handleOpenmenu}
              //   >
              //     <MoreVertIcon />
              //   </IconButton>
              //   {!subscriptionPlans && !me && (
              //     <Menu
              //       id='simple-menu'
              //       anchorEl={anchorEl}
              //       keepMounted
              //       open={Boolean(anchorEl)}
              //       onClose={handleCloseMenu}
              //     >
              //       <MenuItem
              //         onClick={
              //           post.media.length === 0
              //             ? handleNotOpen
              //             : handleOpenReportModal
              //         }
              //       >
              //         Report
              //       </MenuItem>
              //     </Menu>
              //   )}
              // </div>
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
              {post.postText}
            </Typography>
          </CardContent>
        )}
        <PostMedia
          media={post.media}
          mediaCount={post.mediaCount}
          post={post}
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
              {!me && post.media.length === 0 ? (
                <NormalCaseButton
                  aria-label='tip'
                  startIcon={<MonetizationOnOutlinedIcon />}
                  onClick={
                    post.media.length === 0
                      ? handleNotOpenn
                      : handleOpenTopModal
                  }
                >
                  <span className={styles.hideOnMobile}>Tip</span>
                </NormalCaseButton>
              ) : (
                <TipModal
                  profileImage={post?.user?.profileImage}
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
                />
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
          {/* <ReportModal
            openReportModal={openReportModal}
            setreportModal={setreportModal}
            post={post}
          /> */}
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
            key={Math.random()}
            passHref
            href='/explore'
            passQueryString={{
              postId: `${post?.id}`,
            }}
          >
            {post?.media.length === 0 ? (
              ''
            ) : (
              <p
                style={{
                  cursor: 'pointer',
                  marginLeft: '21px',
                  marginTop: '0px',
                  marginBottom: '12px',
                  fontWeight: '500',
                  fontSize: '14px',
                }}
                onClick={post?.media.length === 0 ? handleNotOpen : handleOpen}
              >
                View previous comments
              </p>
            )}
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
          postId={postId}
          openforComment={openforComment}
          setOpenforComment={setOpenforComment}
        />

        {/* <div style={{ display: 'none' }}>
          <Notifications
            profileData={profileData}
            currentUser={currentUser}
            altHeader={altHeader}
            post={post}
          />
        </div> */}

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
                <Links
                  key={Math.random()}
                  passHref
                  href='/explore'
                  passQueryString={{
                    postId: `${post?.id}`,
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
                </Links>

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

            <div>
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
                  <Button
                    onClick={
                      post.media.length === 0 ? handleNotOpenn : showEmoji
                    }
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
                    bottom: '80px',
                    maxWidth: '300px',
                    with: '100%',
                    outline: 'none',
                  }}
                />
              </span>
            )}
          </Box>
        </form>
      </Card>
    </LoadingOverlay>
  );
}
