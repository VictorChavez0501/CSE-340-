const utilities = require("../utilities/");
const accountModel = require("../models/account-model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

/* ================================
 *  VISTA LOGIN
 * ================================ */
async function buildLogin(req, res) {
  let nav = await utilities.getNav();
  res.render("account/login", {
    title: "Login",
    nav,
    errors: null,
  });
}

/* ================================
 *  PROCESS LOGIN
 * ================================ */
async function accountLogin(req, res) {
  let nav = await utilities.getNav()
  const { account_email, account_password } = req.body

  const accountData = await accountModel.getAccountByEmail(account_email)

console.log("EMAIL:", account_email)
console.log("PASSWORD INGRESADA:", account_password)
console.log("HASH DB:", accountData.account_password)

  if (!accountData) {
    req.flash("notice", "❌ Email o contraseña incorrectos.")
    return res.render("account/login", {
      title: "Login",
      nav,
      errors: null,
    })
  }

  const passwordMatch = await utilities.comparePassword(
    account_password,
    accountData.account_password
  )

  if (!passwordMatch) {
    req.flash("notice", "❌ Email o contraseña incorrectos.")
    return res.render("account/login", {
      title: "Login",
      nav,
      errors: null,
    })
  }

  // ✅ LOGIN CORRECTO
  const accessToken = jwt.sign(
    {
      account_id: accountData.account_id,
      account_firstname: accountData.account_firstname,
      account_lastname: accountData.account_lastname,
      account_email: accountData.account_email,
      account_type: accountData.account_type,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1h" }
  )

  res.cookie("jwt", accessToken, { httpOnly: true })
  return res.redirect("/account/")
}

/* ================================
 *  ACCOUNT MANAGEMENT
 * ================================ */
async function buildAccountManagement(req, res) {
  let nav = await utilities.getNav();

  const account = res.locals.account;

res.render("account/account", {
  title: "Account Management",
  nav,
  account,
  errors: null,
});
}

/* ================================
 *  BUILD UPDATE ACCOUNT VIEW
 * ================================ */
async function buildUpdateAccount(req, res) {
  const account_id = req.params.account_id;
  let nav = await utilities.getNav();

  const accountData = await accountModel.getAccountById(account_id);

  res.render("account/update", {
  title: "Update Account",
  nav,
  account: accountData,
  errors: null,
});
}

/* ================================
 *  UPDATE ACCOUNT
 * ================================ */
async function updateAccount(req, res) {
  let nav = await utilities.getNav();

  const { account_id, account_firstname, account_lastname, account_email } =
    req.body;

  const updateResult = await accountModel.updateAccount(
    account_firstname,
    account_lastname,
    account_email,
    account_id
  );

  if (updateResult) {
    req.flash("notice", "✅ Cuenta actualizada correctamente.");
    return res.redirect("/account/");
  }

  req.flash("notice", "❌ Error al actualizar la cuenta.");
  res.render("account/update", {
  title: "Update Account",
  nav,
  account: {
    account_id,
    account_firstname,
    account_lastname,
    account_email
  },
  errors: null,
});
}

/* ================================
 *  UPDATE PASSWORD
 * ================================ */
async function updatePassword(req, res) {
  let nav = await utilities.getNav();
  const { account_id, account_password } = req.body;

  const hashedPassword = await utilities.hashPassword(account_password);

  const result = await accountModel.updatePassword(
    hashedPassword,
    account_id
  );

  if (result) {
    req.flash("notice", "✅ Contraseña actualizada correctamente.");
    return res.redirect("/account/");
  }

  req.flash("notice", "❌ Error al actualizar la contraseña.");
  res.render("account/account", {
    title: "Account Management",
    nav,
    errors: null,
  });
}

/* ================================
 *  LOGOUT
 * ================================ */
function logout(req, res) {
  res.clearCookie("jwt");
  req.session.destroy();
  res.redirect("/");
}

module.exports = {
  buildLogin,
  accountLogin,
  buildAccountManagement,
  buildUpdateAccount,
  updateAccount,
  updatePassword,
  logout,
};
