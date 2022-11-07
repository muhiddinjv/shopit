import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// connect to mongodb
const connectdb = () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("connected to DB");
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export default connectdb;
