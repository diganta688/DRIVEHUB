require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const auth = require("./routes/Auth/auth");
const EmailValidatorSignup = require("./routes/Auth/EmailValidatorSignup");
const forgetEmailCheck = require("./routes/Auth/forgetEmailCheck");
const resetPassword = require("./routes/Auth/resetPassword");
const host = require("./routes/Host/Host");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const sessionoption = {
  secret: "secret key",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 1 * 24 * 60 * 60 * 1000,
    maxAge: 1 * 24 * 60 * 60 * 1000,
    secure: false,
    sameSite: "lax",
  },
};

app.use(session(sessionoption));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: [process.env.FRONTEND],
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
