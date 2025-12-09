const inventoryModel = require('../models/inventory-model');
const utilities = require('../utilities/index'); 

// ============================
// Vista principal de inventario
// ============================
async function buildManagement(req, res, next) {
  try {
    const nav = await utilities.getNav();
    const message = req.flash("message");

    // ✅ TRAER INVENTARIO DE LA BD
    const inventory = await inventoryModel.getInventory();

    res.render("inventory/management", {
      title: "Inventory Management",
      nav,
      message,
      inventory   // ✅ SE ENVÍA A LA VISTA
    });
  } catch (error) {
    next(error);
  }
}

// ============================
// Por clasificación (placeholder)
// ============================
async function buildByClassification(req, res, next) {
  try {
    const classificationId = req.params.classificationId;
    res.send(`Clasificación ${classificationId} (pendiente de implementar)`);
  } catch (error) {
    next(error);
  }
}

// ============================
// Detalle de vehículo
// ============================
async function buildDetailView(req, res, next) {
  try {
    const nav = await utilities.getNav();
    const invId = req.params.inventoryId;
    const vehicle = await inventoryModel.getVehicleById(invId);

    if (!vehicle) {
      const error = new Error("Vehículo no encontrado");
      error.status = 404;
      return next(error);
    }

    res.render("inventory/detail", {
      title: `${vehicle.inv_make} ${vehicle.inv_model}`,
      nav,
      vehicle
    });

  } catch (error) {
    next(error);
  }
}

// ============================
// Task 2 - Agregar clasificación
// ============================
async function buildAddClassification(req, res, next) {
  try {
    const nav = await utilities.getNav();
    res.render("inventory/add-classification", {
      title: "Add New Classification",
      nav,
      message: req.flash("message"),
      errors: [],
      classification_name: ""   // ✅ ESTO arregla el error
    });
  } catch (error) {
    next(error);
  }
}

// ============================
// Task 2 - Procesar nuevo clasificación (POST)
// ============================
async function addClassification(req, res, next) {
  try {
    const nav = await utilities.getNav();
    const { classification_name } = req.body;

    // Validación: no espacios ni caracteres especiales
    const validName = /^[A-Za-z0-9]+$/.test(classification_name);
    if (!validName) {
      req.flash("message", "Invalid classification name. No spaces or special characters allowed.");
      return res.render("inventory/add-classification", {
        title: "Add New Classification",
        nav,
        message: req.flash("message"),
        classification_name
      });
    }

    // Inserción en la base de datos
    const result = await inventoryModel.addClassification(classification_name);
    if (result.rowCount === 1) {
      req.flash("message", `Classification "${classification_name}" added successfully.`);
      return res.redirect("/inv"); // Regresa a Management
    } else {
      req.flash("message", "Failed to add classification. Try again.");
      return res.render("inventory/add-classification", {
        title: "Add New Classification",
        nav,
        message: req.flash("message"),
        classification_name
      });
    }

  } catch (error) {
    next(error);
  }
}

// ============================
// Task 3 - Agregar inventario
// ============================
async function buildAddInventory(req, res, next) {
  try {
    const nav = await utilities.getNav();
    const classificationList = await utilities.buildClassificationList();

    res.render("inventory/add-inventory", {
      title: "Add New Vehicle",
      nav,
      classificationList,
      message: req.flash("message"),
      errors: [],

      classification_id: "",
      inv_make: "",
      inv_model: "",
      inv_year: "",
      inv_description: "",
      inv_image: "",
      inv_thumbnail: "",
      inv_price: "",
      inv_miles: "",
      inv_color: ""
    });
  } catch (error) {
    next(error);
  }
}

// ============================
// Task 3 - Procesar nuevo inventario (POST)
// ============================
async function addInventory(req, res, next) {
  try {
    const nav = await utilities.getNav();
    const classificationList = await utilities.buildClassificationList();

    const {
      classification_id,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color
    } = req.body;

    // Validación del servidor
    const errors = [];
    if (!classification_id) errors.push({ msg: "Classification is required" });
    if (!inv_make) errors.push({ msg: "Make is required" });
    if (!inv_model) errors.push({ msg: "Model is required" });
    if (!inv_year || isNaN(inv_year) || inv_year < 1900 || inv_year > 2100)
      errors.push({ msg: "Year must be between 1900 and 2100" });
    if (!inv_description) errors.push({ msg: "Description is required" });
    if (!inv_image) errors.push({ msg: "Image path is required" });
    if (!inv_thumbnail) errors.push({ msg: "Thumbnail path is required" });
    if (!inv_price || isNaN(inv_price) || inv_price < 0) errors.push({ msg: "Price must be >= 0" });
    if (!inv_miles || isNaN(inv_miles) || inv_miles < 0) errors.push({ msg: "Miles must be >= 0" });
    if (!inv_color) errors.push({ msg: "Color is required" });

    if (errors.length > 0) {
      return res.render("inventory/add-inventory", {
        title: "Add New Vehicle",
        nav,
        classificationList,
        errors,
        classification_id,
        inv_make,
        inv_model,
        inv_year,
        inv_description,
        inv_image,
        inv_thumbnail,
        inv_price,
        inv_miles,
        inv_color
      });
    }

    // Inserción en la base de datos
    const result = await inventoryModel.addInventory({
      classification_id,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color
    });

    if (result.rowCount === 1) {
      req.flash("message", `Vehicle "${inv_make} ${inv_model}" added successfully.`);
      return res.redirect("/inv"); // Regresa a Management
    } else {
      req.flash("message", "Failed to add vehicle. Try again.");
      return res.render("inventory/add-inventory", {
        title: "Add New Vehicle",
        nav,
        classificationList,
        classification_id,
        inv_make,
        inv_model,
        inv_year,
        inv_description,
        inv_image,
        inv_thumbnail,
        inv_price,
        inv_miles,
        inv_color
      });
    }

  } catch (error) {
    next(error);
  }
}

// ============================
// Exportar todas las funciones
// ============================
module.exports = {
  buildManagement,
  buildByClassification,
  buildDetailView,
  buildAddClassification,
  addClassification,
  buildAddInventory,
  addInventory
};
