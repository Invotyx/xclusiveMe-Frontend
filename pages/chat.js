import NextLink from 'next/link';
import Link from '@material-ui/core/Link';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import Layout from '../components/layouts/layout-auth';
import { makeStyles } from '@material-ui/core/styles';
import ConversationsList from '../components/message/ConversationsList';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AddCommentIcon from '@material-ui/icons/AddComment';
import { useRouter } from 'next/router';
import { currentUserSelector } from '../selectors/authSelector';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import ImageAvatar from '../components/image-avatar';
import getConfig from 'next/config';
import { chat } from '../actions/chat';
import {
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
import TipModal from '../components/profile/TipModal';
import ManuButton from '../components/menuButton';
import { user } from '../actions/user';
import MessageSend from '../components/message/MessageSend';
import SearchConversations from '../components/message/SearchConversations';
import { post } from '../actions/post';
import { currencySymbol } from '../services/currencySymbol';
const { publicRuntimeConfig } = getConfig();
const SERVER_ADDRESS = publicRuntimeConfig.backendUrl;

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export const ActiveConversationContext = React.createContext([[], () => {}]);
const Chat = () => {
  const [socketIo, setSocketIo] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [activeConversationId, setActiveConversationId] = React.useState(null);
  const [activeParticipant, setActiveParticipant] = React.useState(null);
  const [lastMessageReceived, setLastMessageReceived] = React.useState(null);
  const [scrollIntoViewPointer, setScrollIntoViewPointer] =
    React.useState(null);

  const router = useRouter();
  const { conId } = router.query;

  let pageNum = 1;
  let limit = 50;

  const getConversations = () =>
    dispatch(
      chat.getConversations({
        pageNum: pageNum,
        limit: limit,
      })
    );

  const url = `${SERVER_ADDRESS.substring(
    0,
    SERVER_ADDRESS.length - 4
  )}/messages`;
  useEffect(() => {
    const JWTToken = localStorage.getItem('jwtToken');
    const socket = io(url, {
      transports: ['websocket'],
      query: {
        token: `${JWTToken}`,
      },
    });
    setSocketIo(socket);
    socket.on('connected', data => {
      console.log(data);
    });
    socket.on('new-message', data => {
      if (+conId === data.conversationId) {
        setLastMessageReceived(+new Date());
      } else {
        getConversations();
      }
      dispatch(
        snackbar.update({
          open: true,
          message: (
            <>
              <Typography variant='subtitle2'>New message received:</Typography>
              <Typography variant='caption'>{data.message}</Typography>
            </>
          ),
          severity: 'success',
        })
      );
      console.log('New message sent to client: ', data);
    });
    socket.on('exception', data => {
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
  const dispatch = useDispatch();
  const current = useSelector(currentUserSelector);
  const chatsData = useSelector(chatDataSelector);
  const singlechat = useSelector(singleChatSelector);

  const handleSendMessage = (content, callback) => {
    let newMessageData = {
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
    });
    // setLastMessageReceived(+new Date());
    callback && callback();
  };

  useEffect(() => {
    getConversations();
  }, []);

  useEffect(() => {
    if (conId) {
      setActiveConversationId(+conId);
      if (chatsData && current) {
        setActiveParticipant(
          chatsData
            .find(c => c.id === +conId)
            ?.participants.find(p => p.id !== current.id)
        );
      }
    }
  }, [conId, chatsData, current, singlechat]);

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
            <ActiveConversationContext.Provider
              value={[activeConversationId, setActiveConversationId]}
            >
              <ConversationsList
                subheaderPrefix={
                  <div
                    style={{
                      display: 'flex',
                      marginBottom: '10px',
                    }}
                  >
                    <SearchConversations />
                    <IconButton
                      size='small'
                      style={{
                        backgroundColor: '#111111',
                        padding: '16px',
                        borderRadius: '3px',
                        width: '42px',
                        height: '42px',
                        marginTop: '7px',
                      }}
                    >
                      <AddCommentIcon />
                    </IconButton>
                  </div>
                }
              />
            </ActiveConversationContext.Provider>
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
            {condId && (
            <Card>
              <CardHeader
                avatar={
                  isMobile ? (
                    <IconButton
                      onClick={() => {
                        setActiveConversationId(null);
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
                      <Link>{activeParticipant?.fullName || 'loading...'}</Link>
                    </NextLink>
                  </Typography>
                }
                subheader='click here for contact info'
                action={
                  <>
                    <TipModal
                      profileImage={activeParticipant?.profileImage}
                      name={activeParticipant?.fullName}
                      onConfirm={(amount, callback) =>
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
                        )
                      }
                    />
                    <ManuButton
                      title='Report this User'
                      profileImage={activeParticipant?.profileImage}
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
                  activeConversationId={activeConversationId}
                  lastMessageReceived={lastMessageReceived}
                  scrollIntoViewPointer={scrollIntoViewPointer}
                />
              </CardContent>
              <MessageSend
                conId={conId}
                handleSendMessage={handleSendMessage}
              />
            </Card>
            )}
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default Chat;
