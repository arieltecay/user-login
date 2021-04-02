import User from "../models/User.js";
import ErrorResponse from "../utils/errosResponse.js";

export const register = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({
      username,
      email,
      password,
    });
    sendToken(user, 201, res);
  } catch (error) {
    next(error);
  }
};
export const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return MSInputMethodContext(
        new ErrorResponse("Invalid Credentials", 401)
      );
    }
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }
    sendToken(user, 200, res);
  } catch (error) {
    res.status(500).json({ succes: false, error: error.message });
  }
};

export const forgotPassword = (req, res) => {
  res.send("Forgot Password Routes");
};
export const resetPassword = (req, res) => {
  res.send("Register Routes");
};

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  res.status(statusCode).json({ succes: true, token });
};
