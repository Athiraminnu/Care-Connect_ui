import { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Logined as: ${username}`);
  };

  return (
    <div
      className="p-5"
      style={{
        position: "absolute", // Position above image
        top: "50%", // Center vertically
        left: "50%", // Center horizontally
        transform: "translate(-50%, -50%)", // Adjust exact centering
        width: "350px",
        background: "rgba(255, 255, 255, 0.5)", // Semi-transparent background
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Subtle shadow
      }}
    >
      <h4 className="my-2" style={{ textAlign: "center" }}> Login </h4>
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

        <button type="submit" className="btn btn-primary w-100">Login</button>
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <a href="/register" style={{ fontSize: "14px" }}>New Here? Register Here</a>
        </div>
      </form>
    </div>
  );
}

export default Login;
