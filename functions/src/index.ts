import * as functions from 'firebase-functions';
import * as express from 'express';
import * as cors from 'cors';
import Stripe from 'stripe';

const apiKey = functions.config().env.stripe.apikey;

const stripe = new Stripe(apiKey, {
  apiVersion: '2020-08-27',
});

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.post('/payments/create', async (request, response) => {
  const total = request.query.total || '';

  console.log('TOTAL >>>', total);

  if (typeof total !== 'string' || !/^[0-9]*$/.test(total.toString())) {
    response.status(400).send({ error: true, message: 'Invalid total' });
    return;
  }

  const totalParsed = Number(total);

  if (totalParsed <= 0) {
    response
      .status(400)
      .send({ error: true, message: 'Total must be grater than zero' });
    return;
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalParsed,
      currency: 'USD',
    });

    response.status(201).send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.log(error);
    response.status(400).send({ error: true });
  }
});

export const api = functions.https.onRequest(app);
