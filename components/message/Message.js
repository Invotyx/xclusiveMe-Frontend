import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ImageAvatar from '../image-avatar';
import { useMediaQuery } from 'react-responsive';
import NextLink from 'next/link';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: '20px',
  },
  inline: {
    display: 'inline',
    fontFamily: 'Poppins',
  },
}));

export default function Message() {
  const classes = useStyles();
  const isMobile = useMediaQuery({ query: '(max-width: 760px)' });

  return (
    <List className={classes.root}>
      <NextLink passHref href={isMobile ? '/mChat' : '#'}>
        <ListItem>
          <ListItemAvatar>
            <ImageAvatar />
          </ListItemAvatar>
          <ListItemText
            primary='Zeeshan Haider'
            secondary={
              <React.Fragment>
                <Typography
                  component='span'
                  variant='body2'
                  className={classes.inline}
                  color='#757575'
                >
                  I'll be in you neighborhood...
                </Typography>
              </React.Fragment>
            }
          />
          <ListItemText
            secondary={
              <React.Fragment>
                <Typography
                  component='span'
                  variant='body2'
                  className={classes.inline}
                  color='#757575'
                >
                  2h ago
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
      </NextLink>

      <ListItem>
        <ListItemAvatar>
          <Avatar alt='Travis Howard' src='/static/images/avatar/2.jpg' />
        </ListItemAvatar>
        <ListItemText
          primary='Shani'
          secondary={
            <React.Fragment>
              <Typography
                component='span'
                variant='body2'
                className={classes.inline}
                color='#757575'
              >
                Wish I could come, but this…
              </Typography>
            </React.Fragment>
          }
        />
        <ListItemText
          secondary={
            <React.Fragment>
              <Typography
                component='span'
                variant='body2'
                className={classes.inline}
                color='#757575'
              >
                2h ago
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>

      <ListItem>
        <ListItemAvatar>
          <Avatar alt='Cindy Baker' src='/static/images/avatar/3.jpg' />
        </ListItemAvatar>
        <ListItemText
          primary='Zeeshan'
          secondary={
            <React.Fragment>
              <Typography
                component='span'
                variant='body2'
                className={classes.inline}
                color='#757575'
              >
                Wish I could come, but this…
              </Typography>
            </React.Fragment>
          }
        />
        <ListItemText
          secondary={
            <React.Fragment>
              <Typography
                component='span'
                variant='body2'
                className={classes.inline}
                color='#757575'
              >
                2h ago
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
  );
}
