const express = require("express");
const router = new express.Router();
const accountController = require("../controllers/accountController");
const utilities = require("../utilities/");
const auth = require("../middleware/auth");
const accountValidate = require("../utilities/account-validation");

// ✅ Vista Login
router.get("/login", accountController.buildLogin);

// ✅ Procesar Login
router.post(
  "/login",
  accountController.accountLogin
);

// ✅ Vista Account Management (protegida)
router.get("/", auth.checkLogin, accountController.buildAccountManagement);

// ✅ Vista Update Account
router.get(
  "/update/:account_id",
  auth.checkLogin,
  accountController.buildUpdateAccount
);

// ✅ Procesar UPDATE de datos
router.post(
  "/update",
  auth.checkLogin,     // ✅ AQUÍ YA CORREGIDO
  accountValidate.updateAccountRules(),
  accountValidate.checkErrors,
  accountController.updateAccount
);

// ✅ Procesar UPDATE de password
router.post(
  "/update-password",
  auth.checkLogin,     // ✅ AQUÍ YA CORREGIDO
  accountValidate.updatePasswordRules(),
  accountValidate.checkErrors,
  accountController.updatePassword
);

// ✅ LOGOUT
router.get("/logout", accountController.logout);

module.exports = router;
