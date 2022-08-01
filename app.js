require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const sendMessage = require("./controller/message");
const connectDB = require("./db/connect");
const errorHandlerMiddleware = require("./middleware/error-handler");
const bodyParser = require("body-parser");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.post("/sendmessage", sendMessage);

app.use(errorHandlerMiddleware);
const port = process.env.PORT || 5000;
const start = async (req, res) => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log("server @ 5000...");
    });
  } catch (error) {
    console.log(error);
  }
};
start();
