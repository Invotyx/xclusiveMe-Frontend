import NextLink from 'next/link';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import ProfileImageAvatar from './profile-image-avatar';
import NormalCaseButton from '../NormalCaseButton';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { post as postData } from '../../actions/post/index';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CloseIcon from '@material-ui/icons/Close';
import { singlepostDataSelector } from '../../selectors/postSelector';
import { IconButton } from '@material-ui/core';
import SinglePostMedia from './SinglePostMedia';
import styles from './profile.module.css';
import RepliesData from './RepliesData';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import usePostPurchaseModal from './PostPurchaseModel';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { getCommentsDataSelector } from '../../selectors/postSelector';
import TipModal from './TipModal';
import { currentUserSelector } from '../../selectors/authSelector';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import { nFormatter } from '../../services/nFormatter';
import PostCommentsForm from './PostCommentsForm';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 0,
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
  },
  profileModalStyle: {
    width: '40vw',

    ['@media and screen and (minWidth: 600px)']: {
      maxWidth: '100%',
    },
  },
}));

const CommentModal = ({
  profileData,
  altHeader,
  setOpen,
  open,
  forCommentId,
  openReply,
  checkRefs,
  setCheckRefs,
}) => {
  const { PostPurchaseModal, openPurchaseModal, setPurchased } =
    usePostPurchaseModal();
  const classes = useStyles();
  const [commentId, setCommentId] = useState(null);
  const [isReplyField, setisReplyField] = useState({ id: '', check: false });
  const [issubReplyField, setissubReplyField] = useState({
    id: '',
    check: false,
  });
  const singlePost = useSelector(singlepostDataSelector);
  const paginatedComments = useSelector(getCommentsDataSelector);
  var forComments = paginatedComments?.results;
  var [commentsData, setCommentsData] = useState([]);
  const dispatch = useDispatch();
  const isMobile = useMediaQuery('(max-width: 760px)');
  const [pageNumber, setPageNumber] = useState(2);
  const [commLength, setcommLength] = useState(10);
  const currentUser = useSelector(currentUserSelector);
  const [closeCheck, setCloseClick] = useState(false);

  // function refreshPage() {
  //   window.location.reload(false);
  // }

  useEffect(() => {
    setCommentsData(commentsData => commentsData?.concat(forComments));
    return () => {
      setCommentsData([]);
    };
  }, [forComments]);

  useEffect(() => {
    if (forCommentId) {
      handleReplyField(forCommentId);
      //
    }
    //
  }, [forCommentId]);

  const handleModalCommentLike = cId => {
    //
    singlePost.comments &&
      singlePost.comments.map(comm =>
        comm.likes && comm.likes.length === 0 && comm.id === cId
          ? dispatch(
              postData.saveCommentLike({
                id: comm.id,
                callback: () => {
                  dispatch(postData.requestOne(singlePost.id));
                },
              })
            )
          : comm.id === cId &&
            dispatch(
              postData.delCommentLike({
                id: comm.id,
                callback: () => {
                  dispatch(postData.requestOne(singlePost.id));
                },
              })
            )
      );
  };

  const handleClose = () => {
    setCloseClick(true);
    setOpen(false);
    setisReplyField(false);
    setissubReplyField(false);
    // refreshPage();
  };

  const handleReplyField = id => {
    setCommentId(id);
    setCheckRefs && setCheckRefs(true);
    //
    //

    setisReplyField({ check: true, id });
    setissubReplyField({ check: false });
  };

  const handlleGetComments = () => {
    setPageNumber(pageNumber + 1);
    setcommLength(commLength + 10);
    dispatch(
      postData.getCommentsVal({
        id: singlePost?.id,
        page: pageNumber,
        limit: 10,
      })
    );
  };

  const handleLike = () => {
    singlePost.likes && singlePost.likes.length > 0
      ? dispatch(
          postData.deleteLike({
            id: singlePost.id,
            callback: () => {
              dispatch(postData.requestOne(singlePost.id));
            },
          })
        )
      : dispatch(
          postData.saveLike({
            id: singlePost.id,
            callback: () => {
              dispatch(postData.requestOne(singlePost.id));
            },
          })
        );
  };

  return (
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      className={classes.modal}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      open={open}
    >
      <div>
        <Fade in={open}>
          <>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#101010',
              }}
            >
              <div className={styles.hideOnMobile}>
                <SinglePostMedia
                  media={singlePost?.media}
                  mediaCount={singlePost?.mediaCount}
                  singlePost={singlePost}
                />
              </div>

              <div
                className={styles.profileModalStyle}
                style={{ backgroundColor: '#101010' }}
              >
                {altHeader ? (
                  <></>
                ) : (
                  !isMobile && (
                    <CardHeader
                      avatar={<ProfileImageAvatar user={profileData} />}
                      action={
                        <IconButton aria-label='settings' onClick={handleClose}>
                          {!isMobile && <CloseIcon />}
                        </IconButton>
                      }
                      title={
                        <>
                          <Box clone mr={1}>
                            <Typography variant='body2' component='span'>
                              <NextLink
                                href={`/x/${singlePost?.user?.username}`}
                                passHref
                              >
                                <Link>
                                  {singlePost?.user?.fullName || '(no name)'}
                                </Link>
                              </NextLink>
                            </Typography>
                          </Box>
                          <Typography variant='caption' color='textSecondary'>
                            {moment(
                              singlePost &&
                                singlePost.createdAt &&
                                singlePost.createdAt
                            ).fromNow()}
                          </Typography>
                        </>
                      }
                      subheader={
                        <Typography variant='caption' color='textSecondary'>
                          @{singlePost?.user?.username}
                        </Typography>
                      }
                    />
                  )
                )}
                {isMobile && (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginLeft: '25px',
                      marginRight: '40vw',
                      marginTop: '20px',
                    }}
                  >
                    <img src='/backBtn.svg' alt='back' onClick={handleClose} />
                    <p
                      style={{
                        fontWeight: '500',
                        fontSize: '15px',
                        fontFamily: 'Poppins',
                      }}
                    >
                      Comments
                    </p>
                  </div>
                )}
                {singlePost &&
                  singlePost.postText &&
                  (isMobile ? (
                    <div
                      style={{
                        display: 'flex',
                        marginLeft: '18px',
                        marginTop: '10px',
                      }}
                    >
                      <ProfileImageAvatar user={singlePost?.user} />
                      <CardContent>
                        <Typography
                          variant='body2'
                          color='textSecondary'
                          component='p'
                          style={{
                            whiteSpace: 'normal',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',

                            color: 'white',
                            fontFamily: 'Poppins',
                            fontSize: '16px',
                            marginTop: '-10px',
                          }}
                        >
                          {singlePost.postText.slice(0, 90)}
                        </Typography>
                      </CardContent>
                    </div>
                  ) : (
                    <CardContent>
                      <Typography
                        variant='body2'
                        color='textSecondary'
                        component='p'
                        style={{
                          whiteSpace: 'normal',
                          overflow: 'hidden',
                          textOverflow: 'clip',
                          color: 'white',
                          fontFamily: 'Poppins',
                          fontSize: '16px',
                        }}
                      >
                        {singlePost.postText.slice(0, 140)}
                      </Typography>
                    </CardContent>
                  ))}
                {!isMobile && (
                  <div
                    style={{
                      marginLeft: '10px',
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      <Box>
                        {singlePost &&
                        singlePost.likes &&
                        singlePost.likes.length === 0 ? (
                          <NormalCaseButton
                            aria-label='add to favorites'
                            startIcon={
                              <img src='/emptyHeart.png' alt='unliked' />
                            }
                            onClick={handleLike}
                          >
                            {nFormatter(singlePost?.totalLikes)}{' '}
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
                            {nFormatter(singlePost?.totalLikes)}{' '}
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
                        >
                          {nFormatter(singlePost?.totalComments)}{' '}
                          <span
                            className={styles.hideOnMobile}
                            style={{ marginLeft: '5px' }}
                          >
                            {' '}
                            Comments
                          </span>
                        </NormalCaseButton>
                        {
                          <span aria-label='tip'>
                            {singlePost?.media.length === 0 ? (
                              <MonetizationOnOutlinedIcon
                                style={{
                                  marginRight: '5px',
                                  marginLeft: '5px',
                                }}
                              />
                            ) : (
                              <TipModal
                                profileImage={singlePost?.user?.profileImage}
                                name={singlePost?.user?.fullName}
                                onConfirm={(amount, callback) =>
                                  dispatch(
                                    postData.addTip({
                                      saveData: {
                                        itemTipped: singlePost.id,
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
                            )}
                          </span>
                        }
                      </Box>
                    </div>
                    <div style={{ marginRight: '6px' }}>
                      {singlePost?.media.length === 0 && (
                        <NormalCaseButton
                          aria-label='Buy Post'
                          startIcon={<LocalMallIcon />}
                          onClick={openPurchaseModal}
                        >
                          Buy Post
                        </NormalCaseButton>
                      )}
                    </div>
                    <PostPurchaseModal
                      handlePurchase={() => {
                        dispatch(
                          postData.purchasePost({
                            id: singlePost.id,
                            callback: () => {
                              setPurchased(true);
                            },
                          })
                        );
                      }}
                      price={singlePost?.price}
                      user={singlePost?.user}
                    />
                  </div>
                )}
                <div>
                  <img src='/border.png' alt='bar' style={{ width: '100%' }} />

                  {singlePost?.totalComments < 10 ||
                  commLength >= singlePost?.totalComments ? (
                    ''
                  ) : (
                    <p
                      style={{
                        fontWeight: '500',
                        fontSize: '14px',
                        marginLeft: '15px',
                        cursor: 'pointer',
                      }}
                      onClick={handlleGetComments}
                    >
                      View previous comments
                    </p>
                  )}
                </div>

                <div
                  // className={styles.commentBox}
                  style={{
                    overflowY: 'scroll',
                    overflowX: 'hidden',
                    height: isMobile ? '65vh' : '280px',
                    marginLeft: '15px',
                  }}
                >
                  {singlePost?.comments?.map(
                    (comm, index) =>
                      comm?.parentCommentId === null && (
                        <div key={`abcdef${index}`}>
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              marginTop:
                                singlePost?.totalComments < 10 ? '15px' : '',
                            }}
                          >
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                              }}
                            >
                              <div style={{ display: 'flex' }}>
                                <NextLink
                                  href={`/x/${comm?.user?.username}`}
                                  passHref
                                >
                                  <Link>
                                    <ProfileImageAvatar user={comm?.user} />
                                  </Link>
                                </NextLink>

                                <NextLink
                                  href={`/x/${comm?.user?.username}`}
                                  passHref
                                >
                                  <Link>
                                    <p
                                      style={{
                                        marginTop: '7px',
                                        marginLeft: '10px',
                                        fontWeight: 'bold',
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
                                  cursor: 'pointer',
                                  marginLeft: '10px',
                                  marginTop: '5px',
                                  whiteSpace: 'normal',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  marginRight: '15px',
                                  color: '#ACACAC',
                                  fontWeight: comm.id === commentId && 'bold',
                                }}
                              >
                                {comm.comment.slice(0, 511)}
                              </p>
                            </div>
                            <div
                              style={{ display: 'flex', marginRight: '14px' }}
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
                                  onClick={() => handleReplyField(comm.id)}
                                />

                              {comm.likes && comm.likes.length === 0 ? (
                                <img
                                  src='/emptyHeart.png'
                                  alt='unliked'
                                  style={{
                                    width: '20px',
                                    height: '20px',
                                    cursor: 'pointer',
                                  }}
                                  onClick={() =>
                                    handleModalCommentLike(comm.id)
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
                                  }}
                                  onClick={() =>
                                    handleModalCommentLike(comm.id)
                                  }
                                />
                              )}
                            </div>
                          </div>

                          <div>
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
                                comm={comm}
                                post={singlePost}
                                singlePost={singlePost}
                                currUser={currentUser}
                                isReplyField={isReplyField}
                                setisReplyField={setisReplyField}
                                issubReplyField={issubReplyField}
                                setissubReplyField={setissubReplyField}
                                commentId={commentId}
                                setCommentId={setCommentId}
                                forCommentId={forCommentId}
                                openReply={openReply}
                                checkRefs={checkRefs}
                                closeCheck={closeCheck}
                              />
                            </div>
                          </div>
                        </div>
                      )
                  )}

                  {singlePost?.totalComments > 10 &&
                    commentsData?.map(
                      (comm, index) =>
                        comm?.parentCommentId === null && (
                          <div key={`abcdef${index}`}>
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                              }}
                            >
                              <div
                                style={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                }}
                              >
                                <div style={{ display: 'flex' }}>
                                  <NextLink
                                    href={`/x/${comm?.user?.username}`}
                                    passHref
                                  >
                                    <Link>
                                      <ProfileImageAvatar user={comm?.user} />
                                    </Link>
                                  </NextLink>

                                  <NextLink
                                    href={`/x/${comm?.user?.username}`}
                                    passHref
                                  >
                                    <Link>
                                      <p
                                        style={{
                                          marginTop: '7px',
                                          marginLeft: '10px',
                                          fontWeight: 'bold',
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
                                    cursor: 'pointer',
                                    marginLeft: '10px',
                                    marginTop: '5px',
                                    whiteSpace: 'normal',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    marginRight: '15px',
                                    color: '#ACACAC',
                                    fontWeight: comm.id === commentId && 'bold',
                                  }}
                                >
                                  {comm.comment.slice(0, 100)}
                                </p>
                              </div>
                              <div
                                style={{ display: 'flex', marginRight: '14px' }}
                              >
                                <div key={index}>
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
                                    onClick={() => handleReplyField(comm.id)}
                                  />
                                </div>

                                {comm.likes && comm.likes.length === 0 ? (
                                  <img
                                    src='/emptyHeart.png'
                                    alt='unliked'
                                    style={{
                                      width: '20px',
                                      height: '20px',
                                      cursor: 'pointer',
                                    }}
                                    onClick={() =>
                                      handleModalCommentLike(comm.id)
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
                                    }}
                                    onClick={() =>
                                      handleModalCommentLike(comm.id)
                                    }
                                  />
                                )}
                              </div>
                            </div>

                            <div>
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
                                  comm={comm}
                                  post={singlePost}
                                  singlePost={singlePost}
                                  currUser={currentUser}
                                  isReplyField={isReplyField}
                                  setisReplyField={setisReplyField}
                                  issubReplyField={issubReplyField}
                                  setissubReplyField={setissubReplyField}
                                  commentId={commentId}
                                  setCommentId={setCommentId}
                                  forCommentId={forCommentId}
                                  openReply={openReply}
                                  checkRefs={checkRefs}
                                  closeCheck={closeCheck}
                                />
                              </div>
                            </div>
                          </div>
                        )
                    )}
                </div>

                <PostCommentsForm
                  post={singlePost}
                  callbackAction={() =>
                    dispatch(postData.requestOne(singlePost.id))
                  }
                />
              </div>
            </div>
          </>
        </Fade>
      </div>
    </Modal>
  );
};

export default CommentModal;
