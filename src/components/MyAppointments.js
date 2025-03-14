import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MyAppointments() {
  const [myAppointmentList, setMyAppointmentList] = useState([]);
  const user = localStorage.getItem("user") || "Guest";
  const navigate = useNavigate(); 

  useEffect(() => {
    fetchAllMyAppointments();
  }, [user]); // Dependency added

  const fetchAllMyAppointments = () => {
    axios
      .get("http://127.0.0.1:8000/myappointments/", {
        headers: {
          "UserInfo": user,
        },
      })
      .then((response) => {
        setMyAppointmentList(response.data);
      })
      .catch((error) => {
        alert("An error occurred while fetching the details!", error);
      });
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
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>DATE</th>
                <th style={styles.th}>TIME</th>
              </tr>
            </thead>
            <tbody>
              {myAppointmentList.map((appointment) => (
                <tr key={appointment.id}>
                  <td style={styles.td}>{appointment.date}</td>
                  <td style={styles.td}>{appointment.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
  );
}

export default MyAppointments;
