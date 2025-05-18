import React, { useState } from 'react';
import './DonateMoney.css';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'; // Import Stripe Elements
import axios from 'axios';

export default function DonateMoney() {
  const [formData, setFormData] = useState({
    donorName: '',
    email: '',
    donationAmount: '',
    paymentMethod: '',
    additionalInfo: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const stripe = useStripe();  // Stripe hooks
  const elements = useElements();  // Stripe Elements

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    // Validation
    if (!formData.email || !formData.donationAmount || formData.donationAmount <= 0) {
      setMessage('Please provide valid inputs.');
      setLoading(false);
      return;
    }

    // If the payment method is 'Credit Card', process the payment via Stripe
    if (formData.paymentMethod === 'Credit Card') {
      try {
        // Step 1: Call the backend to create a payment intent
        const response = await axios.post('http://localhost:5000/api/payment', {
          amount: formData.donationAmount,
          email: formData.email,
        });

        const { clientSecret } = response.data; // Get clientSecret

        // Step 2: Confirm the payment with Stripe
        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
          type: 'Card',
          billingDetails: { email: formData.email },
        });

        if (error) {
          setMessage('Payment failed: ' + error.message);
        } else if (paymentIntent.status === 'succeeded') {
          setMessage('Thank you for your generous donation!');
        }

      } catch (error) {
        setMessage('Failed to submit donation. Please try again.');
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="donate-money-container">
      <form onSubmit={handleSubmit} className="donate-money-form">
        <h2 className="donate-money-title">
          <span role="img" aria-label="Heart">❤️</span> Donate Money
        </h2>

        <div className="donate-money-input-group">
          <label htmlFor="donorName" className="donate-money-label">
            <span role="img" aria-label="Person">👤</span> Full Name
          </label>
          <input
            type="text"
            id="donorName"
            name="donorName"
            value={formData.donorName}
            onChange={handleChange}
            required
            className="donate-money-input"
            placeholder="Enter your name"
          />
        </div>

        <div className="donate-money-input-group">
          <label htmlFor="email" className="donate-money-label">
            <span role="img" aria-label="Email">📧</span> Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="donate-money-input"
            placeholder="example@example.com"
          />
        </div>

        <div className="donate-money-input-group">
          <label htmlFor="donationAmount" className="donate-money-label">
            <span role="img" aria-label="Money">💰</span> Donation Amount (PKR)
          </label>
          <input
            type="number"
            id="donationAmount"
            name="donationAmount"
            value={formData.donationAmount}
            onChange={handleChange}
            required
            min="1"
            className="donate-money-input"
            placeholder="Enter amount"
          />
        </div>

        <div className="donate-money-input-group">
          <label htmlFor="paymentMethod" className="donate-money-label">
            <span role="img" aria-label="Credit Card">💳</span> Payment Method
          </label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            required
            className="donate-money-select"
          >
            <option value="">Choose a payment method</option>
            <option value="Credit Card">Credit Card</option>
            <option value="JazzCash">JazzCash</option>
            <option value="Bank Transfer">Bank Transfer</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Stripe's Card Element */}
        {formData.paymentMethod === 'Credit Card' && (
          <div className="donate-money-input-group">
            <label htmlFor="creditCard" className="donate-money-label">
              <span role="img" aria-label="Card">💳</span> Credit Card Details
            </label>
            <CardElement />
          </div>
        )}

        <div className="donate-money-input-group">
          <label htmlFor="additionalInfo" className="donate-money-label">
            <span role="img" aria-label="Memo">📝</span> Additional Information (Optional)
          </label>
          <textarea
            id="additionalInfo"
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleChange}
            className="donate-money-textarea"
            placeholder="Share any message with us"
          />
        </div>

        <button type="submit" className="donate-money-button" disabled={loading}>
          {loading ? 'Processing...' : '✨ Submit Donation'}
        </button>

        {message && <p className="donate-money-message">{message}</p>}
      </form>
    </div>
  );
}
