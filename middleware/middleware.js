const { check, validationResult } = require("express-validator");

exports.validateUsers = [
  check("fname").notEmpty().withMessage("First name is required"),
  check("email").notEmpty().withMessage("Email name is required").isEmail().withMessage("It should be email only"),
  check("password").notEmpty().withMessage("Password is required"),
  check("user_role").notEmpty().withMessage("User Role is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Validation errors",
        errors: errors.array(),
      });
    }
    next();
  },
];

exports.validateLoginUsers = [
    check("email").notEmpty().withMessage("Email name is required"),
    check("password").notEmpty().withMessage("Password is required"),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          status: 400,
          message: "Validation errors",
          errors: errors.array(),
        });
      }
      next();
    },
  ];