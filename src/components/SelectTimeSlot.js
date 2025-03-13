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
    "6.30PM",
  ];
  const navigate = useNavigate();
  const [selectedTime, setSelectedTime] = useState("");
  const user = localStorage.getItem("user") || "Guest";

  const location = useLocation();
  const selectedDate = location.state?.selectedDate || "No date selected";

  const handleConfirmation = async () => {
    const response = await fetch("http://127.0.0.1:8000/book/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

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
      alert("try again");
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
      <div>
        <h6>Date of Appointment : {selectedDate}</h6>
        <div className="my-5">
          {timings.map((time, index) => (
            <div
              key={index}
              style={{
                background: "rgba(255, 255, 255, 0.8)",
                width: "300px",
                height: "60px",
                margin: "10px auto",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px",
                borderRadius: "8px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
              }}
            >
              <h5 style={{ margin: "0" }}>{time}</h5>
              <button
                type="button"
                style={{
                  border: "none",
                  backgroundColor:
                    selectedTime === time ? "#ffc107" : "#28a745",
                  color: "white",
                  width: "80px",
                  height: "40px",
                  borderRadius: "5px",
                }}
                onClick={() => setSelectedTime(time)}
              >
                Book
              </button>
            </div>
          ))}
        </div>

        {selectedTime && (
          <h3 style={{ textAlign: "center" }}>Selected Time: {selectedTime}</h3>
        )}

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              border: "none",
              backgroundColor: "#007bff",
              color: "white",
              borderRadius: "5px",
              cursor: "pointer",
              opacity: selectedTime ? 1 : 0.5,
            }}
            onClick={handleConfirmation}
            disabled={!selectedTime}
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
}

export default SelectTimeSlot;
