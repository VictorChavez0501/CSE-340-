const express = require("express");
const env = require("dotenv").config();
const app = express();
const path = require("path");
const utilities = require("./utilities"); // ✅ IMPORTANTE

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Home route
app.get("/", (req, res) => {
  res.render("index");
});

// Inventory routes
const inventoryRoute = require("./routes/inventoryRoute");
app.use("/inv", inventoryRoute); // Mantienes /inv si así está tu proyecto

// ✅ RUTA DE ERROR INTENCIONAL (TASK 3)
app.get("/error-test", (req, res, next) => {
  try {
    throw new Error("Error intencional de prueba (500)");
  } catch (error) {
    error.status = 500;
    next(error);
  }
});

// ✅ MIDDLEWARE 404 (cuando no existe la ruta)
app.use((req, res, next) => {
  const error = new Error("Página no encontrada");
  error.status = 404;
  next(error);
});

// ✅ MIDDLEWARE GLOBAL DE ERRORES (404 y 500)
app.use(async (err, req, res, next) => {
  console.error(err.stack);

  let nav = await utilities.getNav();

  res.status(err.status || 500).render("errors/error", {
    title: err.status === 404 ? "404 - No encontrado" : "500 - Error del servidor",
    message:
      err.status === 404
        ? "La página que buscas no existe."
        : "Ocurrió un error interno en el servidor.",
    nav,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
