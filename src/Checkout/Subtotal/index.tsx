/* eslint-disable spaced-comment */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import CurrencyFormat from 'react-currency-format';
import { useHistory } from 'react-router-dom';

import { useCart } from '../../Contexts/cart';

import { Container, Gift } from './styles';

const Subtotal: React.FC = () => {
  const {
    cart: { totalItems, subtotal },
  } = useCart();
  const history = useHistory();

  return (
    <Container>
      <CurrencyFormat
        renderText={(value: number) => (
          <>
            <p>
              Subtotal ({totalItems} items): <strong>{value}</strong>
            </p>
            <Gift>
              <input type="checkbox" /> This order contains a gift
            </Gift>
          </>
        )}
        decimalScale={2}
        value={subtotal}
        displayType="text"
        thousandSeparator
        prefix="$"
      />

      <button onClick={() => history.push('/payment')}>
        Proceed to Checkout
      </button>
    </Container>
  );
};

export default Subtotal;
