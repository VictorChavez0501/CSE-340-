const inventoryModel = require('../models/inventory-model');
const utilities = require('../utilities/index'); // 👈 IMPORTANTE

// Vista principal de inventario
async function buildManagement(req, res, next) {
  try {
    const inventory = await inventoryModel.getInventory();

    res.render('inventory/management', {
      title: 'Inventory Management',
      inventory
    });
  } catch (error) {
    next(error);
  }
}

// Por clasificación (placeholder)
async function buildByClassification(req, res, next) {
  try {
    const classificationId = req.params.classificationId;
    res.send(`Clasificación ${classificationId} (pendiente de implementar)`);
  } catch (error) {
    next(error);
  }
}

// ✅ DETALLE DE VEHÍCULO (YA USANDO utilities)
async function buildDetailView(req, res, next) {
  try {
    const invId = req.params.inventoryId;
    const vehicle = await inventoryModel.getVehicleById(invId);

    if (!vehicle) {
      const error = new Error('Vehículo no encontrado');
      error.status = 404;
      return next(error);
    }

    const vehicleHTML = utilities.buildVehicleDetailHTML(vehicle); // 👈 AQUÍ

    res.render('inventory/detail', {
      title: `${vehicle.inv_make} ${vehicle.inv_model}`,
      vehicleHTML
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  buildManagement,
  buildByClassification,
  buildDetailView
};
