const userModel = require("../models/user.model");
const blacklistTokenModel = require("../models/blacklist.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerUserController(req, res) {
  const { username, email, password } = req.body;

  if (!email || !username || !password) {
    return res
      .status(400)
      .json({ message: "Please Provide Email , Username and Password" });
  }

  const isUserExist = await userModel.findOne({
    $or: [{ email }, { username }],
  });
  if (isUserExist) {
    return res.status(400).json({ message: "User already exists" });
  }
  const hash = await bcrypt.hash(password, 10);

  try {
    const user = await userModel.create({
      username,
      email,
      password: hash,
    });

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" },
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    res.status(201).json({
      message: "User created successfully",
      userDetals: {
        username: user.username,
        email: user.email,
        id: user._id,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function loginUserController(req, res) {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return res.status(400).json({ message: "Password does not match" });
  }

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1d" },
  );
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });
  res.status(201).json({
    message: "User logged in successfully",
    userDetals: { username: user.username, email: user.email, id: user._id },
  });
}

async function logoutUserController(req, res) {
  const token = req.cookies.token;
  if (token) {
    await blacklistTokenModel.create({ token });
  }
  res.clearCookie("token");
  res.status(201).json({ message: "User logged out successfully" });
}

async function getMeController(req, res) {
  const uesr = await userModel.findById(req.user.id);
  res.status(200).json({
    message: "User logged in successfully",
    userDetals: { username: uesr.username, email: uesr.email, id: uesr._id },
  });
}

module.exports = {
  registerUserController,
  loginUserController,
  logoutUserController,
  getMeController,
};
