import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function GeneratePass() {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(null); // Track selected date
  const navigate = useNavigate();

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
      setSelectedDate(`${currentYear}-${currentMonth + 1}-${day}`);
      navigate("/book"); 
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>
        {new Date(currentYear, currentMonth).toLocaleString("default", {
          month: "long",
        })}{" "}
        {currentYear}
      </h2>
      <button onClick={handlePrevMonth}>Previous</button>
      <button onClick={handleNextMonth}>Next</button>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "10px", marginTop: "20px" }}>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} style={{ fontWeight: "bold" }}>{day}</div>
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
              color: selectedDate === `${day}-${currentMonth + 1}-${currentYear}` ? "#fff" : "#000",
              cursor: day ? "pointer" : "default",
            }}
            onClick={() => handleDateClick(day)}
          >
            {day || ""}
          </div>
        ))}
      </div>

      {selectedDate && <h3 style={{ marginTop: "20px" }}>Selected Date: {selectedDate}</h3>}
    </div>
  );
}
export default GeneratePass;