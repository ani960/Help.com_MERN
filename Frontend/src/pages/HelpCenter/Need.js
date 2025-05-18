import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LocationPicker from "../../components/LocationPicker";

const Need = () => {
  const [requestDetails, setRequestDetails] = useState({
    name: "",
    itemNeeded: "",
    quantity: "",
    reason: "",
    phoneNumber: "",
  });

  const [mapLocation, setMapLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const validatePhoneNumber = (number) => /^03\d{9}$/.test(number);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRequestDetails({ ...requestDetails, [name]: value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, itemNeeded, quantity, reason, phoneNumber } = requestDetails;

    if (!name.trim() || !itemNeeded.trim() || !reason.trim()) {
      setError("All fields are required.");
      return;
    }

    if (parseInt(quantity) < 1) {
      setError("Quantity must be at least 1");
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      setError("Phone number must be in the format 03XXXXXXXXX");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/need", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...requestDetails, coordinates: mapLocation }),
      });

      if (!response.ok) throw new Error("Failed to submit request");

      setSubmitted(true);
      setRequestDetails({
        name: "",
        itemNeeded: "",
        quantity: "",
        reason: "",
        phoneNumber: "",
      });
      setMapLocation(null);
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to submit request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
      fontFamily: "'Poppins', sans-serif",
      padding: "20px"
    }}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          background: "rgba(255, 255, 255, 0.9)",
          borderRadius: "20px",
          padding: "40px",
          width: "100%",
          maxWidth: "500px",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255, 255, 255, 0.18)"
        }}
      >
        <h3 style={{
          fontSize: "2.5rem",
          fontWeight: "bold",
          marginBottom: "30px",
          textAlign: "center",
          color: "#4a4a4a"
        }}>
          Request for Help
        </h3>

        <AnimatePresence>
          {!submitted ? (
            <motion.form onSubmit={handleSubmit}>

              {/* Name */}
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={requestDetails.name}
                onChange={handleInputChange}
                required
                style={inputStyle}
              />

              {/* Item Needed */}
              <input
                type="text"
                name="itemNeeded"
                placeholder="Item Needed"
                value={requestDetails.itemNeeded}
                onChange={handleInputChange}
                required
                style={inputStyle}
              />

              {/* Quantity */}
              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={requestDetails.quantity}
                onChange={handleInputChange}
                required
                style={inputStyle}
              />

              {/* Reason */}
              <textarea
                name="reason"
                placeholder="Reason for Request"
                value={requestDetails.reason}
                onChange={handleInputChange}
                required
                style={{ ...inputStyle, height: "80px", resize: "none" }}
              />

              {/* Phone Number */}
              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone Number (e.g. 03XXXXXXXXX)"
                value={requestDetails.phoneNumber}
                onChange={handleInputChange}
                required
                style={inputStyle}
              />

              {/* Location Picker */}
              <label style={{ fontWeight: "bold", display: "block", marginBottom: "8px", marginTop: "20px", color: "#4a4a4a", fontSize: "18px" }}>
                Location (optional):
              </label>
              <LocationPicker location={mapLocation} setLocation={setMapLocation} />

              {/* Submit Button */}
              <motion.button
                type="submit"
                style={{
                  width: "100%",
                  padding: "14px 20px",
                  margin: "20px 0 8px 0",
                  border: "none",
                  borderRadius: "25px",
                  cursor: "pointer",
                  fontSize: "18px",
                  fontWeight: "bold",
                  backgroundColor: loading ? "#aaa" : "#4CAF50",
                  color: "white"
                }}
                disabled={loading}
              >
                {loading ? "Processing..." : "Submit Request"}
              </motion.button>

              {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
            </motion.form>
          ) : (
            <p style={{ color: "#4CAF50", textAlign: "center", fontSize: "18px", fontWeight: "bold" }}>
              Your request has been submitted successfully!
            </p>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

// 🧾 Input styles reused
const inputStyle = {
  width: "100%",
  padding: "12px 16px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "16px",
  outline: "none",
};

export default Need;
