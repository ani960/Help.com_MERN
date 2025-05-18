import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Donations from "./pages/Donations";
import Requests from "./pages/Requests";
import Volunteers from "./pages/Volunteers";
import PickUps from "./pages/PickUps";
import Login from "./pages/Login";
import LocationMap from "./pages/LocationMap";
import EnhancedMap from "./pages/EnhancedMap";
import Matches from "./pages/Matches"; // ✅ Import Matches page
import { isAdminAuthenticated } from "./services/auth";

const ProtectedRoute = ({ element }) => {
  return isAdminAuthenticated() ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        {isAdminAuthenticated() && <Sidebar />}
        <div style={{ flex: 1, padding: "20px" }}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ProtectedRoute element={<Dashboard />} />} />
            <Route path="/users" element={<ProtectedRoute element={<Users />} />} />
            <Route path="/donations" element={<ProtectedRoute element={<Donations />} />} />
            <Route path="/requests" element={<ProtectedRoute element={<Requests />} />} />
            <Route path="/volunteers" element={<ProtectedRoute element={<Volunteers />} />} />
            <Route path="/pickups" element={<ProtectedRoute element={<PickUps />} />} />
            <Route path="/map" element={<ProtectedRoute element={<LocationMap />} />} />
            <Route path="/track" element={<ProtectedRoute element={<EnhancedMap />} />} />
            <Route path="/matches" element={<ProtectedRoute element={<Matches />} />} /> {/* ✅ Matches Route */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
