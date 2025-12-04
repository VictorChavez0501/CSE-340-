const express = require("express");
const router = new express.Router();
const invController = require("../controllers/inventoryController");

// Rutas principales
router.get("/", invController.buildManagement);

// Por clasificación
router.get("/type/:classificationId", invController.buildByClassification);

// Detalle de vehículo
router.get("/detail/:inventoryId", invController.buildDetailView);

module.exports = router;
