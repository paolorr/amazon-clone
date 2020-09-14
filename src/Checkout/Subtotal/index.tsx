/* eslint-disable spaced-comment */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import CurrencyFormat from 'react-currency-format';

import { useCart } from '../../Contexts/cart';

import { Container, Gift } from './styles';

const Subtotal: React.FC = () => {
  const {
    cart: { totalItems, subtotal },
  } = useCart();

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

      <button>Proceed to Checkout</button>
    </Container>
  );
};

export default Subtotal;
