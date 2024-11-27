const { body, validationResult } = require("express-validator");

const dataValidator = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Email must be a valid email")
    .normalizeEmail()
    .toLowerCase(),
  body("password")
    .trim()
    .isLength(4)
    .withMessage("Password length short, min 4 required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = dataValidator;
