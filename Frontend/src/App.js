import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import DonateItem from './pages/DonateUs/DonateItem';
import DonateMoney from './pages/DonateUs/DonateMoney';
import Volunteer from './pages/Volunteer'; // ✅ Corrected import
import AboutUs from './pages/AboutUs';
import SuccessStories from './pages/SuccessStories';
import ContactUs from './pages/ContactUs';
import Drop from './pages/HelpCenter/Drop';
import PickUp from './pages/HelpCenter/PickUp';
import Need from './pages/HelpCenter/Need';
import Checkout from './pages/Checkout';
import BecomeADonor from './pages/BecomeADonor';
import ChatBotPopup from './components/ChatBotPopup';

const stripePromise = loadStripe('pk_test_your_publishable_key'); // Replace with your actual key

function App() {
  return (
    <Elements stripe={stripePromise}>
      <Router>
        <Navbar />
        <div className="container mt-5">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/pages/DonateUs/DonateMoney" element={<DonateMoney />} />
            <Route path="/pages/DonateUs/DonateItem" element={<DonateItem />} />
            <Route path="/pages/HelpCenter/Drop" element={<Drop />} />
            <Route path="/pages/HelpCenter/PickUp" element={<PickUp />} />
            <Route path="/pages/HelpCenter/Need" element={<Need />} />
            <Route path="/pages/Volunteer" element={<Volunteer />} /> {/* ✅ Correct route */}
            <Route path="/pages/AboutUs" element={<AboutUs />} />
            <Route path="/pages/SuccessStories" element={<SuccessStories />} />
            <Route path="/pages/ContactUs" element={<ContactUs />} />
            <Route path="/pages/BecomeADonor" element={<BecomeADonor />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </div>
        <Footer />
        <ChatBotPopup />
      </Router>
    </Elements>
  );
}

export default App;
