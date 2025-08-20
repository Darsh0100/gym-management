import mongoose from "mongoose";
import express from "express";
import connectdb from "./db/index.js";
import dotenv from "dotenv";
import create_userRoutes from "gym-management/routes/create_user.routes.js";
connectdb();

dotenv.config({ path: "./.env" });

const app = express();

app.get("/", async (req, res) => {
  res.send("SEVER IS RUNNUNG !!!");
  console.log("SERVER IS FINE AND KICKING");
});

//Routes 
app.use("/api", create_userRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT: ${PORT}`);
});
