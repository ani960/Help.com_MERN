import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Dashboard,
  People,
  AttachMoney,
  ListAlt,
  VolunteerActivism,
  Map as MapIcon,
  Menu,
  Route as RouteIcon,
  LocalShipping as PickupIcon,
  HowToReg as MatchIcon // ✅ New Icon for Matches
} from "@mui/icons-material";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
} from "@mui/material";

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        width: open ? 250 : 70,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: open ? 250 : 70,
          bgcolor: "#333",
          color: "white",
          transition: "0.3s",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
        }}
      >
        {open && <Typography variant="h6">Admin Panel</Typography>}
        <IconButton onClick={() => setOpen(!open)} sx={{ color: "white" }}>
          <Menu />
        </IconButton>
      </Box>
      <List>
        {[
          { text: "Dashboard", icon: <Dashboard />, path: "/" },
          { text: "Users", icon: <People />, path: "/users" },
          { text: "Donations", icon: <AttachMoney />, path: "/donations" },
          { text: "Requests", icon: <ListAlt />, path: "/requests" },
          { text: "Volunteers", icon: <VolunteerActivism />, path: "/volunteers" },
          { text: "PickUps", icon: <PickupIcon />, path: "/pickups" },
          { text: "Map View", icon: <MapIcon />, path: "/map" },
          { text: "Track Map", icon: <RouteIcon />, path: "/track" },
          { text: "Matches", icon: <MatchIcon />, path: "/matches" }, // ✅ Matches Link
        ].map(({ text, icon, path }) => (
          <ListItem button key={text} component={Link} to={path}>
            <ListItemIcon sx={{ color: "white" }}>{icon}</ListItemIcon>
            {open && <ListItemText primary={text} />}
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
