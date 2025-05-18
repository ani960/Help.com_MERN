import React, { useEffect, useState } from "react";
import API from "../api"; // ✅ Use shared axios instance

const PickUps = () => {
  const [pickups, setPickups] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    const fetchPickups = () => {
      const url = filterStatus
        ? `/pickup?status=${filterStatus}`
        : `/pickup`;

      API.get(url)
        .then((response) => setPickups(response.data))
        .catch((error) => console.error("Error fetching pickups:", error));
    };

    fetchPickups();
  }, [filterStatus]);

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/pickup/${id}`, { status });

      const url = filterStatus
        ? `/pickup?status=${filterStatus}`
        : `/pickup`;

      const response = await API.get(url);
      setPickups(response.data);
    } catch (error) {
      console.error("Failed to update pickup status:", error);
    }
  };

  return (
    <div style={pageStyle}>
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>Pickup Requests</h2>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <label>Filter by Status: </label>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="assigned">Assigned</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        {pickups.length === 0 ? (
          <p style={{ textAlign: "center" }}>No pickup requests found</p>
        ) : (
          pickups.map((pickup) => (
            <div key={pickup._id} style={cardStyle}>
              <h3>Pickup Request</h3>
              <p><strong>Phone:</strong> {pickup.phoneNumber}</p>
              <p><strong>Address:</strong> {pickup.address}</p>
              <p><strong>Time:</strong> {pickup.time}</p>
              <p><strong>Item Count:</strong> {pickup.itemCount}</p>

              <label>Status: </label>
              <select
                value={pickup.status}
                onChange={(e) => updateStatus(pickup._id, e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="assigned">Assigned</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const pageStyle = {
  padding: "30px",
  fontFamily: "Poppins, sans-serif",
  backgroundColor: "#f7f7f7",
  minHeight: "100vh",
};

const cardStyle = {
  backgroundColor: "#fff",
  borderRadius: "10px",
  padding: "20px",
  marginBottom: "20px",
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
};

export default PickUps;
