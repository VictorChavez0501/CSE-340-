const express = require("express");
require("dotenv").config();
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const auth = require("./middleware/auth");

const app = express();

// ============================
// Middleware para parsear datos del formulario
// ============================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ============================
// Configuración de sesiones y flash
// ============================
app.use(
  session({
    secret: "superSecretKey",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);

// ============================
// Cookie parser (necesario para JWT)
// ============================
app.use(cookieParser());

// ============================
// Middleware de autenticación global (ahora sí después de session + cookies)
// ============================

// ============================
// Variables globales para EJS
// ============================
app.use((req, res, next) => {
  res.locals.loggedin = req.session.loggedin || false;
  res.locals.account = req.session.account || null;
  next();
});

app.use(flash());

app.use((req, res, next) => {
  res.locals.notice = req.flash("notice");
  next();
});

// ============================
// View engine
// ============================
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ============================
// Static files
// ============================
app.use(express.static(path.join(__dirname, "public")));

// ============================
// Home route
// ============================
app.get("/", (req, res) => {
  res.render("index", { title: "Home | CSE Motors" });
});

// ============================
// Inventory routes
// ============================
const inventoryRoute = require("./routes/inventoryRoute");
app.use("/inv", inventoryRoute);

// ============================
// Account routes
// ============================
const accountRoute = require("./routes/accountRoute");
app.use("/account", accountRoute);

// ============================
// 404 Error handler
// ============================
app.use((req, res, next) => {

  res.locals.loggedin = req.session?.loggedin || false;
  res.locals.account = req.session?.account || null;

  res.status(404).render("errors/404", { 
    title: "404 - No encontrado" 
  });
});

// ============================
// 500 Error handler
// ============================
app.use((err, req, res, next) => {
  console.error(err);

  res.locals.loggedin = req.session?.loggedin || false;
  res.locals.account = req.session?.account || null;

  res.status(500).render("errors/500", {
    title: "500 - Error del servidor",
    message: "Ocurrió un error interno en el servidor"
  });
});

// ============================
// Start server
// ============================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

const favoritesRoute = require("./routes/favoritesRoute");
app.use("/favorites", favoritesRoute);
