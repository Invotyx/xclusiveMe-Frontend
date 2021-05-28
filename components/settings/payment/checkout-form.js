import { TextField, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { paymentMethod } from '../../../actions/payment-method';
import { snackbar } from '../../../actions/snackbar';
import CardSection from './card-section';
import { fetchingSelector } from '../../../selectors/paymentMethodSelector';

export default function CheckoutForm(props) {
  const fetching = useSelector(fetchingSelector);
  const stripe = useStripe();
  const elements = useElements();
  const [name, setName] = useState('');
  const [token, setToken] = useState(null);
  const [_disabled, set_disabled] = useState('');
  const dispatch = useDispatch();

  const savePaymentMethod = (token) => {
    dispatch(
      paymentMethod.save({
        name,
        token,
        callback: () => {
          if (props.callback) {
            props.callback();
          }
          if (props.afterSave) {
            props.afterSave();
          }
        },
      })
    );
  };

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make  sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const card = elements.getElement(CardElement);
    set_disabled(true);
    if (!token) {
      const result = await stripe.createToken(card);

      if (result.error) {
        set_disabled(false);
        // Show error to your customer.
        console.log(result.error.message);
        dispatch(
          snackbar.update({
            open: true,
            message: result.error.message,
            severity: 'error',
          })
        );
      }
      if (result.token) {
        set_disabled(false);
        setToken(result.token.id);
        savePaymentMethod(result.token.id);
      }
    } else {
      savePaymentMethod(token);
    }
    setTimeout(() => {
      set_disabled(false);
    }, 2000);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {props.title && (
          <Typography variant='h5' gutterBottom>
            {props.title}
          </Typography>
        )}
        <Box mb={2}>
          <TextField
            variant='outlined'
            name='name'
            label='Title'
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Box>
        <Box
          mb={2}
          pt={3}
          pb={3}
          pl={1}
          border='1px solid #222'
          borderRadius={4}
        >
          <CardSection />
        </Box>
        <Button
          color='primary'
          variant='contained'
          disabled={!stripe || fetching || _disabled}
          type='submit'
        >
          Add Method
        </Button>
        {props.cancelButton ? props.cancelButton : ``}
      </form>
    </>
  );
}
