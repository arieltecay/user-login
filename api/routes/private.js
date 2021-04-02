import express from "express";
import { getPrivateRoute } from "../controllers/private.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();
router.get("/",protect, getPrivateRoute);

export default router;
