import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { variants } from '../../services/framer-variants';
import Head from 'next/head';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import Grid from '@material-ui/core/Grid';
import UppercaseInputLabel from '../../components/UppercaseInputLabel';
import Button from '@material-ui/core/Button';
import TileTextField from '../../components/TileTextField';
import { auth } from '../../actions/auth';
import { currentUserSelector } from '../../selectors/authSelector';
import { useSelector } from 'react-redux';
import Layout from '../../components/layouts/layout-settings';
import { fetchingSelector } from '../../selectors/authSelector';
import { errorSelector } from '../../selectors/authSelector';

export default function Home() {
  const fetching = useSelector(fetchingSelector);
  const error = useSelector(errorSelector);
  const dispatch = useDispatch();
  const [price, set_price] = React.useState('');
  const [validationErrors, setValidationErrors] = React.useState({});
  const currentUser = useSelector(currentUserSelector);

  useEffect(() => {
    if (currentUser) {
      set_price(currentUser.price);
    }
  }, [currentUser]);

  useEffect(() => {
    if (error?.response?.data?.errors) {
      setValidationErrors(Object.assign(...error.response.data.errors));
    } else {
      setValidationErrors({});
    }
  }, [error]);

  const handleUpdate = (event) => {
    event.preventDefault();
    dispatch(auth.updateSubscriptionFee(price));
  };
  return (
    <motion.div initial='hidden' animate='visible' variants={variants}>
      <Layout>
        <Head>
          <title>Account — Settings</title>
        </Head>
        <Grid container spacing={6}>
          <Grid item xs={12} md={8}>
            <Box my={2}>
              <UppercaseInputLabel>
                Set Up A Subscription Fee
              </UppercaseInputLabel>
            </Box>
            <Divider />
            <Box my={2}>
              <Typography variant='subtitle2'>
                Add a subscription fee
              </Typography>
            </Box>
            <Box my={2}>
              <Typography variant='body2'>
                Users who will follow you will have to pay this upfront
              </Typography>
            </Box>
            <form onSubmit={handleUpdate}>
              <Box mb={4}>
                <TileTextField
                  value={price}
                  onChange={(e) => set_price(e.target.value)}
                  variant='outlined'
                  margin='normal'
                  fullWidth
                  label='Select an amount'
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

                <Button variant='outlined' type='submit' disabled={fetching}>
                  Save
                </Button>
              </Box>
            </form>
          </Grid>
        </Grid>
      </Layout>
    </motion.div>
  );
}
