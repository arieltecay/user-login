import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ResetPasswordScreen = ({ match }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSucces] = useState("");

  const resetPasswordHandler = async (e) => {
    e.preventDefault();
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Password Don´t Match");
    }
    try {
      const { data } = await axios.post(
        `/api/auth/passwordreset/${match.params.resetToken}`,
        { password },
        config
      );
      setSucces(data.data);
      
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };
  return (
    <div>
      <form onSubmit={resetPasswordHandler}>
        <h3>Reset PAssword</h3>
        {error && <span>{error}</span>}
        {success && (
          <div>
            {success} <Link to="/login">Login</Link>{" "}
          </div>
        )}
        <div>
          <label htmlFor="password">New Password:</label>
          <input
            type="password"
            required
            id="password"
            placeholder="Enter new Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="confirmpassword">Confirm new Password:</label>
          <input
            type="password"
            required
            id="confirmpassword"
            placeholder="Repeat Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit">Register</button>
        <br />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPasswordScreen;
