import { Paper, Typography, Box } from "@mui/material";

const Card = ({ title, value, color }) => {
  return (
    <Paper
      elevation={4}
      sx={{
        p: 3,
        textAlign: "center",
        borderRadius: 2,
        backgroundColor: color,
        color: "white",
        transition: "0.3s",
        "&:hover": { transform: "scale(1.05)", boxShadow: "0 6px 20px rgba(0,0,0,0.2)" },
      }}
    >
      <Typography variant="h6">{title}</Typography>
      <Box sx={{ fontSize: "2rem", fontWeight: "bold", mt: 1 }}>{value}</Box>
    </Paper>
  );
};

export default Card;
