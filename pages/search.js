import { useState } from 'react';
import { motion } from 'framer-motion';
import { variants } from '../services/framer-variants';
import Head from 'next/head';
import NextLink from 'next/link';
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
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
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
    dispatch(user.search({ q: _search }));
  };

  return (
    <motion.div initial='hidden' animate='visible' variants={variants}>
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
                  users.length > 0 &&
                  users.map((u) => (
                    <NextLink href={`/x/${u.username}`} key={`user${u.id}`}>
                    <Box
                      clone
                      pt={3}
                      pb={3}
                      key={`userx${u.id}`}
                      mb={4}
                      height={100}
                      style={{
                        backgroundSize: 'cover',
                        backgroundImage: u.coverImage
                          ? `url(${getImage(u.coverImage)})`
                          : `url('/cover.jpg')`,
                        boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.5)',
                      }}
                    >
                      <ListItem key={`user${u.id}`}>
                        <Box clone mr={2}>
                          <ListItemAvatar>
                            <ImageAvatar className={classes.large} user={u} />
                          </ListItemAvatar>
                        </Box>
                        <ListItemText primary={u.username} />
                        <ListItemSecondaryAction>
                        </ListItemSecondaryAction>
                      </ListItem>
                    </Box>
                    </NextLink>
                  ))}
              </List>
            </Grid>
          </Grid>
        </Container>
      </Layout>
    </motion.div>
  );
}
