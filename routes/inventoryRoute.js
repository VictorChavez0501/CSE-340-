const express = require("express");
const router = new express.Router();
const invController = require("../controllers/inventoryController");

// ============================
// Rutas principales
// ============================
router.get("/", invController.buildManagement);

// Por clasificación
router.get("/type/:classificationId", invController.buildByClassification);

// Detalle de vehículo
router.get("/detail/:inventoryId", invController.buildDetailView);

// ============================
// Task 2 - Agregar clasificación
// ============================
// Mostrar formulario
router.get("/add-classification", invController.buildAddClassification);
// Procesar formulario
router.post("/add-classification", invController.addClassification);

// ============================
// Task 3 - Agregar inventario
// ============================
// Mostrar formulario
router.get("/add-inventory", invController.buildAddInventory);
// Procesar formulario
router.post("/add-inventory", invController.addInventory);

module.exports = router;
