import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head';
import { auth } from '../../../../actions/auth';
import LayoutGuestAuth from '../../../../components/layouts/layout-guest-auth';
import { fetchingSelector } from '../../../../selectors/authSelector';
import { useRouter } from 'next/router';

export default function ResetPassword() {
  const fetching = useSelector(fetchingSelector);
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();
  const { token, email } = router.query;
  useEffect(() => {
    token && email && dispatch(auth.resetPasswordVerify({ token, email }));
  }, [token, email]);
  const handleSubmit = event => {
    event.preventDefault();
    dispatch(
      auth.updatePassword({
        saveData: {
          password,
          confirmPassword: password,
        },
        callback: () => {
          router.push('/login');
        },
      })
    );
  };

  return (
    <LayoutGuestAuth>
      <Head>
        <title>Reset Password</title>
      </Head>
      <form onSubmit={handleSubmit}>
        <TextField
          variant='outlined'
          margin='normal'
          required
          fullWidth
          name='password'
          label='New Password'
          type='password'
          id='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <Button
          type='submit'
          fullWidth
          variant='contained'
          color='primary'
          disabled={fetching}
        >
          Proceed
        </Button>
      </form>
    </LayoutGuestAuth>
  );
}
