import React, { useCallback, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { StripeCardElementChangeEvent } from '@stripe/stripe-js';
import CurrencyFormat from 'react-currency-format';

import { useAuth } from '../Contexts/auth';
import { useCart } from '../Contexts/cart';

import axios from '../axios';

import Product from '../Checkout/Product';

import {
  Container,
  Section,
  Title,
  Address,
  Basket,
  PaymentMethod,
  Price,
} from './styles';

const Payment: React.FC = () => {
  const { displayName } = useAuth();
  const {
    cart: { items: basket, totalItems, subtotal },
    emptyCart,
  } = useCart();

  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    const getClientSecret = async () => {
      // stripe expects the total in a currencies subunits, that`s why * 100
      if (subtotal) {
        try {
          const response = await axios.post(
            `payments/create?total=${subtotal * 100}`,
          );
          setClientSecret(response.data.clientSecret);
        } catch (err) {
          setClientSecret('');
          const message = err?.response?.data?.message;
          if (message) {
            alert(message);
          } else {
            alert(`Error retrieving client secret [${err.response.status}]`);
            console.log(err);
          }
        }
      } else {
        setClientSecret('');
      }
    };

    getClientSecret();
  }, [subtotal]);

  // console.log('SECRET >>>', clientSecret);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
      event.preventDefault();
      // console.log('submit');

      if (!clientSecret) {
        return;
      }

      const cardElement = elements?.getElement(CardElement);
      if (stripe && cardElement) {
        setProcessing(true);

        try {
          const { paymentIntent, error: err } = await stripe.confirmCardPayment(
            clientSecret,
            {
              payment_method: {
                card: cardElement,
              },
            },
          );

          if (!err) {
            console.log('SUCCESS');
            setClientSecret('');
            setSucceeded(true);
            setError(null);
            setProcessing(false);
            emptyCart();
            history.replace('/orders');
          } else {
            console.log(err);
            setSucceeded(false);
            setError(err.message || 'ERROR');
            setProcessing(false);
          }
        } catch (err) {
          console.log(err);
          setSucceeded(false);
          setError(null);
          setProcessing(false);
        }
      } else {
        alert('Stripe or CardElement not loaded');
      }
    },
    [emptyCart, stripe, elements, clientSecret, history],
  );

  const handleCreditCardChange = useCallback(
    (event: StripeCardElementChangeEvent): void => {
      setDisabled(event.empty);
      setError(event.error ? event.error.message : '');
    },
    [],
  );

  return (
    <Container>
      <h1>
        {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
        Checkout (<Link to="checkout">{totalItems} items</Link>)
      </h1>

      <Section>
        <Title>
          <h3>Delivery Address</h3>
        </Title>
        <Address>
          <p>{displayName}</p>
          <p>Av. das Américas 19.000</p>
          <p>Rio de Janeiro, RJ</p>
        </Address>
      </Section>

      <Section>
        <Title>
          <h3>Review items and delivery</h3>
        </Title>
        <Basket>
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
      </Section>

      <Section>
        <Title>
          <h3>Payment Method</h3>
        </Title>
        <PaymentMethod>
          <form onSubmit={handleSubmit}>
            <CardElement onChange={handleCreditCardChange} />
            <Price>
              <CurrencyFormat
                renderText={(value: number) => (
                  <>
                    {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
                    <h3>Order Total: {value}</h3>
                  </>
                )}
                decimalScale={2}
                value={subtotal}
                displayType="text"
                thousandSeparator
                prefix="$"
              />
              <button
                disabled={
                  processing ||
                  disabled ||
                  succeeded ||
                  subtotal <= 0 ||
                  !clientSecret
                }
              >
                <span>{processing ? <p>Processing</p> : 'Buy Now'}</span>
              </button>
            </Price>

            {error && <div>{error}</div>}
          </form>
        </PaymentMethod>
      </Section>
    </Container>
  );
};

export default Payment;
