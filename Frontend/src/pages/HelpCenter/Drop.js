import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LocationPicker from "../../components/LocationPicker";

const Drop = () => {
  const [donationDetails, setDonationDetails] = useState({
    category: "",
    quantity: "",
    condition: "",
    location: "",
    phoneNumber: "",
  });

  const [mapLocation, setMapLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const categories = ["Clothes", "Food", "Medical Supplies", "Other"];
  const validatePhoneNumber = (number) => /^03\d{9}$/.test(number);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDonationDetails({ ...donationDetails, [name]: value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { quantity, phoneNumber } = donationDetails;

    if (parseInt(quantity) < 1) {
      setError("Quantity must be at least 1");
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      setError("Phone number must be in the format 03XXXXXXXXX");
      return;
    }

    if (!mapLocation) {
      setError("Please select a drop-off location on the map.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/drop`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...donationDetails,
          location: "Selected via map",
          coordinates: mapLocation,
        }),
      });

      if (!response.ok) throw new Error("Failed to submit donation");

      setSubmitted(true);
      setDonationDetails({
        category: "",
        quantity: "",
        condition: "",
        location: "",
        phoneNumber: "",
      });
      setMapLocation(null);
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to submit donation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={formCardStyle}
      >
        <h3 style={headerStyle}>Post a Donation</h3>
        <AnimatePresence>
          {!submitted ? (
            <motion.form onSubmit={handleSubmit}>
              <select
                name="category"
                value={donationDetails.category}
                onChange={handleInputChange}
                required
                style={inputStyle}
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={donationDetails.quantity}
                onChange={handleInputChange}
                required
                style={inputStyle}
              />

              <input
                type="text"
                name="condition"
                placeholder="Condition"
                value={donationDetails.condition}
                onChange={handleInputChange}
                required
                style={inputStyle}
              />

              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone Number (03XXXXXXXXX)"
                value={donationDetails.phoneNumber}
                onChange={handleInputChange}
                required
                style={inputStyle}
              />

              <label style={labelStyle}>Drop-off Location (Click on map):</label>
              <LocationPicker location={mapLocation} setLocation={setMapLocation} />

              <motion.button type="submit" style={buttonStyle} disabled={loading}>
                {loading ? "Processing..." : "Post Donation"}
              </motion.button>

              {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
            </motion.form>
          ) : (
            <p style={successStyle}>Donation successfully submitted!</p>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

// Styles
const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
  fontFamily: "'Poppins', sans-serif",
  padding: "20px",
};

const formCardStyle = {
  background: "rgba(255, 255, 255, 0.9)",
  borderRadius: "20px",
  padding: "40px",
  width: "100%",
  maxWidth: "500px",
  boxShadow: "0 8px 32px rgba(31,38,135,0.37)",
  backdropFilter: "blur(8px)",
  border: "1px solid rgba(255,255,255,0.18)",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "16px",
};

const buttonStyle = {
  width: "100%",
  padding: "14px",
  marginTop: "20px",
  border: "none",
  borderRadius: "25px",
  fontSize: "18px",
  fontWeight: "bold",
  backgroundColor: "#4CAF50",
  color: "white",
  cursor: "pointer",
};

const labelStyle = {
  fontWeight: "bold",
  display: "block",
  marginBottom: "8px",
  marginTop: "16px",
  color: "#4a4a4a",
  fontSize: "18px",
};

const headerStyle = {
  fontSize: "2.5rem",
  fontWeight: "bold",
  marginBottom: "30px",
  textAlign: "center",
  color: "#4a4a4a",
};

const successStyle = {
  color: "#4CAF50",
  textAlign: "center",
  fontSize: "18px",
  fontWeight: "bold",
};

export default Drop;
