import mongoose from "mongoose";
import express from "express";
import connectdb from "./db/index.js";
import dotenv from "dotenv";
connectdb();

dotenv.config({ path: "./.env" });

const app = express();

app.get("/", async (req, res) => {
  res.send("chal rha hai ");
  console.log("okie");
});
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("sun rha hun na");
});
