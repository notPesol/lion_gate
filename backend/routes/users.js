const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const User = require("../models/User");

// Login User
router.post("/login", async (req, res, next) => {
  const response = { ok: true };
  const userData = req.body;
  console.log(req.body);
  try {
    const user = await User.findOne({ username: userData?.username }).exec();
    if (!user) {
      throw new Error("Username or Password incorect");
    }
    const isPasswordSame = await bcrypt.compare(
      userData?.password,
      user?.password
    );
    if (!isPasswordSame) {
      throw new Error("Username or Password incorect");
    }
    //   create JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username,
      },
      JWT_SECRET,
      { expiresIn: "24h" }
    );
    response.payload = {
      token,
      // message: "success",
      id: user._id,
      username: user.username,
      isAdmin: user.isAdmin,
    };
  } catch (error) {
    response.ok = false;
    response.message = error.message;
  }

  res.json(response);
});

router.post("/register", async (req, res, next) => {
  const response = { ok: true };
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      throw new Error("username and password are required");
    }
    const newPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username: username, password: newPassword });
    await newUser.save();
    response.payload = { message: "success", username };
  } catch (error) {
    response.ok = false;
    response.message = error.message;
  }

  res.json(response);
});

module.exports = router;
