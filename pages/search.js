import Head from 'next/head';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import SearchIcon from '@material-ui/icons/Search';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { makeStyles } from '@material-ui/core/styles';
import Layout from '../components/layout-auth';

const useStyles = makeStyles((theme) => ({
  root: {
    // marginTop: '150px',
  },
}));

export default function Home() {
  const classes = useStyles();

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
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}
