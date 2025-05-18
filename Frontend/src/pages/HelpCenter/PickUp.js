import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LocationPicker from "../../components/LocationPicker"; // ✅ Use single point location only

const PickUp = () => {
  const [pickupDetails, setPickupDetails] = useState({
    address: "",
    time: "",
    itemCount: "",
    phoneNumber: "",
  });

  const [pickupLocation, setPickupLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const validatePhoneNumber = (number) => /^03\d{9}$/.test(number);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPickupDetails({ ...pickupDetails, [name]: value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { itemCount, phoneNumber } = pickupDetails;

    if (parseInt(itemCount) < 1) {
      setError("Item count must be at least 1");
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      setError("Phone number must be in the format 03XXXXXXXXX");
      return;
    }

    if (!pickupLocation) {
      setError("Please select a pickup location on the map.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/pickup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...pickupDetails,
          coordinates: pickupLocation, // ✅ only pickup location is sent
        }),
      });

      if (!response.ok) throw new Error("Failed to submit pickup request");

      setSubmitted(true);
      setPickupDetails({
        address: "",
        time: "",
        itemCount: "",
        phoneNumber: "",
      });
      setPickupLocation(null);
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to submit pickup request. Please try again.");
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
        <h3 style={headerStyle}>Schedule a Pickup</h3>
        <AnimatePresence>
          {!submitted ? (
            <motion.form onSubmit={handleSubmit}>
              <input
                type="text"
                name="address"
                placeholder="Pickup Address"
                value={pickupDetails.address}
                onChange={handleInputChange}
                required
                style={inputStyle}
              />
              <input
                type="text"
                name="time"
                placeholder="Preferred Time"
                value={pickupDetails.time}
                onChange={handleInputChange}
                required
                style={inputStyle}
              />
              <input
                type="number"
                name="itemCount"
                placeholder="Number of Items"
                value={pickupDetails.itemCount}
                onChange={handleInputChange}
                required
                style={inputStyle}
              />
              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone Number (03XXXXXXXXX)"
                value={pickupDetails.phoneNumber}
                onChange={handleInputChange}
                required
                style={inputStyle}
              />

              <label style={labelStyle}>Pickup Location (click on map):</label>
              <LocationPicker
                location={pickupLocation}
                setLocation={setPickupLocation}
              />

              <motion.button
                type="submit"
                style={buttonStyle}
                disabled={loading}
              >
                {loading ? "Processing..." : "Schedule Pickup"}
              </motion.button>

              {error && (
                <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
              )}
            </motion.form>
          ) : (
            <p style={successStyle}>
              Your pickup request has been scheduled successfully!
            </p>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

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

export default PickUp;
