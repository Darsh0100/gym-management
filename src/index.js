import mongoose from "mongoose";
import express from "express";
import connectdb from "./db/index.js";
import dotenv from "dotenv";
import create_userRoutes from "../routes/create_user.routes.js";
import adminRoutes from "../routes/admin.routes.js";

connectdb();

dotenv.config({ path: "./.env" });

const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
  res.send("SERVER IS RUNNING !!!");
  console.log("SERVER IS FINE AND KICKING");
});

//Routes
app.use("/api", create_userRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT: ${PORT}`);
});
