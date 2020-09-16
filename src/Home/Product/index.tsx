import React, { useCallback } from 'react';

import { Product as CartProduct, useCart } from '../../Contexts/cart';

import { Container, ProductInfo, ProductPrice, ProductRating } from './styles';

type ProductProps = Omit<CartProduct, 'quantity'>;

const Product: React.FC<ProductProps> = ({
  id,
  title,
  image,
  price,
  rating,
}) => {
  const { addToCart } = useCart();

  const handleAddToCart = useCallback(() => {
    // console.log('handleAddToCart');

    addToCart({
      id,
      title,
      image,
      price,
      rating,
    });
  }, [addToCart, id, title, image, price, rating]);

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

      <button onClick={handleAddToCart}>Add to cart</button>
    </Container>
  );
};

export default Product;
