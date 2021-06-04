import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import TileButton from '../components/TileButton';
import TileTextField from '../components/TileTextField';
import Icon from '@material-ui/core/Icon';
import Link from '@material-ui/core/Link';
import MenuItem from '@material-ui/core/MenuItem';
import { auth } from '../actions/auth';
import { fetchingSelector, errorSelector } from '../selectors/authSelector';
import LayoutGuest from '../components/layouts/layout-guest-auth';
import { countriesSelector } from '../selectors/countriesSelector';
import CountryTextField from '../components/CountryTextField';

const useStyles = makeStyles(theme => ({
  grey: {
    color: '#666',
  },
}));

export default function SignInSide() {
  const fetching = useSelector(fetchingSelector);
  const countriesList = useSelector(countriesSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(auth.getCountriesList());
  }, [dispatch]);
  const error = useSelector(errorSelector);
  const [validationErrors, setValidationErrors] = useState({});
  useEffect(() => {
    if (error?.response?.data?.errors) {
      setValidationErrors(error.response.data.errors);
    }
  }, [error]);
  const classes = useStyles();
  const router = useRouter();
  const [registrationState, set_registrationState] = useState(1);
  const [sessionId, set_sessionId] = useState('');
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');
  const [country, setCountry] = useState('US');
  const [countryCallingCode, setCountryCallingCode] = useState('1');

  const handleSubmit = event => {
    event.preventDefault();
    if (registrationState === 1) {
      dispatch(
        auth.register({
          saveData: {
            fullName: fullName.trim(),
            username: username.trim(),
            email: email.trim(),
            password,
            confirmPassword,
            phoneNumber: `+${countryCallingCode}${phoneNumber}`,
          },
          callback: sid => {
            set_registrationState(2);
            set_sessionId(sid);
          },
        })
      );
    }
    if (registrationState === 2) {
      dispatch(
        auth.verifyOtp({
          sessionId,
          code,
          callback: () => {
            router.push('/explore');
          },
        })
      );
    }
  };

  return (
    <LayoutGuest>
      <Head>
        <title>Register</title>
      </Head>
      {registrationState === 1 && (
        <form onSubmit={handleSubmit}>
          <TileTextField
            error={validationErrors && validationErrors.fullName}
            helperText={
              validationErrors.fullName
                ? Object.values(validationErrors.fullName).join(', ')
                : ''
            }
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='fullName'
            label='Full Name'
            name='fullName'
            autoComplete='fullName'
          />
          <TileTextField
            error={validationErrors && validationErrors.username}
            helperText={
              validationErrors.username
                ? Object.values(validationErrors.username).join(', ')
                : ''
            }
            value={username}
            onChange={e => setUsername(e.target.value)}
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='username'
            label='Username'
            name='username'
            autoComplete='username'
          />
          <TileTextField
            error={validationErrors && validationErrors.email}
            helperText={
              validationErrors.email
                ? Object.values(validationErrors.email).join(', ')
                : ''
            }
            value={email}
            onChange={e => setEmail(e.target.value)}
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
          />
          <TileTextField
            error={validationErrors && validationErrors.password}
            helperText={
              validationErrors.password
                ? Object.values(validationErrors.password).join(', ')
                : ''
            }
            value={password}
            onChange={e => setPassword(e.target.value)}
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
          />
          <TileTextField
            error={validationErrors && validationErrors.confirmPassword}
            helperText={
              validationErrors.confirmPassword
                ? Object.values(validationErrors.confirmPassword).join(', ')
                : ''
            }
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='confirmPassword'
            label='Repeat Password'
            type='password'
            id='confirmPassword'
            autoComplete='confirm-password'
          />
          <Box display='flex'>
            <CountryTextField
              className='tempCountry'
              select
              InputProps={{
                startAdornment: (
                  <Icon>
                    <img
                      src={
                        countriesList.find(c => c.alpha2Code === country)?.flag
                      }
                      style={{ width: '100%' }}
                    />
                  </Icon>
                ),
              }}
              error={validationErrors && validationErrors.country}
              helperText={
                validationErrors.country
                  ? Object.values(validationErrors.country).join(', ')
                  : ''
              }
              value={country}
              onChange={e => {
                setCountry(e.target.value);
                setCountryCallingCode(
                  countriesList.find(c => c.alpha2Code === e.target.value)
                    ?.callingCodes[0]
                );
              }}
              variant='outlined'
              margin='normal'
              style={{ width: 100 }}
              id='country'
              name='country'
              autoComplete='country'
            >
              {countriesList?.map(c => (
                <MenuItem
                  value={c.alpha2Code}
                  key={`countriesList${c.alpha2Code}`}
                >
                  {c.name} (+{c.callingCodes[0]})
                </MenuItem>
              ))}
            </CountryTextField>
            <TileTextField
              error={validationErrors && validationErrors.phoneNumber}
              helperText={
                validationErrors.phoneNumber
                  ? Object.values(validationErrors.phoneNumber).join(', ')
                  : ''
              }
              value={phoneNumber}
              onChange={e => setPhoneNumber(e.target.value)}
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='phoneNumber'
              label='Phone Number'
              name='phoneNumber'
              autoComplete='phoneNumber'
            />
          </Box>
          <Box my={2}>
            <TileButton
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              disabled={fetching}
            >
              Register
            </TileButton>
          </Box>
        </form>
      )}
      {registrationState === 2 && (
        <form onSubmit={handleSubmit}>
          <TileTextField
            error={validationErrors && validationErrors.code}
            helperText={
              validationErrors.code
                ? Object.values(validationErrors.code).join(', ')
                : ''
            }
            value={code}
            onChange={e => setCode(e.target.value)}
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='code'
            label='Enter Code'
            name='code'
            type='number'
            autoComplete='code'
          />
          <Box textAlign='center' mt={1}>
            <NextLink href='#' passHref>
              <Link
                variant='body2'
                onClick={e => {
                  e.preventDefault();
                  dispatch(
                    auth.resendOtp({
                      sessionId,
                      callback: sid => {
                        set_sessionId(sid);
                      },
                    })
                  );
                }}
              >
                Resend OTP
              </Link>
            </NextLink>
          </Box>
          <Box my={2}>
            <TileButton
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
            >
              Verify
            </TileButton>
            <Box textAlign='center' mt={1}>
              <NextLink href='#' passHref>
                <Link
                  variant='body2'
                  onClick={e => {
                    e.preventDefault();
                    set_registrationState(1);
                  }}
                >
                  Cancel
                </Link>
              </NextLink>
            </Box>
          </Box>
        </form>
      )}
    </LayoutGuest>
  );
}
