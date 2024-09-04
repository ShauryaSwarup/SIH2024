"use client"
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (paymentMethodError) {
      setError(paymentMethodError.message);
      return;
    }

    const response = await fetch('/api/stripe/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: 1000 }), // Example amount in cents
    });

    const { client_secret } = await response.json();

    const { error: confirmError } = await stripe.confirmCardPayment(client_secret, {
      payment_method: paymentMethod.id,
    });

    if (confirmError) {
      setError(confirmError.message);
      return;
    }

    setSuccess(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement options={{ hidePostalCode: true }} />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
      {error && <div>{error}</div>}
      {success && <div>Payment Successful!</div>}
    </form>
  );
};

const Checkout = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default Checkout;