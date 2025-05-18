import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import ContactUsImage from '../Assests/ContactUs.jpg'; // Corrected the image path

export default function ContactUs() {
  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif', backgroundColor: '#faf9f9' }}>
      {/* Header Section */}
      <h1 style={{ textAlign: 'center', color: '#333', fontSize: '36px', fontWeight: 'bold' }}>Contact Us</h1>
      <div style={{ textAlign: 'center', marginBottom: '30px', color: '#666', fontSize: '18px' }}>
        <p>
          Have a question, suggestion, or want to get involved? We're here to help! Reach out to us using the
          information below or use the form to get in touch with us directly.
        </p>
      </div>

      {/* Contact Information Section */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginTop: '40px' }}>
        {/* Address Section */}
        <div
          style={{
            textAlign: 'center',
            padding: '20px',
            border: '1px solid #ddd',
            borderRadius: '12px',
            backgroundColor: '#fff',
            width: '30%',
            boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          <h3 style={{ color: '#6A1B9A', fontSize: '20px' }}>Our Address</h3>
          <p style={{ color: '#777' }}>S-PMT-04, PHASE-2 Area, Baba Biryani Gulshan-e-Hadeed Town, Karachi</p>
        </div>

        {/* Contact Section */}
        <div
          style={{
            textAlign: 'center',
            padding: '20px',
            border: '1px solid #ddd',
            borderRadius: '12px',
            backgroundColor: '#fff',
            width: '30%',
            boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          <h3 style={{ color: '#6A1B9A', fontSize: '20px' }}>Contact</h3>
          <p style={{ color: '#777' }}>Phone: (+92) 3409450362</p>
          <p style={{ color: '#777' }}>Email: info@help.org</p>
        </div>

        {/* Email Section */}
        <div
          style={{
            textAlign: 'center',
            padding: '20px',
            border: '1px solid #ddd',
            borderRadius: '12px',
            backgroundColor: '#fff',
            width: '30%',
            boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          <h3 style={{ color: '#6A1B9A', fontSize: '20px' }}>Email Us</h3>
          <p style={{ color: '#777' }}>Get in touch with us anytime. We respond within 24 hours!</p>
          <button
            style={{
              padding: '12px 24px',
              backgroundColor: '#6A1B9A',
              color: '#fff',
              border: 'none',
              borderRadius: '20px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#9c4a98'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#6A1B9A'}
          >
            Contact Support
          </button>
        </div>
      </div>

      {/* Volunteer/Feedback Section */}
      <div
        style={{
          marginTop: '60px',
          textAlign: 'center',
          padding: '20px',
          backgroundColor: '#fff',
          boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
          borderRadius: '12px',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        }}
        onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
      >
        <h2 style={{ color: '#333', marginBottom: '20px', fontSize: '24px' }}>Want to Become a Volunteer or Share Feedback?</h2>
        <p style={{ color: '#666', marginBottom: '20px', fontSize: '18px' }}>
          We value your participation in making Help.com a success. Whether you're interested in volunteering or providing feedback, let us know!
        </p>

        {/* Link to Become a Volunteer page */}
        <Link to="/pages/Volunteers">
          <button
            style={{
              padding: '12px 24px',
              backgroundColor: '#6A1B9A',
              color: '#fff',
              border: 'none',
              borderRadius: '20px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#9c4a98'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#6A1B9A'}
          >
            Become a Volunteer
          </button>
        </Link>
      </div>

      {/* Image Section */}
      <div
        style={{
          marginTop: '40px',
          textAlign: 'center',
        }}
      >
        <h2 style={{ color: '#333', marginBottom: '20px', fontSize: '24px' }}>Our Community in Action</h2>
        <img
          src={ContactUsImage}
          alt="Community Action"
          style={{
            width: '80%',
            maxWidth: '600px',
            borderRadius: '15px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
            transition: 'transform 0.3s ease',
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        />
      </div>
    </div>
  );
}
