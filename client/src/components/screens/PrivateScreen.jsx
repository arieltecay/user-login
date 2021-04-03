import { useState, useEffect } from "react";
import axios from "axios";

const PrivateScreen = ({ history }) => {
  const [error, setError] = useState("");
  const [privateDate, setPrivateData] = useState("");

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/login");
    }

    const fetchPrivateData = async () => {
      const config = {
        headers: {
          "Contet-Type": "aplicattion/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      try {
        const { data } = await axios.get("/api/private", config);
        setPrivateData(data.data);
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You aren´t authorized please login");
      }
    };
    fetchPrivateData();
  }, [history]);

  const logoutHandler = () => {
    localStorage.removeItem("authToken");
    history.push("/login");
  };

  return error ? (
    <span>{error}</span>
  ) : (
    <>
      {privateDate}
      <button onClick={logoutHandler}>Logout</button>
    </>
  );
};

export default PrivateScreen;
