app.get("/ping", (req, res) => {
  res.send("✅ Ping OK");
});

const express = require("express");
require("dotenv").config();
const app = express();
const path = require("path");

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static files
app.use(express.static(path.join(__dirname, "public")));

const session = require('express-session');

// session (flash messages)
app.use(session({
  secret: process.env.SESSION_SECRET || 'change_this_secret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 600000 } // 10 minutos
}));

// middleware para exponer mensajes a las vistas y limpiar
app.use((req, res, next) => {
  res.locals.message = req.session.message || null;
  delete req.session.message;
  next();
});

// Home route
app.get("/", (req, res) => {
  res.render("index", { title: "Home | CSE Motors" });
});

// Inventory routes
const inventoryRoute = require("./routes/inventoryRoute");
app.use("/inv", inventoryRoute);

// 🔴 Middleware 404 (SIEMPRE al final)
app.use((req, res, next) => {
  res.status(404).render("errors/404", { 
    title: "404 - No encontrado" 
  });
});

// 🔴 Middleware de errores (SIEMPRE al final)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render("errors/500", {
    title: "500 - Error del servidor",
    message: "Ocurrió un error interno en el servidor"
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

app.get("/test", (req, res) => {
  res.send("Servidor funcionando correctamente ✅");
});
