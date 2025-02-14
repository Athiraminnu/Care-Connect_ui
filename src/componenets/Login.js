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
        border: "2px solid black",
        marginLeft: "450px",
        marginRight: "450px",
        marginTop: "60px",
        borderRadius: "8px",
      }}
      rounded
    >
      <h4 className="my-2" style={{ textAlign: "center" }}>
        {" "}
        Login {" "}
      </h4>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-group col-12 my-2">
            <label for="username">Username:</label>
            <input
              className="form-control"
              type="text"
              id="username"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              rounded
              required
            />
          </div>

          <div className="form-group col-12 my-2">
            <label for="pass">Password:</label>
            <input
              type="password"
              className="form-control"
              id="pass"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              rounded
              required
            />
          </div>

          <button
            type="submit"
            className="p-1"
            style={{ alignItems: "center" }}
            rounded
          >
            Login
          </button>
          <a href="/register" style={{marginLeft: "15px", fontSize: "13px"}}>New Here! Register Here</a>
        </form>
      </div>
    </div>
  );
}

export default Login;
