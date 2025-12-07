const express = require("express");
const router = new express.Router();
const invController = require("../controllers/inventoryController");

// Rutas principales
router.get("/", invController.buildManagement);

// Por clasificación
router.get("/type/:classificationId", invController.buildByClassification);

// Detalle de vehículo
router.get("/detail/:inventoryId", invController.buildDetailView);

// Mostrar management
router.get("/", invController.buildManagement);

// ADD classification (form)
router.get("/add-classification", invController.buildAddClassification);
router.post("/add-classification", invController.addClassification);

// ADD inventory (form)
router.get("/add-inventory", invController.buildAddInventory);
router.post("/add-inventory", invController.addInventory);

// existing classification / detail routes remain...
router.get("/type/:classificationId", invController.buildByClassification);
router.get("/detail/:inventoryId", invController.buildDetailView);

module.exports = router;
