const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const User = require("../models/User");

const loginAuth = async (req, res, next) => {
  try {
    //   get the token from the authorization header
    const token = await req.headers.authorization.split(" ")[1];
    //check if the token matches the supposed origin
    const decodedToken = jwt.verify(token, JWT_SECRET);
    // retrieve the user details of the logged in user
    const payload = decodedToken;
    const user = await User.findById(payload?.userId).exec();
    // pass the user down to the endpoints here
    req.user = user;
    // pass down functionality to the endpoint
    next();
  } catch (error) {
    res.json({
      ok: false,
      message: "You don't have permission!",
    });
  }
};

const adminAuth = async (req, res, next) => {
  try {
    // Check permission
    if (!req.user.isAdmin) {
      throw new Error("You don't have permission!");
    }
    next();
  } catch (error) {
    res.json({
      ok: false,
      message: error.message,
    });
  }
};

module.exports = {
  loginAuth,
  adminAuth,
};
