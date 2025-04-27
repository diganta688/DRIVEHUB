require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const auth = require("./routes/auth");
const EmailValidatorSignup = require("./routes/EmailValidatorSignup");
const forgetEmailCheck = require("./routes/forgetEmailCheck");
const resetPassword = require("./routes/resetPassword");
const host = require("./routes/Host");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const user = require("./routes/UserInfo");
const payment = require("./routes/orderPayment")

const sessionoption = {
  secret: "secret key",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 1 * 24 * 60 * 60 * 1000,
    maxAge: 1 * 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV === "production" ? true : false,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  },
};

app.use(session(sessionoption));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: [
      process.env.FRONTEND,
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use("/auth", auth);
app.use("/validate", EmailValidatorSignup);
app.use("/forget", forgetEmailCheck);
app.use("/reset", resetPassword);
app.use("/host", host);
app.use("/user", user);
app.use("/pay", payment);



app.listen(process.env.PORT || 8080, () => {
  mongoose
    .connect(process.env.MONGO_URL,{})
    .then(() => {
      console.log("DB connected");
    })
    .catch((error) => {
      console.error(`DB connection error: ${error}`);
    });
});
