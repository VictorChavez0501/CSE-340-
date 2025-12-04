const invModel = require("../models/inventory-model");
const utilities = require("../utilities");

const invCont = {};

// Mostrar gestión de inventario
invCont.buildManagement = async function (req, res) {
  try {
    const data = await invModel.getInventory();
    const nav = await utilities.getNav();
    res.render("inventory/management", {
      title: "Inventory Management",
      nav,
      data,
      errors: null
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// Mostrar por clasificación
invCont.buildByClassification = async function (req, res) {
  const classificationId = req.params.classificationId;
  const nav = await utilities.getNav();
  const data = await invModel.getInventoryByClassification(classificationId);

  res.render("inventory/classification", {
    title: "Vehicles",
    nav,
    data
  });
};

// Mostrar detalle
invCont.buildDetailView = async function (req, res) {
  const inventoryId = req.params.inventoryId;
  const nav = await utilities.getNav();
  const vehicle = await invModel.getVehicleById(inventoryId);

  res.render("inventory/detail", {
    title: vehicle.inv_make + " " + vehicle.inv_model,
    nav,
    vehicle
  });
};

module.exports = invCont;
