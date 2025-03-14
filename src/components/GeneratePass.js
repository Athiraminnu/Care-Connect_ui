import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function GeneratePass() {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(null); // Track selected date
  const navigate = useNavigate();

  const location = useLocation();
  const user = location.state?.user || 'Guest';

  // Function to get days of the month
  const getDaysInMonth = (month, year) => {
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    let daysArray = [];

    // Empty cells for alignment
    for (let i = 0; i < firstDay; i++) {
      daysArray.push(null);
    }

    // Fill actual dates
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
    const formattedDate = `${currentYear}-${currentMonth + 1}-${day}`;
    setSelectedDate(formattedDate);
    navigate("/book", { state: { selectedDate: formattedDate } });
    }
  };

  const handleLogout = () => {
    fetch("http://127.0.0.1:8000/logout", {
      method: "POST",
    })
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


  return (
    <div>
      <button
        type="button"
        onClick={handleLogout}
        style={{
          marginTop: "2%",
          marginLeft: "92%",
          padding: "6px",
          width: "7%",
          backgroundColor: "blue",
          color: "white",
          borderRadius: "4px",
          border: "none",
        }}
      >
        Logout
      </button>
      <div></div>
    <div>
    <p>welcome, {user}</p>
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h4>
          {new Date(currentYear, currentMonth).toLocaleString("default", {
            month: "long",
          })}{" "}
          {currentYear}
        </h4>
        <button onClick={handlePrevMonth} className="m-3">
          Previous
        </button>
        <button onClick={handleNextMonth} className="m-3">
          Next
        </button>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: "10px",
            marginTop: "20px",
          }}
        >
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} style={{ fontWeight: "bold" }}>
              {day}
            </div>
          ))}

          {days.map((day, index) => (
            <div
              key={index}
              style={{
                padding: "10px",
                border: "1px solid #ccc",
                backgroundColor: day
                  ? selectedDate === `${day}-${currentMonth + 1}-${currentYear}`
                    ? "#007bff"
                    : "#f9f9f9"
                  : "transparent",
                color:
                  selectedDate === `${day}-${currentMonth + 1}-${currentYear}`
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

        {selectedDate && (
          <h3 style={{ marginTop: "20px" }}>Selected Date: {selectedDate}</h3>
        )}
      </div>
      <button
        type="button"
        style={{
          marginLeft: " 85%",
          marginTop: "8%",
          backgroundColor: "darkgray",
          padding: "8px",
          border: "none",
          borderRadius: "8px",
        }}
      >
        <a
          href="/userappointments"
          style={{ textDecoration: "none", color: "black" }}
        >
          My Appointments
        </a>
      </button>
    </div>
    </div>
  );
}
export default GeneratePass;
