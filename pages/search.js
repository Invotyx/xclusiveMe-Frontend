import { useState } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import SearchIcon from '@material-ui/icons/Search';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Layout from '../components/layout-auth';
import ImageAvatar from '../components/image-avatar';
import { useSelector, useDispatch } from 'react-redux';
import { fetchingSelector, userDataSelector } from '../selectors/userSelector';
import { user } from '../actions/user';
import {
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { getImage } from '../services/getImage';

const useStyles = makeStyles((theme) => ({
  root: {
    // marginTop: '150px',
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

export default function Home() {
  const dispatch = useDispatch();
  const fetching = useSelector(fetchingSelector);
  const users = useSelector(userDataSelector);
  const classes = useStyles();
  const [_search, set_search] = useState('');
  const handleSearch = (event) => {
    event.preventDefault();
    dispatch(user.request({ query: _search }));
  };

  return (
    <Layout>
      <Head>
        <title>Search</title>
      </Head>
      <Container maxWidth='sm'>
        <Grid container className={classes.root}>
          <Grid item xs={12}>
            <form onSubmit={handleSearch}>
              <Box display='flex' mb={4}>
                <OutlinedInput
                  fullWidth
                  placeholder='Search…'
                  startAdornment={<SearchIcon />}
                  endAdornment={fetching ? <CircularProgress /> : ''}
                  value={_search}
                  onChange={(e) => set_search(e.target.value)}
                />
              </Box>
            </form>
          </Grid>
          <Grid item xs={12}>
            <List>
              {users &&
                users.map((u) => (
                  <Box
                    clone
                    pt={3}
                    pb={3}
                    key={u.id}
                    mb={4}
                    height={100}
                    style={{
                      backgroundSize: 'cover',
                      backgroundImage: u.coverImage
                        ? `url(getImage(${u.coverImage}))`
                        : `url('/cover.jpg')`,
                      boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.5)',
                    }}
                  >
                    <ListItem>
                      <Box clone mr={2}>
                        <ListItemAvatar>
                          <ImageAvatar className={classes.large} user={u} />
                        </ListItemAvatar>
                      </Box>
                      <ListItemText primary={u.username} />
                      <ListItemSecondaryAction>
                        <Button
                          startIcon={<Add />}
                          size='small'
                          variant='outlined'
                        >
                          Follow
                        </Button>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </Box>
                ))}
            </List>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}
