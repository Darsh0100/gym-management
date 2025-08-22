import express from "express";
import { getPlans } from "../controllers/plans.controllers.js";

const router = express.Router();

router.get("/allplans", getPlans);

export default router;