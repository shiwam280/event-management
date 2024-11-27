const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth");
const eventRoute = require("./routes/event");
require("dotenv").config();
const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5174", credentials: true }));
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/event", eventRoute);

const connectDB = () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("Database connect successfully");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

app.listen(process.env.PORT, () => {
  connectDB();
  console.log("Server Started...");
});
