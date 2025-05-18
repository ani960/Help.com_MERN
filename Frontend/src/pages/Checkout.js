import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';  // For Stripe Elements
import axios from 'axios';

const Checkout = () => {
  const stripe = useStripe();
  const elements = useElements();  // Stripe Elements hook

  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Function to handle payment
  const handlePayment = async () => {
    setIsProcessing(true);
    setErrorMessage('');
    setSuccessMessage('');

    // Step 1: Validate input
    if (!email || !amount || amount <= 0) {
      setErrorMessage('Please provide a valid email and amount greater than 0.');
      setIsProcessing(false);
      return;
    }

    // Step 2: Call backend to create payment intent
    try {
      const response = await axios.post('http://localhost:5000/api/payment', {
        amount: amount,
        email: email,
      });

      // Step 3: Get client secret from backend
      const { clientSecret } = response.data;

      // Step 4: Confirm payment with Stripe
      const { error } = await stripe.confirmCardPayment(clientSecret, {
        type: 'Card',
        billingDetails: { email },
      });

      if (error) {
        setErrorMessage(error.message);  // Display any error
      } else {
        setSuccessMessage('Payment successful!');  // Display success message
      }
    } catch (error) {
      setErrorMessage('Payment failed, please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      
      {/* Email Input */}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      
      {/* Amount Input */}
      <input
        type="number"
        placeholder="Amount (USD)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      {/* Stripe Card Input */}
      <CardElement /> {/* Stripe's card input component */}

      {/* Payment Button */}
      <button
        onClick={handlePayment}
        disabled={isProcessing}
      >
        {isProcessing ? 'Processing...' : 'Pay Now'}
      </button>

      {/* Display Error Messages */}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      {/* Display Success Message */}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
};

export default Checkout;
