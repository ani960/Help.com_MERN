import React, { useEffect, useState } from "react";
import API from "../api"; // ✅ Use shared axios instance
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await API.get("/match");
        setMatches(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching matches:", error);
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <Paper style={{ margin: "2rem", padding: "1rem" }}>
      <Typography variant="h4" gutterBottom>
        All Matches
      </Typography>
      {matches.length === 0 ? (
        <Typography>No matches found.</Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Need Name</strong></TableCell>
              <TableCell><strong>Item Needed</strong></TableCell>
              <TableCell><strong>Donor Category</strong></TableCell>
              <TableCell><strong>Volunteer Name</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Matched On</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {matches.map((match) => (
              <TableRow key={match._id}>
                <TableCell>{match.need?.name || "N/A"}</TableCell>
                <TableCell>{match.need?.itemNeeded || "N/A"}</TableCell>
                <TableCell>{match.drop?.category || "N/A"}</TableCell>
                <TableCell>{match.volunteer?.name || "N/A"}</TableCell>
                <TableCell>{match.status}</TableCell>
                <TableCell>{new Date(match.createdAt).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Paper>
  );
};

export default Matches;
