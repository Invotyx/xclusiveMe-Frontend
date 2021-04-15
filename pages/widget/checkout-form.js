import { TextField, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { payment } from '../../actions/payment';
import { snackbar } from '../../actions/snackbar';
import CardSection from './card-section';

export default function CheckoutForm(props) {
  const stripe = useStripe();
  const elements = useElements();
  const [name, setName] = useState('');
  const dispatch = useDispatch();

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
    const result = await stripe.createToken(card);

    if (result.error) {
      // Show error to your customer.
      console.log(result.error.message);
      dispatch(
        snackbar.update({
          open: true,
          message: result.error.message,
          severity: 'error',
        })
      );
    } else {
      dispatch(
        payment.addPayment({
          name,
          token: result.token.id,
          callback: () => {
            if (props.callback) {
              props.callback();
            }
          },
        })
      );
    }
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
        <Box mb={2}>
          <CardSection />
        </Box>
        <Button
          color='primary'
          variant='contained'
          disabled={!stripe}
          type='submit'
        >
          Add Method
        </Button>
        {props.cancelButton ? props.cancelButton : ``}
      </form>
    </>
  );
}
