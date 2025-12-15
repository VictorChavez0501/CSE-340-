const { body, validationResult } = require("express-validator");

/* ================================
 *  VALIDAR UPDATE ACCOUNT
 * ================================ */
function updateAccountRules() {
  return [
    body("account_firstname")
      .trim()
      .isLength({ min: 2 })
      .withMessage("First name must be at least 2 characters."),

    body("account_lastname")
      .trim()
      .isLength({ min: 2 })
      .withMessage("Last name must be at least 2 characters."),

    body("account_email")
      .isEmail()
      .withMessage("Please provide a valid email address.")
      .normalizeEmail(),
  ];
}

/* ================================
 *  VALIDAR PASSWORD
 * ================================ */
function updatePasswordRules() {
  return [
    body("account_password")
      .isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
      })
      .withMessage(
        "Password must be at least 8 characters and include one uppercase letter, one lowercase letter, and one number."
      ),
  ];
}

/* ================================
 *  CHECK ERRORES
 * ================================ */
function checkErrors(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    req.flash(
      "notice",
      errors.array().map(err => err.msg)
    );
    return res.redirect("back");
  }

  next();
}

module.exports = {
  updateAccountRules,
  updatePasswordRules,
  checkErrors,
};
