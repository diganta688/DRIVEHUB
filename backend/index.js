require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const auth = require("./auth");
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
