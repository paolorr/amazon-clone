import React, { useCallback } from 'react';

import { useCart } from '../../cart';

import { Container, ProductInfo, ProductPrice, ProductRating } from './styles';

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

  const addToBasket = useCallback(() => {
    dispatch({
      type: 'ADD_TO_BASKET',
      item: {
        id,
        title,
        image,
        price,
        rating,
      },
    });
  }, [dispatch, id, title, image, price, rating]);

  return (
    <Container>
      <ProductInfo>
        <p>{title}</p>

        <ProductPrice>
          <small>$</small>
          <strong>{price}</strong>
        </ProductPrice>

        <ProductRating>
          {Array(rating)
            .fill(0)
            .map((v, i) => (
              <p key={i}>🌟</p>
            ))}
        </ProductRating>
      </ProductInfo>

      <img src={image} />

      <button onClick={addToBasket}>Add to basket</button>
    </Container>
  );
};

export default Product;
