import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import UppercaseInputLabel from '../../UppercaseInputLabel';
import Button from '@material-ui/core/Button';
import TileTextField from '../../TileTextField';
import { auth } from '../../../actions/auth';
import { currentUserSelector } from '../../../selectors/authSelector';
import { useSelector } from 'react-redux';
import { fetchingSelector } from '../../../selectors/authSelector';
import { errorSelector } from '../../../selectors/authSelector';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function SubscriptionForm({ buttonProps, fieldOnly, ...props }) {
  const fetching = useSelector(fetchingSelector);
  const error = useSelector(errorSelector);
  const dispatch = useDispatch();
  const [price, set_price] = React.useState('');
  const [validationErrors, setValidationErrors] = React.useState({});
  const currentUser = useSelector(currentUserSelector);

  useEffect(() => {
    if (currentUser && currentUser.subscriptionPlans) {
      set_price(currentUser.subscriptionPlans.price);
    }
  }, [currentUser]);

  useEffect(() => {
    if (error?.response?.data?.errors) {
      setValidationErrors(error.response.data.errors);
    } else {
      setValidationErrors({});
    }
  }, [error]);

  const handleUpdate = event => {
    event.preventDefault();
    dispatch(
      auth.updateSubscriptionFee({
        id: currentUser?.subscriptionPlans.id,
        data: {
          amount: price,
          currency: 'USD',
        },
      })
    );
  };
  return (
    <>
      {!fieldOnly && (
        <>
          <Box my={2}>
            <UppercaseInputLabel>Set Up A Subscription Fee</UppercaseInputLabel>
          </Box>
          <Box mb={2}>
            <Divider />
          </Box>
          {fetching && <CircularProgress />}
          <Box my={2}>
            <Typography variant='subtitle2'>Add a subscription fee</Typography>
          </Box>
          <Box my={2}>
            <Typography variant='body2'>
              Users who will follow you will have to pay this upfront
            </Typography>
          </Box>
        </>
      )}
      <form onSubmit={handleUpdate}>
        <Box mb={4}>
          <TileTextField
            value={price}
            onChange={e => set_price(e.target.value)}
            variant='outlined'
            margin='normal'
            placeholder='Add price'
            fullWidth
            name='price'
            type='number'
            InputProps={{
              startAdornment: <AttachMoneyIcon />,
            }}
            error={validationErrors && validationErrors.price}
            helperText={
              validationErrors.price
                ? Object.values(validationErrors.price).join(', ')
                : ''
            }
          />

          <Button
            variant='outlined'
            type='submit'
            disabled={fetching}
            {...buttonProps}
          >
            Save
          </Button>
        </Box>
      </form>
    </>
  );
}
