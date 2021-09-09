import NextLink from 'next/link';
import Link from '@material-ui/core/Link';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import Layout from '../components/layouts/layout-auth';
import { makeStyles } from '@material-ui/core/styles';
import ConversationsList from '../components/message/ConversationsList';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useRouter } from 'next/router';
import { currentUserSelector } from '../selectors/authSelector';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import ImageAvatar from '../components/image-avatar';
import { chat } from '../actions/chat';
import {
  activeConversationIdSelector,
  chatDataSelector,
  singleChatSelector,
} from '../selectors/chatSelector';
import MessagesList from '../components/message/MessagesList';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import io from 'socket.io-client';
import { snackbar } from '../actions/snackbar';
import useTipModal from '../components/profile/TipModal';
import ManuButton from '../components/menuButton';
import { user } from '../actions/user';
import MessageSend from '../components/message/MessageSend';
import { post } from '../actions/post';
import { currencySymbol } from '../services/currencySymbol';
import { socketUrl } from '../services/socketUrl';
import ConversationsListPrefix from '../components/message/ConversationsListPrefix';
import { v4 } from 'uuid';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const Chat = () => {
  const dispatch = useDispatch();
  const [socketIo, setSocketIo] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const activeConversationId = useSelector(activeConversationIdSelector);
  const [activeParticipant, setActiveParticipant] = React.useState(null);
  const [lastMessageReceived, setLastMessageReceived] = React.useState(null);
  const [scrollIntoViewPointer, setScrollIntoViewPointer] =
    React.useState(null);

  const router = useRouter();
  const { pathname, query } = router;
  const { conId } = query;

  let pageNum = 1;
  let limit = 50;

  const getConversations = () =>
    dispatch(
      chat.getConversations({
        pageNum: pageNum,
        limit: limit,
      })
    );

  useEffect(() => {
    const JWTToken = localStorage.getItem('jwtToken');
    const socket = io(socketUrl, {
      transports: ['websocket'],
      query: {
        token: `${JWTToken}`,
      },
    });
    setSocketIo(socket);
    socket.on('connected', data => {
      console.log(data);
    });
    socket.on('message-success', data => {
      console.log(data);
    });
    socket.on('new-message', data => {
      if (+conId === data.conversationId) {
        setLastMessageReceived(+new Date());
      }
      getConversations();
      dispatch(
        snackbar.update({
          open: true,
          message: (
            <>
              <Typography variant='subtitle2'>New message received:</Typography>
              <Typography variant='caption'>{data.message?.content}</Typography>
            </>
          ),
          severity: 'success',
        })
      );
      console.log('New message received: ', data);
    });
    socket.on('exception', data => {
      dispatch(
        snackbar.update({
          open: true,
          message: JSON.stringify(data),
          severity: 'error',
        })
      );
      console.log(data);
    });
    socket.on('disconnect', () => {
      console.log('disconnected');
    });

    function cleanup() {
      socket.disconnect();
    }

    return cleanup;
  }, [conId]);

  const classes = useStyles();
  const current = useSelector(currentUserSelector);
  const chatsData = useSelector(chatDataSelector);
  const singlechat = useSelector(singleChatSelector);

  const handleSendMessage = (content, callback, type) => {
    if (!type || type === 'socket') {
      handleSendMessageSocket(content, callback);
    }
  };

  const handleSendMessageSocket = (content, callback) => {
    let newMessageData = {
      ack: v4(),
      conversationId: +conId,
      receiver: activeParticipant?.id,
    };
    if (typeof content === 'string') {
      newMessageData.content = content;
      dispatch(
        chat.success({
          singleChat: [
            ...singlechat,
            {
              content,
              sender: current,
            },
          ],
        })
      );
      setScrollIntoViewPointer(+new Date());
    } else if (typeof content === 'object') {
      newMessageData = { ...newMessageData, ...content };
    }
    socketIo.emit('new-message-to-server', newMessageData, data => {
      console.log(data);
      if (data.success) {
        callback && callback();
        setLastMessageReceived(+new Date());
      }
    });
  };

  const handleSendNewMessage = (saveData, callback) => {
    dispatch(
      chat.sendMessage({
        saveData,
        callback: () => {
          getConversations();
          callback && callback();
        },
      })
    );
  };

  useEffect(() => {
    getConversations();
  }, []);

  useEffect(() => {
    if (conId) {
      dispatch(chat.updateActiveConversationId(+conId));
      if (chatsData && current) {
        setActiveParticipant(
          chatsData
            .find(c => c.id === +conId)
            ?.participants.find(p => p.id !== current.id)
        );
      }
    } else {
      dispatch(chat.updateActiveConversationId(null));
    }
  }, [conId, chatsData, current, singlechat]);

  const { TipModal } = useTipModal({
    onConfirm: (amount, callback) =>
      dispatch(
        post.addTip({
          saveData: {
            itemTipped: conId,
            itemTippedType: 'conversation',
            amount,
          },

          callback: () => {
            handleSendMessage(
              `${activeParticipant?.fullName} sent you a ${currencySymbol}${amount} tip`,
              callback
            );
          },
        })
      ),
  });

  return (
    <Layout>
      <Head>
        <title>Chat - xclusiveme</title>
      </Head>
      <Container maxWidth='md'>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            md={4}
            style={{
              display:
                activeConversationId !== null && isMobile ? 'none' : 'block',
            }}
          >
            <ConversationsList
              subheaderPrefix={
                <ConversationsListPrefix
                  onMediaUploaded={(data, callback) => {
                    handleSendNewMessage(data, callback);
                  }}
                />
              }
              setScrollIntoViewPointer={setScrollIntoViewPointer}
            />
          </Grid>

          <Grid
            item
            xs={12}
            md={8}
            style={{
              flexGrow: 1,
              display:
                activeConversationId === null && isMobile ? 'none' : 'block',
            }}
          >
            {conId ? (
              <Card>
                <CardHeader
                  avatar={
                    isMobile ? (
                      <IconButton
                        onClick={() => {
                          router.push({
                            pathname,
                            query: { ...query, conId: '' },
                          });
                        }}
                      >
                        <ArrowBackIcon />
                      </IconButton>
                    ) : (
                      <ImageAvatar src={activeParticipant?.profileImage} />
                    )
                  }
                  title={activeParticipant?.fullName}
                  title={
                    <Typography variant='body2'>
                      <NextLink
                        href={`/x/${activeParticipant?.username}`}
                        passHref
                      >
                        <Link>
                          {activeParticipant?.fullName || 'loading...'}
                        </Link>
                      </NextLink>
                    </Typography>
                  }
                  subheader='click here for contact info'
                  action={
                    <>
                      <TipModal
                        profileImage={activeParticipant}
                        name={activeParticipant?.fullName}
                      />
                      <ManuButton
                        title='Report this User'
                        profileImage={activeParticipant}
                        onConfirm={(reason, callback) => {
                          const itemId = activeParticipant?.id;
                          dispatch(
                            user.report({
                              reportData: {
                                itemId,
                                reason,
                              },
                              callback: () => {
                                callback && callback();
                              },
                            })
                          );
                        }}
                      />
                    </>
                  }
                />
                <CardContent>
                  <MessagesList
                    lastMessageReceived={lastMessageReceived}
                    scrollIntoViewPointer={scrollIntoViewPointer}
                    activeParticipant={activeParticipant}
                  />
                </CardContent>
                <MessageSend
                  conId={conId}
                  handleSendMessage={handleSendMessage}
                />
              </Card>
            ) : (
              <Card>
                <CardContent>
                  <p>Select a conversation or start a new one</p>
                </CardContent>
              </Card>
            )}
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default Chat;
