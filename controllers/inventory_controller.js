const invModel = require("../models/inventory-model");
const utilities = require("../utilities/");

module.exports = {

  // Vehicles by classification
  async buildByClassification(req, res, next) {
    try {
      const classificationId = parseInt(req.params.classificationId);
      const data = await invModel.getVehiclesByClassification(classificationId);
      const nav = await utilities.getNav();
      const grid = await utilities.buildClassificationGrid(data);

      res.render("inventory/classification", {
        title: "Vehicles",
        nav,
        grid
      });
    } catch (error) {
      next(error);
    }
  },

  // Vehicle detail view
  async buildDetailView(req, res, next) {
    try {
      const invId = parseInt(req.params.invId);
      const vehicle = await invModel.getInventoryById(invId);
      const nav = await utilities.getNav();
      const html = await utilities.buildDetailHTML(vehicle);

      res.render("inventory/detail", {
        title: `${vehicle.inv_make} ${vehicle.inv_model}`,
        nav,
        html,
      });
    } catch (error) {
      next(error);
    }
  }
};
