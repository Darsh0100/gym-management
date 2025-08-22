import express from "express";
import { getAllUser } from "../controllers/userControllers.js";
import { protect } from "../middlewares/authUser.middlewares.js";
import { adminOnly } from "../middlewares/admin.middleware.js";

const router = express.Router();

router.get("/all-users", protect, adminOnly, getAllUser);

export default router;