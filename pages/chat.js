import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import Layout from '../components/layouts/layout-auth';
import { makeStyles } from '@material-ui/core/styles';
import Message from '../components/message/Message';
import SearchIcon from '@material-ui/icons/Search';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import TileTextField from '../components/TileTextField';
import AddCommentIcon from '@material-ui/icons/AddComment';
import { useRouter } from 'next/router';
import { currentUserSelector } from '../selectors/authSelector';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import ImageAvatar from '../components/image-avatar';
import getConfig from 'next/config';
import { chat } from '../actions/chat';
import 'emoji-mart/css/emoji-mart.css';
import { chatDataSelector } from '../selectors/chatSelector';
import ConvoList from '../components/message/ConvoList';
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
const { publicRuntimeConfig } = getConfig();
const SERVER_ADDRESS = publicRuntimeConfig.backendUrl;

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

function useSocket(url) {
  const JWTToken =
    typeof window !== 'undefined' ? localStorage.getItem('jwtToken') : null;
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketIo = io(url, {
      transports: ['websocket'],
      query: {
        token: `${JWTToken}`,
      },
    });

    setSocket(socketIo);

    function cleanup() {
      socketIo.disconnect();
    }

    return cleanup;
  }, []);

  return socket;
}

export const ActiveConversationContext = React.createContext([[], () => {}]);
const Chat = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [activeConversationId, setActiveConversationId] = React.useState(null);
  const [lastMessageReceived, setLastMessageReceived] = React.useState(null);
  const socket = useSocket(
    `${SERVER_ADDRESS.substring(0, SERVER_ADDRESS.length - 4)}/messages`
  );
  useEffect(() => {
    if (socket) {
      socket.on('connected', data => {
        console.log(data);
      });
      socket.on('new-message', data => {
        setLastMessageReceived(+new Date());
        dispatch(
          snackbar.update({
            open: true,
            message: (
              <>
                <Typography variant='subtitle2'>
                  New message received:
                </Typography>
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
    }
  }, [socket]);

  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();
  const current = useSelector(currentUserSelector);
  const chatsData = useSelector(chatDataSelector);

  // const { user, image, userId } = router.query;

  const { conId } = router.query;
  let pageNum = 1;
  let limit = 50;

  useEffect(() => {
    dispatch(
      chat.getConversations({
        pageNum: pageNum,
        limit: limit,
      })
    );
  }, []);

  useEffect(() => {
    if (conId) {
      setActiveConversationId(conId);
    }
  }, [conId]);

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
              <Message
                subheaderPrefix={
                  <div
                    style={{
                      display: 'flex',
                      marginBottom: '10px',
                    }}
                  >
                    <form
                      noValidate
                      autoComplete='off'
                      style={{
                        flexGrow: 1,
                        marginRight: '5px',
                      }}
                    >
                      <TileTextField
                        fullWidth
                        id='outlined-basic'
                        placeholder='Search'
                        variant='outlined'
                        margin='dense'
                        InputProps={{
                          startAdornment: (
                            <SearchIcon
                              fontSize='small'
                              style={{ color: '#7c8080' }}
                            />
                          ),
                        }}
                      />
                    </form>
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
                    <ImageAvatar
                      src={
                        chatsData
                          .find(list => list.id == conId)
                          ?.participants.find(p => p.id !== current?.id)
                          ?.profileImage
                      }
                    />
                  )
                }
                title={
                  chatsData
                    .find(list => list.id == conId)
                    ?.participants.find(p => p.id !== current?.id)?.fullName
                }
                subheader='click here for contact info'
                action={
                  <>
                    <TipModal />
                    <ManuButton
                      title='Report this User'
                      profileImage={
                        chatsData
                          .find(c => +activeConversationId === c.id)
                          ?.participants.find(p => p.id !== current?.id)
                          ?.profileImage
                      }
                      onConfirm={(reason, callback) => {
                        const itemId = chatsData
                          .find(c => +activeConversationId === c.id)
                          ?.participants.find(p => p.id !== current?.id)?.id;
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
                <ConvoList
                  activeConversationId={activeConversationId}
                  lastMessageReceived={lastMessageReceived}
                />
              </CardContent>
              <MessageSend conId={conId} />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default Chat;
