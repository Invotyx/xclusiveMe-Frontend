import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import Head from 'next/head';
import { makeStyles } from '@material-ui/core/styles';
import TileButton from '../components/TileButton';
import TileTextField from '../components/TileTextField';
import { auth } from '../actions/auth';
import { fetchingSelector } from '../selectors/authSelector';
import LayoutGuest from '../components/layouts/layout-guest-auth';

const useStyles = makeStyles((theme) => ({
  grey: {
    color: '#666',
  },
}));

export default function SignInSide() {
  const fetching = useSelector(fetchingSelector);
  const dispatch = useDispatch();
  const classes = useStyles();
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      auth.forgotPassword({
        email,
        callback: () => {
          router.push('/login');
        },
      })
    );
  };

  return (
    <LayoutGuest>
      <Head>
        <title>Login</title>
      </Head>
      <form onSubmit={handleSubmit}>
        <TileTextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant='outlined'
          margin='normal'
          required
          fullWidth
          id='email'
          label='Email Address'
          name='email'
          autoComplete='email'
          autoFocus
        />
        <TileButton
          type='submit'
          fullWidth
          variant='contained'
          color='primary'
          disabled={fetching}
        >
          Proceed
        </TileButton>
      </form>
    </LayoutGuest>
  );
}
