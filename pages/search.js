import { useState } from 'react';
import Head from 'next/head';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import SearchIcon from '@material-ui/icons/Search';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Layout from '../components/layout-auth';
import { useSelector } from 'react-redux';
import { fetchingSelector } from '../selectors/userSelector';

const useStyles = makeStyles((theme) => ({
  root: {
    // marginTop: '150px',
  },
}));

export default function Home() {
  const fetching = useSelector(fetchingSelector);
  const classes = useStyles();
  const [_search, set_search] = useState('');

  return (
    <Layout>
      <Head>
        <title>Search</title>
      </Head>
      <Container maxWidth='md' disableGutters>
        <Grid container className={classes.root}>
          <Grid item xs={12}>
            <Box display='flex'>
              <OutlinedInput
                fullWidth
                placeholder='Search…'
                startAdornment={<SearchIcon />}
                endAdornment={fetching ? <CircularProgress /> : ''}
                value={_search}
                onChange={(e) => set_search(e.target.value)}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}
