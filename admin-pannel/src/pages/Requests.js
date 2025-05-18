import React, { useEffect, useState } from "react";
import axios from "axios";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const url = filterStatus
        ? `http://localhost:5000/api/admin/requests?status=${filterStatus}`
        : `http://localhost:5000/api/admin/requests`;
      const response = await axios.get(url);
      setRequests(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching requests:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [filterStatus]);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/requests/${id}`, { status });
      await fetchRequests();
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const handleMatch = async (id) => {
    const cleanedId = id.trim(); // ✅ Trim newline/space from ID
    try {
      const response = await axios.post(`http://localhost:5000/api/match/${cleanedId}`);
      alert("✅ Match Created:\n" + JSON.stringify(response.data, null, 2));
      await fetchRequests();
    } catch (error) {
      console.error("❌ Error matching request:", error.response?.data || error.message);
      alert("❌ Failed to create match:\n" + (error.response?.data?.error || "Unknown error"));
    }
  };

  const renderRequestCard = (req) => {
    const type = req.type === "Pickup" ? "Pickup Request" : "Help Request";

    return (
      <div key={req._id} style={cardStyle}>
        <h3 style={{ marginBottom: "10px" }}>{type}</h3>
        <p><strong>Name / Phone:</strong> {req.name || req.phoneNumber}</p>
        {req.itemNeeded && <p><strong>Item Needed:</strong> {req.itemNeeded}</p>}
        {req.quantity && <p><strong>Quantity:</strong> {req.quantity}</p>}
        {req.reason && <p><strong>Reason:</strong> {req.reason}</p>}
        {req.address && <p><strong>Address:</strong> {req.address}</p>}
        {req.time && <p><strong>Time:</strong> {req.time}</p>}
        {req.itemCount && <p><strong>Item Count:</strong> {req.itemCount}</p>}

        <label>Status: </label>
        <select
          value={req.status}
          onChange={(e) => updateStatus(req._id, e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="assigned">Assigned</option>
          <option value="completed">Completed</option>
        </select>

        {req.status === "pending" && (
          <button
            style={matchButtonStyle}
            onClick={() => handleMatch(req._id)}
          >
            🔁 Match Now
          </button>
        )}
      </div>
    );
  };

  return (
    <div style={pageStyle}>
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
        Requests Overview
      </h2>
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
        {loading ? (
          <p>Loading...</p>
        ) : requests.length === 0 ? (
          <p style={{ textAlign: "center" }}>No requests available</p>
        ) : (
          requests.map(renderRequestCard)
        )}
      </div>
    </div>
  );
};

const pageStyle = {
  padding: "30px",
  fontFamily: "Poppins, sans-serif",
  backgroundColor: "#f1f1f1",
  minHeight: "100vh",
};

const cardStyle = {
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  padding: "20px",
  borderRadius: "10px",
  backgroundColor: "#fff",
  marginBottom: "20px",
};

const matchButtonStyle = {
  marginTop: "10px",
  padding: "8px 15px",
  backgroundColor: "#1976d2",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default Requests;
