import User from "../models/User.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({
      username,
      email,
      password,
    });
    res.status(201).json({ succes: true, user });
  } catch (error) {
    res.stat(500).json({
      succes: false,
      error: error.message,
    });
  }
};
export const login = (req, res) => {
  res.send("Login Routes");
};
export const forgotPassword = (req, res) => {
  res.send("Forgot Password Routes");
};
export const resetPassword = (req, res) => {
  res.send("Register Routes");
};
