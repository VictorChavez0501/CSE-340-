const express = require("express");
require("dotenv").config();
const path = require("path");
const session = require("express-session");  // <-- nuevo
const flash = require("connect-flash");      // <-- nuevo

const app = express();

// ============================
// Middleware para parsear datos de forms
// ============================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ============================
// Configuración de sesiones y flash
// ============================
app.use(
  session({
    secret: "superSecretKey", // cambia esto por algo seguro
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }, // duración de la sesión (ms)
  })
);

app.use(flash());

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
// Middleware 404 (SIEMPRE al final)
// ============================
app.use((req, res, next) => {
  res.status(404).render("errors/404", { 
    title: "404 - No encontrado" 
  });
});

// ============================
// Middleware de errores (SIEMPRE al final)
// ============================
app.use((err, req, res, next) => {
  console.error(err);
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
