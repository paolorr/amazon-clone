import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(
  'pk_test_51HRa7xJiTTD9Zq9g5XufLJ4O4yykyDy6PViOV3hsO6whXv9QfUdRFNKK0gMnrWMuOAX11nVVl39aMDUCT641oCAp00cOFDr8vk',
);

const StripeWrapper: React.FC = ({ children }) => {
  return <Elements stripe={stripePromise}>{children}</Elements>;
};

export default StripeWrapper;
