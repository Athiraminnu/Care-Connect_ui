import { useEffect, useState } from "react";
import axios from "axios";

function MyAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/appointments/")  // Correct API endpoint
      .then(response => {
        setAppointments(response.data);
      })
      .catch(error => {
        console.error("Error fetching appointment data:", error);
      });
  }, []);

  if (appointments.length === 0) return <p>Loading...</p>; // Corrected condition

  return (
    <div style={{ marginTop: "50px", marginLeft: "600px", marginBottom: "20%" }}>
      <h5>Your Appointments</h5>
      <div
        style={{
          position: "absolute",
          top: "50%", 
          left: "50%", 
          transform: "translate(-50%, -50%)", 
          width: "350px",
          height: "auto", 
          background: "rgba(255, 255, 255, 0.9)",
          padding: "20px",
          borderRadius: "10px"
        }}
      >
        <h2>Appointment Details</h2>
        <ul>
          {appointments.map(booking => (
            <li key={booking}>
              <p><strong>Date:</strong> {booking.date}</p>
              <p><strong>Time:</strong> {booking.time}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MyAppointments;
