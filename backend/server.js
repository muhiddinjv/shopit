import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import productRouter from "./routes/productsRoutes.js";

dotenv.config();

// connect with mongodb
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routes
app.use("/api/products/", productRouter);

//create port
const PORT = process.env.PORT || 5000;

//listen
app.listen(PORT, () => {
  console.log(`server running on port: http://localhost:${PORT}`);
});

/*  
    Keybindings: https://gist.github.com/espenbjorkeng/484871484d4bf13ce23d8d115e2e8ef5
    Edit shortcuts: CTRL+SHIFT+P > Preferences: Open Keyboard Shortcuts (JSON)
    ALT + I/J/K/L: Move cursor up/left/down/right
    ALT + SHIFT + I/J/K/L: Mark lines/characters while moving character up/left/down/right
    ALT + CTRL + J/L: Move cursor to start/end of word
    SHIFT + CTRL + I/K: Move marked- or current line up/down
    CTRL + J/L: Move cursor to start/end of line
    ALT + SHIFT + O: Mark characters from cursor to end of line
    ALT + SHIFT + U: Mark characters from cursor to start of line
    CTRL + I/K: Add cursor on line above/below the current cursor position
*/
