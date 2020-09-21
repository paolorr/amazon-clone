import React from 'react';
import CurrencyFormat from 'react-currency-format';

import { Product } from '../../Contexts/cart';
import CheckoutProduct from '../../Checkout/Product';

import { Container, OrderId, OrderTotal } from './styles';
import { Timestamp } from '../../firebase';

export interface OrderDoc {
  id: string;
  data: OrderData;
}

export interface OrderData {
  amount: number;
  created_at: Timestamp;
  items: Product[];
}

interface OrderProps {
  order: OrderDoc;
}

const Order: React.FC<OrderProps> = ({ order }) => {
  return (
    <Container>
      <h2>Order</h2>
      <p>{order.data.created_at.toDate().toLocaleString('pt-BR')}</p>
      <OrderId>
        <small>{order.id}</small>
      </OrderId>
      {order.data.items.map(item => (
        <CheckoutProduct
          key={item.id}
          id={item.id}
          title={item.title}
          image={item.image}
          price={item.price}
          quantity={item.quantity}
          rating={item.rating}
          hideButtons
        />
      ))}

      <CurrencyFormat
        // eslint-disable-next-line react/jsx-one-expression-per-line
        renderText={(value: number) => (
          <OrderTotal>
            Order Total:
            {value}
          </OrderTotal>
        )}
        decimalScale={2}
        value={order.data.amount}
        displayType="text"
        thousandSeparator
        prefix="$"
      />
    </Container>
  );
};

export default Order;
