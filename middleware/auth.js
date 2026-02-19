const jwt = require("jsonwebtoken");
require("dotenv").config();

function checkJWTToken(req, res, next) {
  const token = req.cookies?.jwt;

  console.log("🔐 COOKIE JWT:", token);

  if (!token) {
    res.locals.loggedin = false;
    res.locals.account = null;
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    res.locals.loggedin = true;
    res.locals.account = decoded;

    console.log("👤 RES.LOCALS.LOGGEDIN:", res.locals.loggedin);
    console.log("👤 RES.LOCALS.ACCOUNT:", res.locals.account);

    next();
  } catch (err) {
    console.error("❌ JWT inválido:", err.message);
    res.locals.loggedin = false;
    res.locals.account = null;
    next();
  }
}

module.exports = { checkJWTToken };