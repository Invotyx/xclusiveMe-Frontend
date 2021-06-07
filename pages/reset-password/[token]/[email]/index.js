import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head';
import { auth } from '../../../../actions/auth';
import LayoutGuestAuth from '../../../../components/layouts/layout-guest-auth';
import {
  fetchingSelector,
  errorSelector,
} from '../../../../selectors/authSelector';

export default function ResetPassword() {
  const fetching = useSelector(fetchingSelector);
  const [password, setPassword] = useState('');
  const error = useSelector(errorSelector);
  const [validationErrors, setValidationErrors] = React.useState({});
  useEffect(() => {
    if (error?.response?.data?.errors) {
      setValidationErrors(error.response.data.errors);
    }
  }, [error]);
  const dispatch = useDispatch();
  const handleSubmit = event => {
    event.preventDefault();
    dispatch(
      auth.updatePassword({
        saveData: {
          password,
          confirmPassword: password,
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
          error={validationErrors && validationErrors.confirmPassword}
          helperText={
            validationErrors.confirmPassword
              ? Object.values(validationErrors.confirmPassword).join(', ')
              : ''
          }
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
