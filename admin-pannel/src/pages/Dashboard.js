import { useState, useEffect } from "react";
import { Grid, Typography, Container } from "@mui/material";
import Card from "../components/Card";
import API from "../api"; // ✅ Use shared API instance

const Dashboard = () => {
  const [stats, setStats] = useState({ users: 0, donations: 0, requests: 0, volunteers: 0 });

  useEffect(() => {
    API.get("/admin/stats")
      .then(response => setStats(response.data))
      .catch(error => console.error("Error fetching stats:", error));
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
        Admin Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card title="Users" value={stats.users} color="#2196F3" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card title="Donations" value={stats.donations} color="#4CAF50" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card title="Requests" value={stats.requests} color="#FF9800" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card title="Volunteers" value={stats.volunteers} color="#9C27B0" />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
