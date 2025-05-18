import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

// Importing images from assets folder
import R1 from '../Assests/R1.jpg';
import R2 from '../Assests/R2.jpg';
import R3 from '../Assests/R3.jpg';

export default function SuccessStories() {
  const fadeInUp = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }
  };

  return (
    <div className="success-stories-container">
      <motion.div 
        className="header-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <h1 className="main-title">Success Stories</h1>
        <p className="subtitle">We believe in the power of community. Here are some heartwarming success stories of how Help.com has made a difference.</p>
      </motion.div>

      <div className="stories-grid">
        <motion.div className="story-card" {...fadeInUp}>
          <div className="card-content">
            <h3>Empowering Women and Children</h3>
            <div className="image-wrapper">
              <img src={R1} alt="Sara's Story" />
            </div>
            <p>
              In a remote village, women and children faced numerous challenges. 
              During a community event, an inspiring facilitator shared valuable 
              knowledge about health, education, and self-empowerment.
            </p>
            <motion.button 
              className="read-more-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Read More
            </motion.button>
          </div>
        </motion.div>

        <motion.div className="story-card" {...fadeInUp} transition={{ delay: 0.2 }}>
          <div className="card-content">
            <h3>Volunteering for the Elderly</h3>
            <div className="image-wrapper">
              <img src={R2} alt="Elderly Support" />
            </div>
            <p>
              Help.com volunteers organized events to assist elderly people with 
              household tasks and grocery shopping, providing both physical help 
              and companionship.
            </p>
            <motion.button 
              className="read-more-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Read More
            </motion.button>
          </div>
        </motion.div>

        <motion.div className="story-card" {...fadeInUp} transition={{ delay: 0.4 }}>
          <div className="card-content">
            <h3>Food Supplies for the Needy</h3>
            <div className="image-wrapper">
              <img src={R3} alt="Food Supplies Donation" />
            </div>
            <p>
              With the help of generous donors, Help.com collected and distributed 
              food supplies to communities in need, demonstrating the impact of 
              collective action.
            </p>
            <motion.button 
              className="read-more-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Read More
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Added "Become a Volunteer or Donor" Button here */}
      <motion.div 
        className="cta-section"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <h2>Want to Make a Difference?</h2>
        <p>
          Every contribution counts. Join us in our mission to help those in need and create a positive impact in the community.
        </p>
        
        {/* Button to navigate to Become a Donor Page */}
        <Link to="/pages/BecomeADonor">
          <motion.button
            className="cta-button"
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgb(255,255,255)" }}
            whileTap={{ scale: 0.95 }}
          >
            Become a Volunteer or Donor
          </motion.button>
        </Link>
      </motion.div>

      <style jsx>{`
        .success-stories-container {
          padding: 60px 40px;
          font-family: 'Poppins', sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: #fff;
          min-height: 100vh;
        }

        .header-section {
          text-align: center;
          margin-bottom: 60px;
        }

        .main-title {
          font-size: 3.5rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 20px;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }

        .subtitle {
          font-size: 1.2rem;
          max-width: 800px;
          margin: 0 auto;
          line-height: 1.6;
          color: rgba(255,255,255,0.9);
        }

        .stories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 40px;
          margin-top: 40px;
        }

        .story-card {
          background: rgba(255,255,255,0.1);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .story-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }

        .card-content {
          padding: 30px;
        }

        .story-card h3 {
          font-size: 1.8rem;
          color: #fff;
          margin-bottom: 20px;
          font-weight: 600;
        }

        .image-wrapper {
          margin-bottom: 20px;
          overflow: hidden;
          border-radius: 15px;
        }

        .image-wrapper img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .story-card:hover .image-wrapper img {
          transform: scale(1.1);
        }

        .story-card p {
          color: rgba(255,255,255,0.8);
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .read-more-btn {
          background-color: rgba(255,255,255,0.2);
          color: #fff;
          border: none;
          padding: 10px 20px;
          border-radius: 25px;
          cursor: pointer;
          font-size: 0.9rem;
          transition: background-color 0.3s ease;
        }

        .read-more-btn:hover {
          background-color: rgba(255,255,255,0.3);
        }

        .cta-section {
          text-align: center;
          padding: 60px;
          margin-top: 80px;
          background: rgba(255,255,255,0.1);
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }

        .cta-section h2 {
          font-size: 2.5rem;
          color: #fff;
          margin-bottom: 20px;
          font-weight: 700;
        }

        .cta-section p {
          color: rgba(255,255,255,0.9);
          margin-bottom: 30px;
          font-size: 1.1rem;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }

        .cta-button {
          background-color: #fff;
          color: #764ba2;
          border: none;
          padding: 15px 30px;
          border-radius: 30px;
          cursor: pointer;
          font-size: 1.1rem;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .cta-button:hover {
          background-color: #f0f0f0;
          color: #667eea;
        }

        @media (max-width: 768px) {
          .success-stories-container {
            padding: 40px 20px;
          }

          .main-title {
            font-size: 2.5rem;
          }

          .subtitle {
            font-size: 1rem;
          }

          .stories-grid {
            grid-template-columns: 1fr;
          }

          .cta-section {
            padding: 40px 20px;
          }

          .cta-section h2 {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
}
