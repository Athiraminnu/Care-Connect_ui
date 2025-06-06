import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function SelectTimeSlot() {
  const timings = [
    "10AM", "10.30AM", "11AM", "11.30AM", "12PM", "12.30PM",
    "3.30PM", "4.00PM", "4.30PM", "5.00PM", "5.30PM", "6.00PM",
  ];

  const navigate = useNavigate();
  const [selectedTime, setSelectedTime] = useState("");
  const [bookedTime, setBookedTime] = useState([]);
  const user = localStorage.getItem("user") || "Guest";
  const location = useLocation();
  const selectedDate = location.state?.selectedDate || "";

  useEffect(() => {
    const fetchBookedSlots = async () => {
      if (!selectedDate) return; // Don't fetch if no date is selected

      try {
        const response = await fetch(
          `http://127.0.0.1:8000/book/?dateOfApp=${selectedDate}`
        );
        const data = await response.json();

        if (response.ok) {
          setBookedTime(data.map((slot) => slot.time)); // Extract booked times
        } else {
          console.error("Error fetching booked slots:", data.error);
        }
      } catch (error) {
        console.error("Error fetching booked slots:", error);
      }
    };

    fetchBookedSlots();
  }, [selectedDate]); // Re-fetch when selectedDate changes

  const handleConfirmation = async () => {
    if (!selectedTime) return;

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

    if (response.ok) {
      alert("Booking confirmed");
      setBookedTime([...bookedTime, selectedTime]); // Update UI
      window.location.reload();
    } else {
      alert(data.error || "Try again");
    }
  };


  // **Styles**
  const styles = {
    container: { padding: "20px", textAlign: "center" },
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
    dateContainer: { marginBottom: "20px" },
    gridContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "15px",
      justifyContent: "center",
      padding: "0 20px",
      marginLeft: "150px",
      marginRight: "150px",
      marginTop: "50px",
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
    selectedTimeText: { textAlign: "center", marginTop: "20px" },
    confirmContainer: { textAlign: "center", marginTop: "20px" },
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

      <div style={styles.dateContainer}>
        <h6>Date of Appointment: {selectedDate}</h6>
      </div>
      <div style={styles.gridContainer}>
        {timings.map((time, index) => {
          const isBooked = bookedTime.includes(time);

          return (
            <div key={index} style={styles.timeSlot}>
              <h5>{time}</h5>
              <button
                type="button"
                disabled={isBooked}
                style={{
                  border: "none",
                  color: "white",
                  width: "80px",
                  height: "40px",
                  borderRadius: "5px",
                  cursor: isBooked ? "not-allowed" : "pointer",
                  backgroundColor: isBooked
                    ? "#d3d3d3"
                    : selectedTime === time
                    ? "#ffc107"
                    : "#28a745",
                }}
                onClick={() => setSelectedTime(time)}
              >
                {isBooked ? "Booked" : "Book"}
              </button>
            </div>
          );
        })}
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
