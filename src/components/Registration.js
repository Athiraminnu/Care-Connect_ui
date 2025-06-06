import { useState } from "react";

function Registration() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirm_password) {
      alert("Passwords do not match!");
      return;
    }

    const userData = { username, name, dob, phone, email, password };

    try {
      const response = await fetch("http://127.0.0.1:8000/user_register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("User registered successfully!");
        window.location.reload();
      } else {
        alert("Registration failed: " + JSON.stringify(data));
      }
    } catch (error) {
      alert("Error connecting to the server!");
    }
  };


  return (
    <div>
      <button
        type="button"
        className="bg-primary rounded"
        style={{
          position: "absolute",
          left: "92%",
          top: "3%",
          color: "white",
          border: "none",
          width: "80px",
          height: "40px",
        }}
      >
        <a href="/" style={{color: 'white', textDecoration: 'none'}}>Login</a>
      </button>
      <div
        className="p-5"
        style={{
          position: "absolute", // Position above image
          top: "50%", // Center vertically
          left: "50%", // Center horizontally
          transform: "translate(-50%, -50%)", // Adjust exact centering
          width: "450px",
          background: "rgba(255, 255, 255, 0.5)", // Semi-transparent background
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Subtle shadow
        }}
      >
        <h4 className="my-2" style={{ textAlign: "center" }}>
          Register
        </h4>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="row my-3">
              <div className="form-group col-6">
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

              <div className="form-group col-6">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="row my-3">
              <div className="form-group col-6">
                <label htmlFor="dob">DOB:</label>
                <input
                  type="date"
                  className="form-control"
                  id="dob"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  required
                />
              </div>

              <div className="form-group col-6">
                <label htmlFor="phone">Phone Number:</label>
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  placeholder="Enter Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Id:</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter Email ID"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="row my-3">
              <div className="form-group col-6">
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

              <div className="form-group col-6">
                <label htmlFor="cpass">Confirm Password:</label>
                <input
                  type="password"
                  className="form-control"
                  id="cpass"
                  placeholder="Re-Enter password"
                  value={confirm_password}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Registration;
