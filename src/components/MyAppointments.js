import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MyAppointments() {
  const [myAppointmentList, setMyAppointmentList] = useState([]);
  const [filter, setFilter] = useState("");
  const user = localStorage.getItem("user") || "Guest";
  const navigate = useNavigate();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  useEffect(() => {
    fetchAllMyAppointments();
  }, [filter]); // Dependency added

  const fetchAllMyAppointments = () => {
    axios
      .get(`http://127.0.0.1:8000/myappointments/?filter=${filter}`, {
        headers: {
          UserInfo: user,
        },
      })
      .then((response) => {
        setMyAppointmentList(response.data);
      })
      .catch((error) => {
        alert("An error occurred while fetching the details!", error);
      });
  };

  const handleCancel = (time, date) => {
    fetch("http://127.0.0.1:8000/cancel/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cancelTime: time,
        cancelDate: date,
      }),
    })
      .then((response) => {
        if (response.ok) {
          alert("Canceled Sucessfully !");
          window.location.reload();
        } else {
          alert("Cancellation unsucessfull !");
        }
      })
      .catch((error) => {
        console.error("Error :", error);
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
      background: "rgba(255, 255, 255, 0.3)",
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
    filter: {
      marginLeft: "10%",
      padding: "10px",
      marginBottom: "10px",
    },
  };

  return (
    <div>
      <div style={styles.filter}>
        <label htmlFor="filter">Filter By </label>
        <select
          name="filter"
          className="p-1 rounded"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value={"all"}>All Appointments</option>
          <option value={"upcoming"} defaultValue={"upcoming"}>
            Upcoming Appointments
          </option>
        </select>
      </div>
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>DATE</th>
              <th style={styles.th}>TIME</th>
              <th style={styles.th}>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {myAppointmentList.map((appointment) => (
              <tr key={appointment.id}>
                <td style={styles.td}>{appointment.date}</td>
                <td style={styles.td}>{appointment.time}</td>
                <td style={styles.td}>
                  <button
                    style={{
                      color: "white",
                      borderRadius: "4px",
                      padding: "4px",
                      border: "none",
                      width: "40%",
                      cursor:
                        new Date(appointment.date) < today
                          ? "not-allowed"
                          : "default",
                      backgroundColor:
                        new Date(appointment.date) < today
                          ? "#ef8770"
                          : "#d32905",
                    }}
                    type="submit"
                    disabled={new Date(appointment.date) < today}
                    onClick={() =>
                      handleCancel(appointment.time, appointment.date)
                    }
                  >
                    Cancel
                  </button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyAppointments;
