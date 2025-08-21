import mongoose, { connect } from "mongoose";
import { DB_NAME } from "../constants.js";
const connectdb = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
    console.log("MONGODB CONNECTED!!");
  } catch (error) {
    console.log("MONGO DB CONNECTION FAILED AWW:", error);
    process.exit(1);
  }
};

export default connectdb;
