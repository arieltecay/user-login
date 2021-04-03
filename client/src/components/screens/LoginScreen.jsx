import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const LoginScreen = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/");
    }
  }, [history]);

  const loginHandler = async (e) => {
    e.preventDefault();
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/api/auth/register",
        { email, password },
        config
      );
      localStorage.setItem("authToken", data.token);
      history.push("/");
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };
  return (
    <div>
      <form onSubmit={loginHandler}>
        <h3>Login </h3>
        {error && <span>{error}</span>}
        <div>
          <label htmlFor="email">E-Mail:</label>
          <input
            type="email"
            required
            id="email"
            placeholder="Enter E-Mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            required
            id="password"
            placeholder="Enter a Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
        <br></br>
        <span>
          Don´t have an account? <Link to="/register">Register</Link>
        </span>
        <br />
        <Link to="/forgotpassword">Forgot Password?</Link>
      </form>
    </div>
  );
};

export default LoginScreen;
