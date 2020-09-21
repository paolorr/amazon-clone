import React, { useCallback } from 'react';
import PlusIcon from '@material-ui/icons/AddOutlined';
import MinusIcon from '@material-ui/icons/RemoveOutlined';

import { Product as CartProduct, useCart } from '../../Contexts/cart';

import {
  Container,
  Info,
  Title,
  Price,
  Rating,
  Quantity,
  IncreaseDecrease,
} from './styles';

type ProductProps = CartProduct & {
  hideButtons?: boolean;
};

const Product: React.FC<ProductProps> = ({
  id,
  title,
  image,
  price,
  quantity,
  rating,
  hideButtons = false,
}) => {
  const { removeFromCart, increaseItem, decreaseItem } = useCart();

  const handleRemoveFromCart = useCallback(() => {
    // console.log('handleRemoveFromCart');
    removeFromCart(id);
  }, [removeFromCart, id]);

  const handleIncreaseItem = useCallback(() => {
    // console.log('handleIncreaseItem');
    increaseItem(id);
  }, [increaseItem, id]);

  const handleDecreaseItem = useCallback(() => {
    // console.log('handleDecreaseItem');
    decreaseItem(id);
  }, [decreaseItem, id]);

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
          <strong>{quantity}</strong>
          {!hideButtons && (
            <IncreaseDecrease>
              <button onClick={handleDecreaseItem}>
                <MinusIcon />
              </button>
              <button onClick={handleIncreaseItem}>
                <PlusIcon />
              </button>
            </IncreaseDecrease>
          )}
        </Quantity>

        {!hideButtons && (
          <button onClick={handleRemoveFromCart}>Remove from cart</button>
        )}
      </Info>
    </Container>
  );
};

export default Product;
