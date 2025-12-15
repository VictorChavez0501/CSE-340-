const express = require("express");
const router = new express.Router();
const invController = require("../controllers/inventoryController");
const auth = require("../middleware/auth");

// ============================
// ✅ INVENTORY MANAGEMENT (PROTEGIDO)
// ============================
router.get(
  "/",
  auth.checkLogin,
  auth.checkEmployeeOrAdmin,
  invController.buildManagement
);

// ============================
// ✅ ADD CLASSIFICATION (PROTEGIDO)
// ============================
router.get(
  "/add-classification",
  auth.checkLogin,
  auth.checkEmployeeOrAdmin,
  invController.buildAddClassification
);

router.post(
  "/add-classification",
  auth.checkLogin,
  auth.checkEmployeeOrAdmin,
  invController.addClassification
);

// ============================
// ✅ ADD INVENTORY (PROTEGIDO)
// ============================
router.get(
  "/add-inventory",
  auth.checkLogin,
  auth.checkEmployeeOrAdmin,
  invController.buildAddInventory
);

router.post(
  "/add-inventory",
  auth.checkLogin,
  auth.checkEmployeeOrAdmin,
  invController.addInventory
);

// ============================
// ✅ RUTAS PÚBLICAS (NO PROTEGIDAS)
// ============================

// Por clasificación (pública)
router.get(
  "/type/:classificationId",
  invController.buildByClassification
);

// Detalle de vehículo (pública)
router.get(
  "/detail/:inventoryId",
  invController.buildDetailView
);

module.exports = router;
