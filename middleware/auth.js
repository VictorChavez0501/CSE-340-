const jwt = require("jsonwebtoken");
require("dotenv").config();

/* ================================
 *  VERIFICAR LOGIN POR JWT
 * ================================ */
function checkLogin(req, res, next) {
  console.log("🔐 COOKIE JWT:", req.cookies.jwt)
  console.log("👤 RES.LOCALS.LOGGEDIN:", res.locals.loggedin)
  console.log("👤 RES.LOCALS.ACCOUNT:", res.locals.account)

  if (!res.locals.loggedin) {
    console.log("⛔ NO LOGUEADO → REDIRECT LOGIN")
    return res.redirect("/account/login")
  }

  next()
}

/* ================================
 *  VERIFICAR EMPLOYEE O ADMIN
 * ================================ */
function checkEmployeeOrAdmin(req, res, next) {
  if (
    req.account &&
    (req.account.account_type === "Employee" ||
      req.account.account_type === "Admin")
  ) {
    return next();
  }

  req.flash("notice", "⛔ Acceso denegado. No tienes permisos.");
  return res.redirect("/account/login");
}

module.exports = {
  checkLogin,
  checkEmployeeOrAdmin,
};
