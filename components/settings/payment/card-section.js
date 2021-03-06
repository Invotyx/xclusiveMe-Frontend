/**
 * Use the CSS tab above to style your Element's container.
 */

import { CardElement } from '@stripe/react-stripe-js';
import React from 'react';
const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#fff',
      '::placeholder': {
        color: 'rgba(255, 255, 255, 0.7)',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
};
function CardSection() {
  return (
    <>
      <CardElement options={CARD_ELEMENT_OPTIONS} className='StripeElement' />
    </>
  );
}
export default CardSection;
