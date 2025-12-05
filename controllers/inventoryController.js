const inventoryModel = require('../models/inventory-model');
const utilities = require('../utilities');

async function buildVehicleDetailView(req, res, next) {
  try {
    const invId = req.params.invId;
    const vehicle = await inventoryModel.getVehicleById(invId);

    if (!vehicle) {
      const error = new Error('Vehículo no encontrado');
      error.status = 404;
      return next(error);
    }

    const detailHtml = utilities.buildVehicleDetailHTML(vehicle);

    res.render('inventory/detail', {
      title: `${vehicle.inv_make} ${vehicle.inv_model}`,
      vehicle,
      detailHtml
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  buildVehicleDetailView
};
