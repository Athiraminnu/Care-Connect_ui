import React, { useEffect, useState } from "react";
import axios from "axios";

function AllAppointments() {
  const [appointmentList, setAppointmentList] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    if (selectedDate) {
      fetchAppointmentsByDate(selectedDate);
    }
  }, [selectedDate]);

  const fetchAppointmentsByDate = (date) => {
    const formattedDate = new Date(date).toISOString().split("T")[0]; // Convert to YYYY-MM-DD
    axios
      .get(`http://127.0.0.1:8000/viewappointments/?date=${formattedDate}`)
      .then((response) => {
        setAppointmentList(response.data);
      })
      .catch((error) => {
        alert("Error while fetching the data !", error);
      });
  };

  const styles = {
    tableContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "20px",
    },
    table: {
      width: "50%",
      borderCollapse: "collapse",
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
      backgroundColor: "#fff",
      background: "rgba(255, 255, 255, 0.2)",
    },
    th: {
      backgroundColor: "#16809DFF",
      color: "white",
      padding: "8px",
      textAlign: "center",
    },
    td: {
      background: "rgba(255, 255, 255, 0.2)",
      padding: "8px",
      border: "1px solid #ddd",
      textAlign: "center",
    },
    trHover: {
      transition: "background 0.3s ease-in-out",
    },
    trHoverHover: {
      backgroundColor: "#f1f1f1",
    },
  };

  return (
    <div>
      <label>Filter By Date :</label>
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>DATE</th>
              <th style={styles.th}>TIME</th>
              <th style={styles.th}>PATIENT NAME</th>
            </tr>
          </thead>
          <tbody>
            {appointmentList.map((appointment) => (
              <tr
                key={appointment.id}
                style={styles.trHover}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#f1f1f1")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background =
                    "rgba(255, 255, 255, 0.8)")
                }
              >
                <td style={styles.td}>{appointment.date}</td>
                <td style={styles.td}>{appointment.time}</td>
                <td style={styles.td}>{appointment.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllAppointments;
