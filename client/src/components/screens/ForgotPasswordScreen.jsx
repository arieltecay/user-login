import { useState } from "react";
import axios from "axios";

const LoginScreen = ({ history }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSucces] = useState("");

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/api/auth/forgotPassword",
        { email },
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
      <form onSubmit={forgotPasswordHandler}>
        <h3>Forgot Password </h3>
        {error && <span>{error}</span>}
        {success && <span>{success}</span>}
        <p>
          Please enter the email address you register your account with. We will
          send you a reset password confirmation to this email.-
        </p>
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

        <button type="submit">Send E-Mail</button>
      </form>
    </div>
  );
};

export default LoginScreen;
