import React, { useState } from 'react';
import './DonateItem.css';

export default function DonateItem() {
  const [formData, setFormData] = useState({
    donorName: '',
    email: '',
    itemType: '',
    itemCondition: '',
    quantity: '',
    location: '',
    additionalInfo: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/donate-item`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to submit donation');
      }

      const data = await response.json();
      console.log('Item Donation Success:', data);
      setMessage('Thank you for your donation! We will arrange pickup soon.');

      setFormData({
        donorName: '',
        email: '',
        itemType: '',
        itemCondition: '',
        quantity: '',
        location: '',
        additionalInfo: '',
      });
    } catch (error) {
      console.error('Error:', error);
      setMessage('Failed to submit donation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="donate-item-container">
      <form onSubmit={handleSubmit} className="donate-item-form">
        <h2 className="donate-item-title">
          <span role="img" aria-label="Gift">🎁</span> Donate an Item
        </h2>

        <div className="donate-item-input-group">
          <label htmlFor="donorName" className="donate-item-label">
            <span role="img" aria-label="Person">👤</span> Name:
          </label>
          <input
            type="text"
            id="donorName"
            name="donorName"
            className="donate-item-input"
            value={formData.donorName}
            onChange={handleChange}
            required
            placeholder="Enter your name"
          />
        </div>

        <div className="donate-item-input-group">
          <label htmlFor="email" className="donate-item-label">
            <span role="img" aria-label="Email">📧</span> Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="donate-item-input"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
          />
        </div>

        <div className="donate-item-input-group">
          <label htmlFor="itemType" className="donate-item-label">
            <span role="img" aria-label="Box">📦</span> Item Type:
          </label>
          <select
            id="itemType"
            name="itemType"
            className="donate-item-select"
            value={formData.itemType}
            onChange={handleChange}
            required
          >
            <option value="">Select an item type</option>
            <option value="Clothes">Clothes</option>
            <option value="Food">Food</option>
            <option value="Medical Supplies">Medical Supplies</option>
            <option value="Toys">Toys</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="donate-item-input-group">
          <label htmlFor="itemCondition" className="donate-item-label">
            <span role="img" aria-label="Sparkles">✨</span> Condition:
          </label>
          <select
            id="itemCondition"
            name="itemCondition"
            className="donate-item-select"
            value={formData.itemCondition}
            onChange={handleChange}
            required
          >
            <option value="">Select condition</option>
            <option value="New">New</option>
            <option value="Gently Used">Gently Used</option>
            <option value="Worn">Worn</option>
          </select>
        </div>

        <div className="donate-item-input-group">
          <label htmlFor="quantity" className="donate-item-label">
            <span role="img" aria-label="1234">🔢</span> Quantity:
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            className="donate-item-input"
            value={formData.quantity}
            onChange={handleChange}
            min="1"
            required
            placeholder="Enter quantity"
          />
        </div>

        <div className="donate-item-input-group">
          <label htmlFor="location" className="donate-item-label">
            <span role="img" aria-label="Pin">📍</span> Pickup Location:
          </label>
          <input
            type="text"
            id="location"
            name="location"
            className="donate-item-input"
            value={formData.location}
            onChange={handleChange}
            required
            placeholder="Enter pickup location"
          />
        </div>

        <div className="donate-item-input-group">
          <label htmlFor="additionalInfo" className="donate-item-label">
            <span role="img" aria-label="Memo">📝</span> Additional Information:
          </label>
          <textarea
            id="additionalInfo"
            name="additionalInfo"
            className="donate-item-textarea"
            value={formData.additionalInfo}
            onChange={handleChange}
            placeholder="Any additional details about your donation"
          />
        </div>

        <button type="submit" className="donate-item-button" disabled={loading}>
          {loading ? 'Processing...' : '🤝 Submit Donation'}
        </button>

        {message && <p className="donate-item-message">{message}</p>}
      </form>
    </div>
  );
}
