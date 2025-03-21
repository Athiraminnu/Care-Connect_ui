import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function GeneratePass() {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate();

  const location = useLocation();
  const user = location.state?.user || "Guest";

  const getDaysInMonth = (month, year) => {
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    let daysArray = [];

    for (let i = 0; i < firstDay; i++) {
      daysArray.push(null);
    }

    for (let day = 1; day <= totalDays; day++) {
      daysArray.push(day);
    }

    return daysArray;
  };

  const days = getDaysInMonth(currentMonth, currentYear);

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
    setCurrentYear((prev) => (currentMonth === 0 ? prev - 1 : prev));
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
    setCurrentYear((prev) => (currentMonth === 11 ? prev + 1 : prev));
  };

  const handleDateClick = (day) => {
    if (day) {
      const formattedDate = `${currentYear}-${String(currentMonth + 1).padStart(
        2,
        "0"
      )}-${String(day).padStart(2, "0")}`;
      setSelectedDate(formattedDate);

      const selectedDateObj = new Date(currentYear, currentMonth, day);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDateObj >= today) {
        navigate("/book", { state: { selectedDate: formattedDate } });
      } else {
        alert("Select a date from today onwards!!");
      }
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

  const styles = {
    container: {
      padding: "20px",
      textAlign: "center",
    },
    logoutButton: {
      position: "absolute",
      top: "10px",
      right: "10px",
      padding: "8px",
      width: "100px",
      backgroundColor: "blue",
      color: "white",
      borderRadius: "4px",
      border: "none",
    },
    calendarContainer: {
      marginTop: "30px",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "center",
      gap: "10px",
      marginBottom: "20px",
    },
    navButton: {
      padding: "8px 16px",
      backgroundColor: "#C2CA45",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
    gridContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(7, 1fr)",
      gap: "15px",
      marginTop: "20px",
      maxWidth: "400px",
      margin: "auto",
    },
    weekday: {
      fontWeight: "bold",
    },
    dateCell: {
      padding: "10px",
      border: "1px solid #ccc",
      textAlign: "center",
      borderRadius: "5px",
      transition: "transform 0.2s",
    },
    dateCellHover: {
      transform: "scale(1.1)",
    },
    appointmentsButton: {
      marginTop: "20px",
      backgroundColor: "#FF8D23",
      padding: "10px",
      border: "none",
      borderRadius: "8px",
    },
    linkText: {
      textDecoration: "none",
      color: "black",
      fontSize: "16px",
    },
  };

  return (
    <div style={styles.container}>
      <button type="button" onClick={handleLogout} style={styles.logoutButton}>
        Logout
      </button>

      <div style={styles.calendarContainer}>
        <h4>
          {new Date(currentYear, currentMonth).toLocaleString("default", {
            month: "long",
          })}{" "}
          {currentYear}
        </h4>

        <div style={styles.buttonContainer}>
          <button onClick={handlePrevMonth} style={styles.navButton}>
            Previous
          </button>
          <button onClick={handleNextMonth} style={styles.navButton}>
            Next
          </button>
        </div>

        <div style={styles.gridContainer}>
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} style={styles.weekday}>
              {day}
            </div>
          ))}

          {days.map((day, index) => (
            <div
              key={index}
              style={{
                ...styles.dateCell,
                backgroundColor:
                  selectedDate ===
                  `${currentYear}-${String(currentMonth + 1).padStart(
                    2,
                    "0"
                  )}-${String(day).padStart(2, "0")}`
                    ? "#007bff"
                    : "#f9f9f9",
                color:
                  selectedDate ===
                  `${currentYear}-${String(currentMonth + 1).padStart(
                    2,
                    "0"
                  )}-${String(day).padStart(2, "0")}`
                    ? "#fff"
                    : "#000",
                cursor: day ? "pointer" : "default",
              }}
              onClick={() => handleDateClick(day)}
            >
              {day || ""}
            </div>
          ))}
        </div>
      </div>

      <button type="button" style={styles.appointmentsButton}>
        <a href="/userappointments" style={styles.linkText}>
          My Appointments
        </a>
      </button>
    </div>
  );
}

export default GeneratePass;
