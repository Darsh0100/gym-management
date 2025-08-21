import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
} from "../controllers/userControllers.js";

import { protect } from "../middlewares/authUser.middlewares.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);

export default router;
