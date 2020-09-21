import React, { useEffect, useState } from 'react';

import { useAuth } from '../Contexts/auth';
import { db } from '../firebase';
import Order, { OrderDoc, OrderData } from './Order';

import { Container, OrdersList } from './styles';

const Orders: React.FC = () => {
  const { user } = useAuth();

  const [orders, setOrders] = useState<OrderDoc[]>([]);

  useEffect(() => {
    if (user) {
      const unsubscribe = db
        .collection('users')
        .doc(user.uid)
        .collection('orders')
        .orderBy('created_at', 'desc')
        .onSnapshot(snapshot => {
          setOrders(
            snapshot.docs.map(doc => ({
              id: doc.id,
              data: doc.data() as OrderData,
            })),
          );
        });

      return unsubscribe;
    }
    setOrders([]);
  }, [user]);

  return (
    <Container>
      <h1>Your Orders</h1>
      <OrdersList>
        {orders.map(order => (
          <Order key={order.id} order={order} />
        ))}
      </OrdersList>
    </Container>
  );
};

export default Orders;
