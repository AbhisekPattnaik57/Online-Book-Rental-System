import React, { useState } from 'react';
import API from './api';

const PaymentForm = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [message, setMessage] = useState('');

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/payment', { cardNumber, expiry, cvv });
      setMessage(response.data);
    } catch (error) {
      setMessage('❌ Payment failed!');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handlePayment}>
      <h2>Payment</h2>
      <input
        type="text"
        placeholder="Card Number"
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
        required
      /><br />
      <input
        type="text"
        placeholder="Expiry Date (MM/YY)"
        value={expiry}
        onChange={(e) => setExpiry(e.target.value)}
        required
      /><br />
      <input
        type="text"
        placeholder="CVV"
        value={cvv}
        onChange={(e) => setCvv(e.target.value)}
        required
      /><br />
      <button type="submit">💳 Pay Now</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default PaymentForm;
