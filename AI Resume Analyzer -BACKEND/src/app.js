const express = require("express");
const authRoute = require("./routes/auth.routes");
const interviewRoute = require("./routes/interview.routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

app.use(cookieParser());
app.use(
  cors({
    origin: "https://ai-resume-analyzer-sepia-two.vercel.app", //"http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/interview", interviewRoute);

module.exports = app;
