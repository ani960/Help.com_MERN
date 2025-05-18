import React, { useState } from 'react';
import './DonateMoney.css';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
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
  const stripe = useStripe();
  const elements = useElements();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (!formData.email || !formData.donationAmount || formData.donationAmount <= 0) {
      setMessage('Please provide valid inputs.');
      setLoading(false);
      return;
    }

    if (formData.paymentMethod === 'Credit Card') {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/payment`, {
          amount: formData.donationAmount,
          email: formData.email,
        });

        const { clientSecret } = response.data;

        const cardElement = elements.getElement(CardElement);

        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
            billing_details: { email: formData.email },
          },
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
          <label htmlFor="donorName" className="donate-money-label">👤 Full Name</label>
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
          <label htmlFor="email" className="donate-money-label">📧 Email</label>
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
          <label htmlFor="donationAmount" className="donate-money-label">💰 Donation Amount (PKR)</label>
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
          <label htmlFor="paymentMethod" className="donate-money-label">💳 Payment Method</label>
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

        {formData.paymentMethod === 'Credit Card' && (
          <div className="donate-money-input-group">
            <label htmlFor="creditCard" className="donate-money-label">💳 Credit Card Details</label>
            <CardElement />
          </div>
        )}

        <div className="donate-money-input-group">
          <label htmlFor="additionalInfo" className="donate-money-label">📝 Additional Information (Optional)</label>
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
