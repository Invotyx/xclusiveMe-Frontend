import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import getConfig from 'next/config';
import CheckoutForm from './checkout-form';
const { publicRuntimeConfig } = getConfig();
const STRIPE_KEY = publicRuntimeConfig.stripeKey;

export default function StripeElements(props) {
  const stripePromise = loadStripe(STRIPE_KEY);
  return (
    <>
      <Elements stripe={stripePromise}>
        <CheckoutForm {...props} />
      </Elements>
    </>
  );
}
