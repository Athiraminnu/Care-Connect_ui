import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function SelectTimeSlot() {
  const timings = [
    "10AM",
    "10.30AM",
    "11AM",
    "11.30AM",
    "12PM",
    "12.30PM",
    "3.30PM",
    "4.00PM",
    "4.30PM",
    "5.00PM",
    "5.30PM",
    "6.00PM",
  ];

  const navigate = useNavigate();
  const [selectedTime, setSelectedTime] = useState("");
  const user = localStorage.getItem("user") || "Guest";
  const location = useLocation();
  const selectedDate = location.state?.selectedDate || "No date selected";

  const handleConfirmation = async () => {
    const response = await fetch("http://127.0.0.1:8000/book/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        value: selectedTime,
        dateOfApp: selectedDate,
        userName: user,
      }),
    });

    const data = await response.json();
    console.log(data);

    if (response.ok) {
      alert("Booking confirmed");
    } else {
      alert("Try again");
    }
  };

  const handleLogout = () => {
    fetch("http://127.0.0.1:8000/logout", { method: "POST" })
      .then((response) => {
        if (response.ok) {
          alert("Logged out successfully!");
          navigate("/");
        } else {
          alert("Logout failed.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // **Styles**
  const styles = {
    container: {
      padding: "20px",
      textAlign: "center",
    },
    logoutButton: {
      margin: "10px auto",
      padding: "6px",
      width: "100px",
      backgroundColor: "blue",
      color: "white",
      borderRadius: "4px",
      border: "none",
      position: "absolute",
      top: "10px",
      right: "10px",
    },
    dateContainer: {
      marginBottom: "20px",
    },
    gridContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "15px",
      justifyContent: "center",
      padding: "0 20px",
      marginLeft: "150px",
      marginTop: "30px",
        },
    timeSlot: {
      background: "rgba(255, 255, 255, 0.8)",
      padding: "15px",
      borderRadius: "8px",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      textAlign: "center",
      transition: "transform 0.2s",
    },
    timeSlotHover: {
      transform: "scale(1.05)",
    },
    timeText: {
      margin: "0",
    },
    bookButton: {
      border: "none",
      color: "white",
      width: "80px",
      height: "40px",
      borderRadius: "5px",
      cursor: "pointer",
    },
    selectedTimeText: {
      textAlign: "center",
      marginTop: "20px",
    },
    confirmContainer: {
      textAlign: "center",
      marginTop: "20px",
    },
    confirmButton: {
      padding: "10px 20px",
      fontSize: "16px",
      border: "none",
      backgroundColor: "#007bff",
      color: "white",
      borderRadius: "5px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <button type="button" onClick={handleLogout} style={styles.logoutButton}>
        Logout
      </button>

      <div style={styles.dateContainer}>
        <h6>Date of Appointment: {selectedDate}</h6>
      </div>

      <div className="row col-9" style={styles.gridContainer}>
        {timings.map((time, index) => (
          <div key={index} style={styles.timeSlot}>
            <h5 style={styles.timeText}>{time}</h5>
            <button
              type="button"
              style={{
                ...styles.bookButton,
                backgroundColor: selectedTime === time ? "#ffc107" : "#28a745",
              }}
              onClick={() => setSelectedTime(time)}
            >
              Book
            </button>
          </div>
        ))}
      </div>

      {selectedTime && (
        <h3 style={styles.selectedTimeText}>Selected Time: {selectedTime}</h3>
      )}

      <div style={styles.confirmContainer}>
        <button
          style={{
            ...styles.confirmButton,
            opacity: selectedTime ? 1 : 0.5,
          }}
          onClick={handleConfirmation}
          disabled={!selectedTime}
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
}

export default SelectTimeSlot;
