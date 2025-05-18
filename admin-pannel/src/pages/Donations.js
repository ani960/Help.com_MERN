import React, { useEffect, useState } from "react";
import axios from "axios";

const Donations = () => {
  const [donations, setDonations] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    const fetchDonations = () => {
      const url = filterStatus
        ? `http://localhost:5000/api/admin/donations?status=${filterStatus}`
        : `http://localhost:5000/api/admin/donations`;

      axios
        .get(url)
        .then((response) => setDonations(response.data))
        .catch((error) => console.error("Error fetching donations:", error));
    };

    fetchDonations();
  }, [filterStatus]);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/donations/${id}`, { status });

      const url = filterStatus
        ? `http://localhost:5000/api/admin/donations?status=${filterStatus}`
        : `http://localhost:5000/api/admin/donations`;

      const response = await axios.get(url);
      setDonations(response.data);
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const renderDonationCard = (donation) => {
    const type =
      donation.type ||
      (donation.amount
        ? "Money"
        : donation.itemType
        ? "Item"
        : donation.category
        ? "Drop"
        : "Unknown");

    return (
      <div key={donation._id} style={cardStyle}>
        <h3 style={{ marginBottom: "10px" }}>{type} Donation</h3>
        <p><strong>Donor:</strong> {donation.donorName || donation.phoneNumber || "N/A"}</p>
        {donation.amount && <p><strong>Amount:</strong> Rs. {donation.amount}</p>}
        {donation.itemType && <p><strong>Item Type:</strong> {donation.itemType}</p>}
        {donation.quantity && <p><strong>Quantity:</strong> {donation.quantity}</p>}
        {donation.condition && <p><strong>Condition:</strong> {donation.condition}</p>}
        {donation.location && <p><strong>Location:</strong> {donation.location}</p>}

        <label>Status: </label>
        <select
          value={donation.status}
          onChange={(e) => updateStatus(donation._id, e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="assigned">Assigned</option>
          <option value="completed">Completed</option>
        </select>
      </div>
    );
  };

  return (
    <div style={pageStyle}>
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>All Donations</h2>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <label>Filter by Status: </label>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="assigned">Assigned</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        {donations.length === 0 ? (
          <p style={{ textAlign: "center" }}>No donations available</p>
        ) : (
          donations.map(renderDonationCard)
        )}
      </div>
    </div>
  );
};

const pageStyle = {
  padding: "30px",
  fontFamily: "Poppins, sans-serif",
  backgroundColor: "#f5f5f5",
  minHeight: "100vh",
};

const cardStyle = {
  backgroundColor: "#ffffff",
  borderRadius: "10px",
  padding: "20px",
  marginBottom: "20px",
  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
};

export default Donations;
