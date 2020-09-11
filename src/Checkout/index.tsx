import React from 'react';

import { useCart } from '../cart';

import Product from './Product';
import Subtotal from './Subtotal';

import { Container, Left, Basket, Right } from './styles';

const Checkout: React.FC = () => {
  const [{ basket }, dispatch] = useCart();

  return (
    <Container>
      <Left>
        <img src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg" />

        <Basket>
          <h2>Your shopping Basket</h2>

          {basket.map(item => (
            <Product
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
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
