const jwt = require("jsonwebtoken");
require("dotenv").config();

/* ================================
 *  VERIFICAR LOGIN POR JWT
 * ================================ */
function checkLogin(req, res, next) {
  const token = req.cookies.jwt;

  if (!token) {
    req.flash("notice", "⚠️ Debes iniciar sesión primero.");
    return res.redirect("/account/login");
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.account = decoded;
    res.locals.loggedin = true;
    res.locals.account = decoded;

    next();
  } catch (err) {
    req.flash("notice", "⚠️ Sesión inválida. Inicia sesión nuevamente.");
    return res.redirect("/account/login");
  }
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
