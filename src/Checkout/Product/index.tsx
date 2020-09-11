import React, { useCallback } from 'react';

import { useCart } from '../../cart';

import { Container, Info, Title, Price, Rating } from './styles';

type ProductProps = {
  id: string;
  title: string;
  price: number;
  rating: number;
  image: string;
};

const Product: React.FC<ProductProps> = ({
  id,
  title,
  image,
  price,
  rating,
}) => {
  const [state, dispatch] = useCart();

  const removeFromBasket = useCallback(() => {
    dispatch({ type: 'REMOVE_FROM_BASKET', id });
  }, [dispatch, id]);

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

        <button onClick={removeFromBasket}>Remove from basket</button>
      </Info>
    </Container>
  );
};

export default Product;
