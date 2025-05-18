import React from 'react';
import { motion } from 'framer-motion';
import { Users, Heart, Clock, ArrowRight, ChevronDown } from 'lucide-react';

// Importing images
import image1 from '../Assests/image1.jpg';
import image2 from '../Assests/image2.jpg';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.6, -0.05, 0.01, 0.99] }
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function AboutUs() {
  return (
    <div className="about-us-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <motion.h1 
            className="hero-title"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            About HELP Foundation
          </motion.h1>
          <motion.p 
            className="hero-subtitle"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.2 }}
          >
            Empowering Lives, Spreading Happiness
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="scroll-indicator"
          >
            <ChevronDown size={24} />
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <motion.section 
        className="mission-section"
        variants={staggerChildren}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="container">
          <motion.h2 variants={fadeInUp}>Our Mission</motion.h2>
          <motion.p variants={fadeInUp} className="lead">
            Our mission is to create a better world by helping underprivileged communities with immediate aid,
            long-term support, and hope for a brighter future.
          </motion.p>
        </div>
      </motion.section>

      {/* History Section */}
      <motion.section 
        className="history-section"
        variants={staggerChildren}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="container grid">
          <motion.div variants={fadeInUp} className="text-content">
            <h3>Our Story</h3>
            <p>
              HELP Foundation started from a small camp in Umerkot Sindh Tharparker , aiming to support flood disaster victims.
              Over time, we expanded into a full-fledged infrastructure, providing liberation and rescue management
              across the province. Guided by our core values of compassion and resilience, we continue to serve
              communities in need.
            </p>
          </motion.div>
          <motion.div 
            variants={fadeInUp}
            className="image-wrapper"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <img src={image1} alt="HELP Foundation Camp" className="image" />
          </motion.div>
        </div>
      </motion.section>

      {/* Statistics Section */}
      <motion.section 
        className="stats-section"
        variants={staggerChildren}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="container">
          <motion.h2 variants={fadeInUp}>What We've Achieved</motion.h2>
          <div className="stats-grid">
            <motion.div variants={fadeInUp} className="stat-item">
              <Users size={32} />
              <motion.h3
                initial={{ scale: 0.5 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                50+
              </motion.h3>
              <p>Relief Camps Established</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="stat-item">
              <Heart size={32} />
              <motion.h3
                initial={{ scale: 0.5 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                50K+
              </motion.h3>
              <p>Families Helped</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="stat-item">
              <Clock size={32} />
              <motion.h3
                initial={{ scale: 0.5 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                10+ Years
              </motion.h3>
              <p>Of Dedicated Service</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Volunteers Section */}
      <motion.section 
        className="volunteers-section"
        variants={staggerChildren}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="container grid">
          <motion.div 
            variants={fadeInUp}
            className="image-wrapper"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <img src={image2} alt="HELP Volunteers" className="image" />
          </motion.div>
          <motion.div variants={fadeInUp} className="text-content">
            <h3>Join Our Volunteers</h3>
            <p>
              Be part of our volunteer team to bring change to the lives of those in need. Together, we can
              make a difference. Whether it's distributing aid, organizing events, or providing care, there's
              a role for everyone.
            </p>
            <motion.a 
              href="/pages/Volunteers" 
              className="button"
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgba(0,0,0,0.1)" }}
              whileTap={{ scale: 0.95 }}
            >
              Become a Volunteer <ArrowRight size={16} />
            </motion.a>
          </motion.div>
        </div>
      </motion.section>

      {/* Call to Action Section */}
      <motion.section 
  className="cta-section"
  variants={staggerChildren}
  initial="initial"
  whileInView="animate"
  viewport={{ once: true, amount: 0.3 }}
>
  <div className="container">
    <motion.h2 variants={fadeInUp} className="cta-title">Help Us Make a Difference</motion.h2>
    <motion.p variants={fadeInUp} className="cta-description">
      Your contributions can create a meaningful impact. Join us in spreading hope and happiness.
    </motion.p>
    <motion.div variants={fadeInUp} className="cta-buttons">
      <motion.a 
        href="/pages/DonateUs/DonateMoney" 
        className="cta-button cta-button-primary"
        whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(255,255,255,0.3)" }}
        whileTap={{ scale: 0.95 }}
      >
        Donate Money
      </motion.a>
      <motion.a 
        href="/pages/DonateUs/DonateItem" 
        className="cta-button cta-button-secondary"
        whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(255,255,255,0.3)" }}
        whileTap={{ scale: 0.95 }}
      >
        Donate Items
      </motion.a>
    </motion.div>
  </div>
</motion.section>

      <style jsx>{`
        .about-us-container {
          font-family: 'Inter', sans-serif;
          color: #333;
          line-height: 1.6;
          overflow-x: hidden;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .hero-section {
          background: linear-gradient(135deg, #4a90e2 0%, #63b3ed 100%);
          color: white;
          text-align: center;
          padding: 80px 0 60px;
          position: relative;
        }

        .hero-title {
          font-size: clamp(2rem, 5vw, 3rem);
          margin-bottom: 15px;
          font-weight: 700;
          letter-spacing: -1px;
        }

        .hero-subtitle {
          font-size: clamp(1rem, 2vw, 1.2rem);
          max-width: 600px;
          margin: 0 auto;
          opacity: 0.9;
        }

        .scroll-indicator {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0) translateX(-50%);
          }
          40% {
            transform: translateY(-20px) translateX(-50%);
          }
          60% {
            transform: translateY(-10px) translateX(-50%);
          }
        }

        .mission-section {
          background-color: #f8f9fa;
          padding: 60px 0;
          text-align: center;
        }

        .mission-section h2 {
          font-size: clamp(1.8rem, 4vw, 2.5rem);
          margin-bottom: 20px;
          color: #4a90e2;
          font-weight: 700;
        }

        .lead {
          font-size: clamp(1rem, 2vw, 1.1rem);
          max-width: 800px;
          margin: 0 auto;
          color: #555;
        }

        .history-section, .volunteers-section {
          padding: 60px 0;
        }

        .grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: center;
        }

        .text-content h3 {
          font-size: clamp(1.5rem, 3vw, 2rem);
          margin-bottom: 15px;
          color: #4a90e2;
          font-weight: 700;
        }

        .text-content p {
          font-size: clamp(0.9rem, 2vw, 1rem);
          color: #555;
        }

        .image-wrapper {
          position: relative;
          width: 100%;
          height: 300px;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }

        .image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .image-wrapper:hover .image {
          transform: scale(1.05);
        }

        .stats-section {
          background: linear-gradient(135deg, #4a90e2 0%, #63b3ed 100%);
          color: white;
          padding: 60px 0;
          text-align: center;
        }

        .stats-section h2 {
          font-size: clamp(1.8rem, 4vw, 2.5rem);
          margin-bottom: 40px;
          font-weight: 700;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 30px;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .stat-item h3 {
          font-size: clamp(2rem, 4vw, 2.5rem);
          margin: 15px 0 5px;
          font-weight: 700;
        }

        .stat-item p {
          font-size: clamp(0.9rem, 2vw, 1rem);
          opacity: 0.9;
        }

        .button {
          display: inline-flex;
          align-items: center;
          padding: 10px 20px;
          background-color: #4a90e2;
          color: white;
          text-decoration: none;
          border-radius: 5px;
          font-weight: 600;
          font-size: 1rem;
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }

        .button:hover {
          background-color: #3a7bc8;
          transform: translateY(-2px);
        }

        .button-light {
          background-color: white;
          color: #4a90e2;
        }

        .button-light:hover {
          background-color: #f0f0f0;
          color: #3a7bc8;
        }

        .button-group {
          display: flex;
          gap: 15px;
          justify-content: center;
          margin-top: 30px;
        }

        .cta-section {
          background: linear-gradient(135deg, #4a90e2 0%, #357abd 100%);
          color: white;
          padding: 80px 0;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .cta-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('/placeholder.svg?height=400&width=800') center/cover no-repeat;
          opacity: 0.1;
          z-index: 0;
        }

        .cta-section .container {
          position: relative;
          z-index: 1;
          max-width: 800px;
          padding: 40px 20px;
        }

        .cta-title {
          font-size: clamp(1.8rem, 4vw, 2.5rem);
          margin-bottom: 15px;
          font-weight: 800;
          letter-spacing: -1px;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
        }

        .cta-description {
          font-size: clamp(0.9rem, 2vw, 1.1rem);
          max-width: 600px;
          margin: 0 auto 30px;
          line-height: 1.5;
          opacity: 0.9;
        }

        .cta-buttons {
          display: flex;
          gap: 15px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .cta-button {
          padding: 10px 25px;
          font-size: 0.9rem;
          min-width: 150px;
          border-radius: 50px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .cta-button-primary {
          background-color: #ffffff;
          color: #4a90e2;
          border: 2px solid #ffffff;
        }

        .cta-button-primary:hover {
          background-color: transparent;
          color: #ffffff;
        }

        .cta-button-secondary {
          background-color: transparent;
          color: #ffffff;
          border: 2px solid #ffffff;
        }

        .cta-button-secondary:hover {
          background-color: #ffffff;
          color: #4a90e2;
        }

        @media (max-width: 768px) {
          .cta-section {
            padding: 60px 0;
          }

          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }

          .cta-button {
            width: 100%;
            max-width: 250px;
          }
        }
        @media (max-width: 768px) {
          .grid {
            grid-template-columns: 1fr;
          }

          .image-wrapper {
            height: 250px;
            margin-bottom: 20px;
          }

          .button-group {
            flex-direction: column;
            align-items: center;
          }

          .button {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}
