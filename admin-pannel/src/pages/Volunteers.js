import React, { useEffect, useState } from "react";
import API from "../api"; // ✅ Use shared axios instance

const Volunteers = () => {
  const [volunteers, setVolunteers] = useState([]);

  useEffect(() => {
    API.get("/admin/volunteers")
      .then((response) => setVolunteers(response.data))
      .catch((error) =>
        console.error("Error fetching volunteers:", error)
      );
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Registered Volunteers</h2>

      {volunteers.length === 0 ? (
        <p>No volunteers found.</p>
      ) : (
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Location</th>
              <th>Availability</th>
              <th>Expertise</th>
              <th>Additional Info</th>
            </tr>
          </thead>
          <tbody>
            {volunteers.map((volunteer, index) => (
              <tr key={volunteer._id}>
                <td>{index + 1}</td>
                <td>{volunteer.name}</td>
                <td>{volunteer.email}</td>
                <td>{volunteer.phone}</td>
                <td>{volunteer.location}</td>
                <td>{volunteer.availability}</td>
                <td>{volunteer.expertise || "-"}</td>
                <td>{volunteer.additionalInfo || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Volunteers;
