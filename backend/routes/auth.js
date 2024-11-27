const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const dataValidator = require("../utils/validator");
// const { body, validationResult } = require("express-validator");

//Register
router.post("/register", async (req, res) => {
  try {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   res.status(400).json({ errors: errors.array() });
    // }

    const { email, password } = req.body;
    const existEmail = await User.findOne({ email });
    if (existEmail) {
      res.status(401).json({ message: "Email already exists!" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    res.status(200).send(newUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json("User not found");
    }
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      return res.status(401).json("Password did not match");
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });
    const { password, ...info } = user._doc;
    res.cookie("token", token).status(200).json(info);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//LOGOUT
router.get("/logout", async (req, res) => {
  try {
    res
      .clearCookie("token", { sameSite: "none", secure: true })
      .status(200)
      .send("User successfully logged out");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//REFETCH
router.get("/refetch", async (req, res) => {
  const token = req.cookies.token;
  jwt.verify(token, process.env.JWT_SECRET, {}, async (error, data) => {
    if (error) {
      return res.status(404).json(error);
    }
    res.status(200).json(data);
  });
});

module.exports = router;
