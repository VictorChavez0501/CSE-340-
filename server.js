const express = require("express");
require("dotenv").config();
const app = express(); // ✅ PRIMERO se crea app
const path = require("path");
const session = require("express-session");

// ✅ PING PARA RENDER
app.get("/ping", (req, res) => {
  res.send("✅ Ping OK");
});

// ======================
// VIEW ENGINE
// ======================
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ======================
// STATIC FILES
// ======================
app.use(express.static(path.join(__dirname, "public")));

// ======================
// SESSION
// ======================
app.use(
  session({
    secret: process.env.SESSION_SECRET || "change_this_secret",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 600000 },
  })
);

// ======================
// FLASH MESSAGES
// ======================
app.use((req, res, next) => {
  res.locals.message = req.session.message || null;
  delete req.session.message;
  next();
});

// ======================
// HOME
// ======================
app.get("/", (req, res) => {
  res.render("index", { title: "Home | CSE Motors" });
});

// ======================
// ROUTES
// ======================
const inventoryRoute = require("./routes/inventoryRoute");
app.use("/inv", inventoryRoute);

// ======================
// 404
// ======================
app.use((req, res) => {
  res.status(404).render("errors/404", {
    title: "404 - No encontrado",
  });
});

// ======================
// 500
// ======================
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render("errors/500", {
    title: "500 - Error del servidor",
    message: "Ocurrió un error interno en el servidor",
  });
});

// ======================
// SERVER
// ======================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ App listening on port ${PORT}`);
});
