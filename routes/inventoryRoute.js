const express = require("express");
const router = new express.Router();
const invController = require("../controllers/inventoryController");

// Vista de management
router.get("/", invController.buildManagement);

// Por clasificación
router.get("/type/:classificationId", invController.buildByClassification);

// Detalle de vehículo
router.get("/detail/:inventoryId", invController.buildDetailView);

// ADD classification
router.get("/add-classification", invController.buildAddClassification);
router.post("/add-classification", invController.addClassification);

// ADD inventory
router.get("/add-inventory", invController.buildAddInventory);
router.post("/add-inventory", invController.addInventory);

module.exports = router;
