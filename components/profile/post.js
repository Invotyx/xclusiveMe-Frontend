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
import { TramRounded } from '@material-ui/icons';
import { getCommentsDataSelector } from '../../selectors/postSelector';
import CircularProgress from '@material-ui/core/CircularProgress';
import { fetchingSelector } from '../../selectors/postSelector';
import LoadingOverlay from 'react-loading-overlay';
import BounceLoader from 'react-spinners/BounceLoader';

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
  const [isReplyField, setisReplyField] = useState(false);
  const singlePost = useSelector(singlepostDataSelector);
  const replyCount = useSelector(totalreplies);
  const [openModel, setOpenModel] = useState(false);
  const [focused, setFocused] = useState(false);
  const searchInput = useRef(null);
  const [openReportModal, setreportModal] = useState(false);
  const [openTip, setopenTip] = useState(false);
  const [loading, setLoading] = useState(false);
  const fetchData = useSelector(fetchingSelector);

  const handleOpenModel = () => {
    setOpenModel(true);
  };

  const handleOpenTopModal = () => {
    setopenTip(true);
  };

  const handleReportModal = () => {
    setreportModal(true);
  };

  function handleFocus() {
    searchInput.current.focus();
  }

  const handleAddComment = event => {
    event.preventDefault();

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
    // console.log('commentid', forReplyId);
    dispatch(postData.requestOne(post.id));
    // dispatch(postData.requestReplies(forReplyId, post.id));

    setForCommentId(forReplyId);
    searchInput.current.focus();
    setOpenReply(true);
    setOpen(true);
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
        {loading === true && <CircularProgress />}
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
                <IconButton
                  aria-label='more'
                  aria-controls='simple-menu'
                  aria-haspopup='true'
                  onClick={handleOpenmenu}
                >
                  <MoreVertIcon />
                </IconButton>
                {!subscriptionPlans && !me && (
                  <Menu
                    id='simple-menu'
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleCloseMenu}
                  >
                    <MenuItem onClick={handleOpenReportModal}>Report</MenuItem>
                  </Menu>
                )}
              </div>

              // <PopupState variant='popover' popupId='demo-popup-menu'>
              //   {popupState => (
              //     <>
              //       {/* <Button
              //         variant='contained'
              //         color='primary'
              //         {...bindTrigger(popupState)}
              //       >
              //         Open Menu
              //       </Button> */}
              //       <IconButton
              //         aria-label='settings'
              //         {...bindTrigger(popupState)}
              //       >
              //         <MoreVertIcon />
              //       </IconButton>
              //       <Menu {...bindMenu(popupState)}>
              //         <MenuItem onClick={handleReportModal}>Report</MenuItem>
              // <ReportModal
              //   reportModal={reportModal}
              //   setreportModal={setreportModal}
              // />
              //         {/* <MenuItem onClick={popupState.close}>Death</MenuItem> */}
              //       </Menu>
              //     </>
              //   )}
              // </PopupState>
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
                  onClick={handleLike}
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
                  onClick={handleLike}
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
              {!me && (
                <NormalCaseButton
                  aria-label='tip'
                  startIcon={<MonetizationOnOutlinedIcon />}
                  onClick={handleOpenTopModal}
                >
                  <span className={styles.hideOnMobile}>Tip</span>
                </NormalCaseButton>
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
          <TipModal openTip={openTip} setopenTip={setopenTip} post={post} />
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
          <p
            style={{
              cursor: 'pointer',
              marginLeft: '21px',
              marginTop: '0px',
              marginBottom: '12px',
              fontWeight: '500',
              fontSize: '14px',
            }}
            onClick={handleOpen}
          >
            View previous comments
          </p>
        ) : (
          ''
        )}

        <LoadingOverlay active={fetchData} spinner={<BounceLoader />}>
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
          />
        </LoadingOverlay>
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
                  {/* {comm?.user?.profileImage ? (
                  <img
                    src={comm.user.profileImage}
                    alt='profile=image'
                    width='40px'
                    height='40px'
                    style={{ marginRight: '10px', borderRadius: '50%' }}
                  />
                ) : (
                  <img
                    src='/dp.png'
                    alt='profile=image'
                    width='55px'
                    height='45px'
                    style={{ marginRight: '10px', borderRadius: '50%' }}
                  />
                )} */}
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
                  onClick={() => handleOpen(comm.id)}
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
                  // <FavoriteIcon
                  //   fontSize='small'
                  //   onClick={() => handleCommentLike(comm.id)}
                  // />
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
                {comm.totalReplies === 0 ? (
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
                  {comm.totalReplies === 0 ? '' : 'VIEW REPLIES'}
                </span>
              </p>
            </div>
          </div>
        ))}
        {/* {isReplyField === true ? (
        <Box style={{ borderTop: '1px solid #444444' }}>
          <OutlinedInput
            value={replyText}
            onChange={e => setReplyText(e.target.value)}
            name='replyText'
            multiline
            fullWidth
            onKeyDown={e => {
              if (e.keyCode === 13 && !e.shiftKey) {
                e.preventDefault();
              }
              // } else if (e.keyCode === 13) {
              //   handleAddComment(e);
              // }
            }}
            placeholder='Add a reply'
            startAdornment={
              // currentUser?.profileImage ? (
              //   <img
              //     src={currentUser && currentUser.profileImage}
              //     alt='profileImage'
              //     width='50px'
              //     height='45px'
              //     style={{ marginRight: '10px', borderRadius: '50%' }}
              //   />
              // ) : (
              //   <img
              //     src='/dp.png'
              //     alt='profileImage'
              //     width='50px'
              //     height='45px'
              //     style={{ marginRight: '10px', borderRadius: '50%' }}
              //   />
              // )

              <ProfileImageAvatar
                user={currentUser}
                style={{ marginRight: '10px' }}
              />
            }
            endAdornment={
              <Button
                onClick={handleAddReply}
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
            }
          />
        </Box>
      ) : ( */}
        <form onSubmit={handleAddComment}>
          <Box style={{ borderTop: '1px solid #444444' }}>
            <OutlinedInput
              value={commentText}
              onChange={e => setCommentText(e.target.value)}
              name='commentText'
              multiline
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
              }
            />
          </Box>
        </form>
      </Card>
    </LoadingOverlay>
  );
}
