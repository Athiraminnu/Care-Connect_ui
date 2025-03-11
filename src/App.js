import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import Login from "./components/Login.js";
import Registration from "./components/Registration.js";
import GeneratePass from "./components/GeneratePass.js";
import SelectTimeSlot from "./components/SelectTimeSlot.js";
import MyAppointments from "./components/MyAppointments.js";
import AllAppointments from "./components/AllAppointments.js";

// Protected Route Component
const ProtectedRoute = ({ element, allowedRoles }) => {
  const userRole = localStorage.getItem("role"); // Get stored role
  return allowedRoles.includes(userRole) ? element : <Navigate to="/" />;
};

function App() {
  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <Router>
        {/* Background Image */}
        <img
          src="/images/4990224.jpg"
          alt="doctor patient"
          style={{
            height: "90%",
            width: "100%",
            position: "absolute",
            top: 40,
            left: 0,
            zIndex: -1,
            opacity: 0.4,
            objectFit: "cover",
          }}
        />

        {/* Routes */}
        <Routes>
          {/* Accessible by Both Admin and User */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Registration />} />

          {/* User-Only Routes */}
          <Route
            path="/appointment"
            element={
              <ProtectedRoute
                element={<GeneratePass />}
                allowedRoles={["user"]}
              />
            }
          />
          <Route
            path="/book"
            element={
              <ProtectedRoute
                element={<SelectTimeSlot />}
                allowedRoles={["user"]}
              />
            }
          />
          <Route
            path="/myappointments"
            element={
              <ProtectedRoute
                element={<MyAppointments />}
                allowedRoles={["user"]}
              />
            }
          />
          <Route
            path="/viewappointments"
            element={
              <ProtectedRoute
                element={<AllAppointments />}
                allowedRoles={["admin"]}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
