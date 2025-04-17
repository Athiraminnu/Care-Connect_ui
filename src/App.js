import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  useNavigate,
} from "react-router-dom";
import { useState, useEffect } from "react";

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
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("role");
    setRole(null);
    navigate("/");
  };

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0"  style={{marginRight: '2%', marginTop: "1%"}}>
              {["user", "admin"].includes(role) && (
                <li className="nav-item dropdown dropstart" >
                  <a
                    className="nav-link"
                    href="#!"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="fa-solid fa-user"></i>
                  </a>
                  <ul className="dropdown-menu dropdown-menu-start" aria-labelledby="navbarDropdown">

                    {role === "user" && (
                      <li>
                        <Link className="dropdown-item" to="/userappointments">
                          My Appointments
                        </Link>
                      </li>
                    )}
                    <li>
                      <a className="dropdown-item" href="#!" onClick={handleLogout}>
                        Logout
                      </a>
                    </li>
                  </ul>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

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
            <ProtectedRoute element={<GeneratePass />} allowedRoles={["user"]} />
          }
        />
        <Route
          path="/book"
          element={
            <ProtectedRoute element={<SelectTimeSlot />} allowedRoles={["user"]} />
          }
        />
        <Route
          path="/userappointments"
          element={
            <ProtectedRoute element={<MyAppointments />} allowedRoles={["user"]} />
          }
        />
        <Route
          path="/viewappointments"
          element={
            <ProtectedRoute element={<AllAppointments />} allowedRoles={["admin"]} />
          }
        />
      </Routes>
    </div>
  );
}

export default function Appr() {
  return (
    <Router>
      <App />
    </Router>
  );
}
