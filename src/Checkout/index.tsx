import React from 'react';

import { useAuth } from '../Contexts/auth';
import { useCart } from '../Contexts/cart';

import Product from './Product';
import Subtotal from './Subtotal';

import { Container, Left, Basket, Right } from './styles';

const Checkout: React.FC = () => {
  const { displayName } = useAuth();
  const {
    cart: { items: basket },
  } = useCart();

  return (
    <Container>
      <Left>
        <img src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg" />

        <Basket>
          <h3>
            {/*  eslint-disable-next-line react/jsx-one-expression-per-line */}
            Hello {displayName}
          </h3>
          <h2>Your shopping Basket</h2>

          {basket.map(item => (
            <Product
              key={item.id}
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              quantity={item.quantity}
              rating={item.rating}
            />
          ))}
        </Basket>
      </Left>

      <Right>
        <Subtotal />
      </Right>
    </Container>
  );
};

export default Checkout;
