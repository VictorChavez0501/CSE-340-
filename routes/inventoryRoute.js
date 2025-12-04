const express = require("express");
const router = new express.Router();
const invController = require("../controllers/inventoryController");

// Deliver vehicles by classification
router.get("/type/:classificationId", invController.buildByClassification);

// Deliver vehicle detail view
router.get("/detail/:invId", invController.buildDetailView);

router.get("/", invController.buildManagement)

module.exports = router;

router.get("/throw-error", (req, res, next) => {
  next(new Error("Intentional 500 error test"));
});
