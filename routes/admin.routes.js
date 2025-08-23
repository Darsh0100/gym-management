import express from "express";
import { protect, authorize } from "../middlewares/authUser.middlewares.js";
import { getAllUser } from "../controllers/userControllers.js";
const router = express.Router();

router.get("/getallusers", protect, authorize("admin"), getAllUser);
export default router;
