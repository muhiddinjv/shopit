import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import connectdb from "./config/connectdb.js";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import errorMiddleware from "./middlewares/errors.js";

//handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.stack}`);
  console.log("Shutting down due to uncaught exception");
  process.exit(1);
});

// dotenv.config();
dotenv.config({ path: "config/config.env" });
connectdb();

const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routes
app.use("/api", productRouter);
app.use("/api", orderRouter);
app.use("/api", userRouter);

//middleware
app.use(errorMiddleware);

//create port
const { PORT, NODE_ENV } = process.env;

//listen
const server = app.listen(PORT, () => {
  console.log(
    `server running on port http://localhost:${PORT} in ${NODE_ENV} mode`
  );
});

//Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
