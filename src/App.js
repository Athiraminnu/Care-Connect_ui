import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./componenets/Login";
import Registration from "./componenets/Registration";

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
        </Routes>
      </Router>
    </div>
  );
}

export default App;

