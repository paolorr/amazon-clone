import React, { useCallback } from 'react';

import { Product as CartProduct, useCart } from '../../cart';

import { Container, Info, Title, Price, Rating, Quantity } from './styles';

type ProductProps = CartProduct;

const Product: React.FC<ProductProps> = ({
  id,
  title,
  image,
  price,
  quantity,
  rating,
}) => {
  const { removeFromCart } = useCart();

  const handleRemoveFromCart = useCallback(() => {
    console.log('button clicked - remove from cart');
    removeFromCart(id);
  }, [removeFromCart, id]);

  return (
    <Container>
      <img src={image} />

      <Info>
        <Title>{title}</Title>

        <Price>
          <small>$</small>
          <strong>{price}</strong>
        </Price>

        <Rating>
          {Array(rating)
            .fill(0)
            .map((v, i) => (
              <p key={i}>🌟</p>
            ))}
        </Rating>

        <Quantity>
          Quantity:
          {quantity}
        </Quantity>

        <button onClick={handleRemoveFromCart}>Remove from cart</button>
      </Info>
    </Container>
  );
};

export default Product;
