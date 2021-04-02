import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import movementsRoutes from "./routes/auth.js";
import getPrivateRoute from "./routes/private.js";
import connectDB from "./config/db.js";
import errorHandler from "./middleware/error.js";

dotenv.config();
connectDB();

const app = express();

app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(express.json());

app.use("/api/auth", movementsRoutes);
app.use("/api/private", getPrivateRoute);

//Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => console.log(`Running on port ${PORT}`));

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error al logearse ${err}`);
  server.close(() => process.exit(1));
});
