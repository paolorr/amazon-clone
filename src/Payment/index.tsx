import React from 'react';

import StripeWrapper from './StripeWrapper';
import PaymentPage from './Payment';

const Payment: React.FC = () => {
  return (
    <StripeWrapper>
      <PaymentPage />
    </StripeWrapper>
  );
};

export default Payment;
