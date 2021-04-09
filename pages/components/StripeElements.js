import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../widget/checkout-form';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const STRIPE_KEY = publicRuntimeConfig.stripeKey;

export default function Payments(props) {
  const stripePromise = loadStripe(STRIPE_KEY);
  return (
    <>
      <Elements stripe={stripePromise}>
        <CheckoutForm {...props} />
      </Elements>
    </>
  );
}
