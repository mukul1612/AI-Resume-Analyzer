const jwt = require("jsonwebtoken");
const blacklistTokenModel = require("../models/blacklist.model");

async function authUser(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Token not found" });
  }
  const istokenBlacklisted = await blacklistTokenModel.findOne({ token });
  console.log(istokenBlacklisted,"istokenBlacklisted");
  if (istokenBlacklisted) {
    return res.status(401).json({ message: "Token is Invalid /blacklisted" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = { authUser };
