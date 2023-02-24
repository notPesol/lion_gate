const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

router.post("/", async (req, res, next) => {
  const response = { ok: true };

  const userData = req.body;

  try {
    const user = await User.findOne({ username: userData?.username }).exec();
    if (!user) {
      throw new Error("Username or Password incorect");
    }

    const isPasswordSame = await bcrypt.compare(userData?.password, user?.password);
    if (!isPasswordSame) {
      throw new Error("Username or Password incorect");
    }

    //   create JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username,
      },
      "SECRET_KEY_OK",
      { expiresIn: "24h" }
    );

    response.payload = {token, isAdmin: user.isAdmin};
  } catch (error) {
    response.ok = false;
    response.message = error.message;
  }

  res.send(response);
});

module.exports = router;
