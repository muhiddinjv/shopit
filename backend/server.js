import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import productRouter from "./routes/productsRoutes.js";
import dotenv from "dotenv";
import connectdb from "./utils/connectdb.js";
import errorMiddleware from "./middlewares/errors.js";

dotenv.config();
connectdb();

const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routes
app.use("/api/products/", productRouter);

//middleware
app.use(errorMiddleware);

//create port
const { PORT, NODE_ENV } = process.env;

//listen
app.listen(PORT, () => {
  console.log(
    `server running on port http://localhost:${PORT} in ${NODE_ENV} mode`
  );
});
