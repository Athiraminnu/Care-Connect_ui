import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Use navigate for redirection

  const handleSubmit = (e) => {
    e.preventDefault();
    //Admin Credentials
    const adminUser = "DR";
    const adminPassword = "dr@dr123";

    fetch("http://127.0.0.1:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          if (username && password) {
            if (username === adminUser && password === adminPassword) {
              alert(`Logged in as Admin: ${username}`);
              localStorage.setItem("user", username);
              localStorage.setItem("role", "admin");
              navigate("/viewappointments", { state: { user: username } });
            } else {
              // Regular User Login
              alert(`Logged in as User: ${username}`);
              localStorage.setItem("user", username);
              localStorage.setItem("role", "user"); // Store role
              navigate("/appointment", { state: { user: username } }); // Redirect user
            }
          }
        } else {
          alert("Invalid username or password");
        }
      })
      .catch((error) => {
        console.error("Error : ", error);
      });
  };

  return (
    <div
      className="p-5"
      style={{
        position: "absolute", // Position above image
        top: "50%", // Center vertically
        left: "50%", 
        transform: "translate(-50%, -50%)", 
        width: "350px",
        background: "rgba(255, 255, 255, 0.5)",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", 
      }}
    >
      <h4 className="my-2" style={{ textAlign: "center" }}>
        {" "}
        Login{" "}
      </h4>
      <form onSubmit={handleSubmit}>
        <div className="form-group my-2">
          <label htmlFor="username">Username:</label>
          <input
            className="form-control"
            type="text"
            id="username"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group my-2">
          <label htmlFor="pass">Password:</label>
          <input
            type="password"
            className="form-control"
            id="pass"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <a href="/register" style={{ fontSize: "14px" }}>
            New Here? Register Here
          </a>
        </div>
      </form>
    </div>
  );
}

export default Login;
