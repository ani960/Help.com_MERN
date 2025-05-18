import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const Volunteer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    expertise: '',
    availability: '',
    additionalInfo: '',
  });

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const filledFields = Object.values(formData).filter(Boolean).length;
    setProgress((filledFields / Object.keys(formData).length) * 100);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/volunteer", formData);
      alert("Thank you for signing up as a volunteer!");
      console.log("Response:", response.data);
      setFormData({
        name: '',
        email: '',
        phone: '',
        location: '',
        expertise: '',
        availability: '',
        additionalInfo: '',
      });
    } catch (error) {
      console.error("Submission error:", error.response?.data || error.message);
      alert("Failed to submit volunteer form. Please try again.");
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 20px',
    margin: '8px 0',
    display: 'inline-block',
    border: '2px solid #e0e0e0',
    borderRadius: '25px',
    boxSizing: 'border-box',
    fontSize: '16px',
    transition: 'all 0.3s ease-in-out',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  };

  const labelStyle = {
    fontWeight: 'bold',
    marginBottom: '8px',
    display: 'block',
    color: '#333',
    fontSize: '18px',
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%)',
      fontFamily: "'Poppins', sans-serif",
      padding: '20px',
    }}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          background: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '30px',
          padding: '40px',
          width: '100%',
          maxWidth: '600px',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
        }}
      >
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{
            textAlign: 'center',
            color: '#ffffff',
            marginBottom: '30px',
            fontSize: '2.8rem',
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          Join Our Volunteer Team
        </motion.h2>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          style={{
            height: '10px',
            backgroundColor: '#4CAF50',
            borderRadius: '20px',
            marginBottom: '30px',
            transition: 'width 0.5s ease-in-out',
          }}
        />

        <form onSubmit={handleSubmit}>
          {Object.entries(formData).map(([key, value], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              style={{ marginBottom: '20px' }}
            >
              <label htmlFor={key} style={labelStyle}>
                <span role="img" aria-label={key}>
                  {key === 'name' ? '👤' :
                    key === 'email' ? '📧' :
                      key === 'phone' ? '📱' :
                        key === 'location' ? '📍' :
                          key === 'expertise' ? '🔧' :
                            key === 'availability' ? '📅' : 'ℹ️'}
                </span> {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
              {key === 'additionalInfo' ? (
                <textarea
                  id={key}
                  name={key}
                  style={{ ...inputStyle, height: '100px', resize: 'vertical' }}
                  placeholder={`Enter your ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                  value={value}
                  onChange={handleChange}
                />
              ) : key === 'availability' ? (
                <input
                  type="date"
                  id={key}
                  name={key}
                  style={inputStyle}
                  value={value}
                  onChange={handleChange}
                />
              ) : (
                <input
                  type={key === 'email' ? 'email' : key === 'phone' ? 'tel' : 'text'}
                  id={key}
                  name={key}
                  style={inputStyle}
                  placeholder={`Enter your ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                  value={value}
                  onChange={handleChange}
                  required={key !== 'expertise' && key !== 'additionalInfo'}
                />
              )}
            </motion.div>
          ))}

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              width: '100%',
              backgroundColor: '#ff6b6b',
              color: 'white',
              padding: '14px 20px',
              margin: '8px 0',
              border: 'none',
              borderRadius: '25px',
              cursor: 'pointer',
              fontSize: '18px',
              fontWeight: 'bold',
              transition: 'all 0.3s ease-in-out',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            Sign Up as Volunteer
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Volunteer;
