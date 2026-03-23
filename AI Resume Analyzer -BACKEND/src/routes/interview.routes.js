const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const interviewControler = require("../controller/interview.Controller");
const upload = require("../middleware/file.middleware");
const interviewRoute = express.Router();

interviewRoute.post(
  "/",
  authMiddleware.authUser,
  upload.single("resume"),
  interviewControler.genrateInterviewReport,
);

module.exports = interviewRoute;
