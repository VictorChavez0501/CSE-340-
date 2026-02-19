const express = require("express");
require("dotenv").config();
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const auth = require("./middleware/auth");

const app = express();

// ============================
// ✅ NECESARIO PARA RENDER (COOKIES JWT)
// ============================
app.set("trust proxy", 1);

// ============================
// Middleware para parsear datos del formulario
// ============================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ============================
// Configuración de sesiones (solo para flash)
// ============================
app.use(
  session({
    secret: process.env.SESSION_SECRET || "superSecretKey",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);

// ============================
// Cookie parser (JWT)
// ============================
app.use(cookieParser());

// ============================
// 🔐 Middleware JWT GLOBAL (OBLIGATORIO)
// ============================
app.use(auth.checkJWTToken);

// ============================
// Flash messages
// ============================
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
app.get("/", async (req, res) => {
  res.render("index", {
    title: "Home | CSE Motors",
  });
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
// Favorites routes
// ============================
const favoritesRoute = require("./routes/favoritesRoute");
app.use("/favorites", favoritesRoute);

// ============================
// 404 Error handler
// ============================
app.use((req, res) => {
  res.status(404).render("errors/404", {
    title: "404 - Página no encontrada",
  });
});

// ============================
// 500 Error handler
// ============================
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render("errors/500", {
    title: "500 - Error del servidor",
    message: "Ocurrió un error interno en el servidor",
  });
});

// ============================
// Start server
// ============================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});