import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import MuiListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import ImageAvatar from '../image-avatar';
import {
  chatDataSelector,
  chatCountSelector,
  activeConversationIdSelector,
  searchResultsSelector,
} from '../../selectors/chatSelector';
import { useDispatch, useSelector } from 'react-redux';
import { currentUserSelector } from '../../selectors/authSelector';
import { withStyles } from '@material-ui/core';
import { useRouter } from 'next/router';
import Moment from 'react-moment';
import { chat } from '../../actions/chat';
import Highlighter from 'react-highlight-words';

const ListItem = withStyles({
  root: {
    fontFamily: 'Poppins',
    '& .MuiListItemAvatar-root': {
      minWidth: `50px`,
    },
    '& .MuiListItemText-root': {
      '& .MuiListItemText-primary': {
        width: '18ch',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
      '& .MuiTypography-body1': {
        fontFamily: 'Poppins',
        fontSize: '0.8rem',
      },
    },
    '& .MuiListItemText-secondary': {
      '& .MuiTypography-body2': {
        fontFamily: 'Poppins',
        fontSize: '0.7rem',
      },
    },
    '& + .MuiListItemSecondaryAction-root': {
      '& .MuiTypography-caption': {
        fontFamily: 'Poppins',
        fontSize: '0.6rem',
      },
    },
  },
})(MuiListItem);

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: '20px',
    cursor: 'pointer',
  },
  list: {
    overflowY: 'scroll',
    overflowX: 'hidden',
    height: `calc(100vh - 208px)`,
    '&::-webkit-scrollbar': {
      width: '5px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#4f4f4f',
    },
    [theme.breakpoints.up('md')]: {
      height: `calc(100vh - 192px)`,
      minHeight: `356px`,
    },
  },
}));

export default function ConversationsList({
  subheaderPrefix,
  setScrollIntoViewPointer,
}) {
  const dispatch = useDispatch();
  const activeConversationId = useSelector(activeConversationIdSelector);
  const searchResults = useSelector(searchResultsSelector);
  const SubheaderPrefix = () => subheaderPrefix || <></>;
  const classes = useStyles();
  const chatData = useSelector(chatDataSelector);
  const myData = useSelector(currentUserSelector);
  const chatsCount = useSelector(chatCountSelector);

  const router = useRouter();
  const { query } = router;
  const handleOpenChat = (conId, messageId) => {
    dispatch(chat.updateActiveConversationId(+conId));
    router.push({ pathname: '/chat', query: { ...query, conId, messageId } });
    messageId && setScrollIntoViewPointer(+new Date());
  };

  const { search } = query;

  React.useEffect(() => {
    dispatch(chat.search({ query: search }));
  }, [search]);

  return (
    <List className={classes.list} disablePadding>
      <ListSubheader
        disableGutters
        style={{ backgroundColor: '#000', paddingTop: '8px' }}
      >
        <>
          <SubheaderPrefix />
          <Typography>All messages</Typography>
        </>
      </ListSubheader>
      {chatsCount === 0 && (
        <ListItem>
          <ListItemText secondary='No Data Found' />
        </ListItem>
      )}
      {Boolean(search) ? (
        Boolean(searchResults?.length) ? (
          searchResults.map((i, x) => (
            <ListItem
              key={`chatData${x}`}
              button
              onClick={() => handleOpenChat(i.conversationId, i.id)}
              disableGutters
            >
              <ListItemAvatar>
                <ImageAvatar src={i.sender?.profileImage} />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant='body2' display='block' color='primary'>
                    {i.sender?.fullName}
                  </Typography>
                }
                secondary={
                  <React.Fragment>
                    <Typography
                      component='span'
                      variant='body2'
                      style={{ color: '#757575' }}
                    >
                      <Highlighter
                        textToHighlight={i.content}
                        searchWords={search?.split(' ')}
                      />
                    </Typography>
                  </React.Fragment>
                }
              />

              <ListItemSecondaryAction>
                <Typography component='span' variant='caption'>
                  <Moment fromNow inteval={10000}>
                    {i.updatedAt}
                  </Moment>
                </Typography>
              </ListItemSecondaryAction>
            </ListItem>
          ))
        ) : (
          <ListItem>
            <ListItemText secondary='No result found' />
          </ListItem>
        )
      ) : (
        chatData?.map((i, x) => (
          <ListItem
            key={`chatData${x}`}
            button
            onClick={() => handleOpenChat(i.id)}
            disableGutters
            selected={+activeConversationId === i.id}
          >
            <ListItemAvatar>
              <ImageAvatar
                src={
                  i.participants.find(p => p.id !== myData?.id)?.profileImage
                }
              />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography
                  variant='body2'
                  display='block'
                  color='primary'
                  style={{
                    fontWeight:
                      !i.lastMessage.isSeen &&
                      i.lastMessage.sender?.id !== myData?.id
                        ? 700
                        : 400,
                    fontSize:
                      !i.lastMessage.isSeen &&
                      i.lastMessage.sender?.id !== myData?.id
                        ? '1rem'
                        : '0.875rem',
                  }}
                >
                  {!i.lastMessage.isSeen &&
                    i.lastMessage.sender?.id !== myData?.id && (
                      <span style={{ marginRight: '10px' }}>•</span>
                    )}
                  {i.participants.find(p => p?.id !== myData?.id)?.fullName}
                </Typography>
              }
              secondary={
                <React.Fragment>
                  <Typography
                    component='span'
                    variant='body2'
                    style={{ color: '#757575' }}
                  >
                    {i.lastMessage.content.slice(0, 15)}...
                  </Typography>
                </React.Fragment>
              }
            />

            <ListItemSecondaryAction>
              <Typography component='span' variant='caption'>
                <Moment fromNow inteval={10000}>
                  {i.updatedAt}
                </Moment>
              </Typography>
            </ListItemSecondaryAction>
          </ListItem>
        ))
      )}
    </List>
  );
}
