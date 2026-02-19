const jwt = require("jsonwebtoken");
require("dotenv").config();

/* ================================
 *  VERIFY JWT TOKEN
 * ================================ */
function checkJWTToken(req, res, next) {
  const token = req.cookies?.jwt;

  if (!token) {
    res.locals.loggedin = false;
    res.locals.account = null;
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    res.locals.loggedin = true;
    res.locals.account = decoded;

    return next();
  } catch (err) {
    console.error("JWT invalid:", err.message);
    res.locals.loggedin = false;
    res.locals.account = null;
    return next();
  }
}

/* ================================
 *  VERIFY USER IS LOGGED IN
 * ================================ */
function checkLogin(req, res, next) {
  if (!res.locals.loggedin) {
    return res.redirect("/account/login");
  }
  return next();
}

/* ================================
 *  VERIFY EMPLOYEE OR ADMIN
 * ================================ */
function checkEmployeeOrAdmin(req, res, next) {
  if (
    res.locals.account &&
    (res.locals.account.account_type === "Employee" ||
     res.locals.account.account_type === "Admin")
  ) {
    return next();
  }

  req.flash("notice", "Access denied.");
  return res.redirect("/account/login");
}

module.exports = {
  checkJWTToken,
  checkLogin,
  checkEmployeeOrAdmin,
};
