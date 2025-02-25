import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login.js";
import Registration from "./components/Registration.js";
import GeneratePass from "./components/GeneratePass.js";
import SelectTimeSlot from "./components/SelectTimeSlot.js";
import MyAppointments from "./components/MyAppointments.js";

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
            zIndex: -1, // Send image to background
            opacity: 0.4,
            objectFit: "cover",
          }}
        />
          
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/appointment" element={<GeneratePass />} />
          <Route path="/book" element={<SelectTimeSlot />} />
          <Route path="/myappointments" element={<MyAppointments />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

