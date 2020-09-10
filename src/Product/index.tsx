import React from 'react';

import { Container, ProductInfo, ProductPrice, ProductRating } from './styles';

interface ProductProps {
  id: string;
  title: string;
  price: number;
  rating: number;
  image: string;
}

const Product: React.FC<ProductProps> = ({
  id,
  title,
  image,
  price,
  rating,
}) => (
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
          .map((_, i) => (
            <p>🌟</p>
          ))}
      </ProductRating>
    </ProductInfo>

    <img src={image} />

    <button type="button">Add to basket</button>
  </Container>
);

export default Product;
