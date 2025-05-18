import React, { useEffect, useState } from "react";
import API from "../api"; // ✅ use env-based axios instance

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    API.get("/admin/users")
      .then(response => setUsers(response.data))
      .catch(error => console.error("Error fetching users:", error));
  }, []);

  return (
    <div>
      <h2>Users Management</h2>
      <table border="1">
        <thead>
          <tr><th>Name</th><th>Email</th><th>Role</th></tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
