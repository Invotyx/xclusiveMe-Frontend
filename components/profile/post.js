import React from 'react';
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
import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { post as postData } from '../../actions/post/index';
import styles from './profile.module.css';
import { currentUserSelector } from '../../selectors/authSelector';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import useReportModal from './ReportModal';
import TipModal from './TipModal';
import { fetchingSelector } from '../../selectors/postSelector';
import CircularProgress from '@material-ui/core/CircularProgress';
import NotBuyedModal from './NotBuyedModel';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ManuButton from '../../components/menuButton';
import ShowMoreText from 'react-show-more-text';
import PostComments from './postCommenst';
import usePostPurchaseModal from './PostPurchaseModel';
import { useInView } from 'react-intersection-observer';
import { currencySymbol } from '../../services/currencySymbol';

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
  profileModalStyle: {
    width: '30%',
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
  callbackAction,
}) {
  const { ref, inView } = useInView({ threshold: 0 });
  React.useEffect(() => {
    if (inView) {
      console.log(inView);
    } else {
      console.log('out');
    }
  }, [inView]);
  const { PostPurchaseModal, openPurchaseModal, setPurchased } =
    usePostPurchaseModal();
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentUser = useSelector(currentUserSelector);
  const searchInput = useRef(null);
  const { ReportModal, setreportModal } = useReportModal({
    onConfirm: () => {
      //
    },
  });
  const fetchData = useSelector(fetchingSelector);
  const [notByedModal, setnotBuyedModal] = useState(false);
  const isMobile = useMediaQuery('(max-width: 760px)');
  const [mediaClicked, setMediaClicked] = useState(false);

  function handleFocus() {
    searchInput?.current?.focus();
  }

  const handleLike = () => {
    //
    post.likes.length > 0
      ? post.likes.map(like =>
          dispatch(
            postData.deleteLike({
              id: post.id,
              callback: () => {
                callbackAction && callbackAction();
              },
            })
          )
        )
      : dispatch(
          postData.saveLike({
            id: post.id,
            callback: () => {
              callbackAction && callbackAction();
            },
          })
        );
  };

  const handleOpen = forReplyId => {
    setMediaClicked(true);
    //
    // dispatch(postData.requestOne(post.id));
    // dispatch(postData.requestReplies(forReplyId, post.id));
    // setOpen(true);
    // setForCommentId(forReplyId);

    // searchInput?.current?.focus();
    // setCheckRefs(true);
    // setOpenReply(true);
  };

  const handleNotOpenn = () => {};

  const nFormatter = n => {
    if (n < 1e3) return n;
    if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + 'K';
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + 'M';
    if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + 'B';
    if (n >= 1e12) return +(n / 1e12).toFixed(1) + 'T';
  };

  return (
    <>
      <Card className={styles.postCard} ref={ref}>
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
                  {/* {} */}
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
                              },
                            })
                          )
                        }
                      >
                        <NormalCaseButton
                          aria-label='Tip'
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

            {!me && post.isPaid && post.media.length < post.mediaCount ? (
              <div style={{ marginRight: '4px' }}>
                <NormalCaseButton
                  aria-label='Buy Post'
                  startIcon={<LocalMallIcon />}
                  onClick={openPurchaseModal}
                >
                  Buy Post
                </NormalCaseButton>
              </div>
            ) : (
              <NormalCaseButton>
                Total Tips: {currencySymbol}
                {post?.totalTips}
              </NormalCaseButton>
            )}
          </div>
          <PostPurchaseModal
            handlePurchase={() => {
              dispatch(
                postData.purchasePost({
                  id: post.id,
                  callback: () => {
                    setPurchased(true);
                    callbackAction && callbackAction();
                  },
                })
              );
            }}
            price={post?.price}
            user={post?.user}
          />
          <ReportModal post={post} />
          <NotBuyedModal
            notByedModal={notByedModal}
            setnotBuyedModal={setnotBuyedModal}
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

        <PostComments
          post={post}
          profileData={profileData}
          me={me}
          callbackAction={callbackAction}
          mediaClicked={mediaClicked}
        />
      </Card>
    </>
  );
}
