const inventoryModel = require('../models/inventory-model');
const utilities = require('../utilities/index');

/* ================= MANAGEMENT ================= */
async function buildManagement(req, res, next) {
  try {
    const inventory = await inventoryModel.getInventory();
    res.render('inventory/management', {
      title: 'Inventory Management',
      inventory,
      message: res.locals.message
    });
  } catch (error) {
    next(error);
  }
}

/* ================= ADD CLASSIFICATION (GET) ================= */
async function buildAddClassification(req, res, next) {
  try {
    res.render('inventory/add-classification', {
      title: 'Add Classification',
      message: res.locals.message,
      errors: null,
      classification_name: ''
    });
  } catch (error) {
    next(error);
  }
}

/* ================= ADD CLASSIFICATION (POST) ================= */
async function addClassification(req, res, next) {
  try {
    const { classification_name } = req.body;

    if (!classification_name || !utilities.isAlphaNumNoSpace(classification_name)) {
      const errors = ['Classification name must be letters/numbers only (no spaces or special chars).'];
      return res.status(400).render('inventory/add-classification', {
        title: 'Add Classification',
        errors,
        classification_name,
        message: null
      });
    }

    const inserted = await inventoryModel.addClassification(classification_name);

    req.session.message = {
      type: 'success',
      content: `Classification "${inserted.classification_name}" added successfully.`
    };

    res.redirect('/inv');
  } catch (error) {
    next(error);
  }
}

/* ================= ADD INVENTORY (GET) ================= */
async function buildAddInventory(req, res, next) {
  try {
    const classificationList = await utilities.buildClassificationList();
    res.render('inventory/add-inventory', {
      title: 'Add Vehicle',
      classificationList,
      errors: null,
      inv_make: '',
      inv_model: '',
      inv_year: '',
      inv_description: '',
      inv_image: '/images/vehicles/no-image-available.png',
      inv_thumbnail: '/images/vehicles/no-image-available-tn.png',
      inv_price: '',
      inv_miles: '',
      inv_color: '',
      classification_id: ''
    });
  } catch (error) {
    next(error);
  }
}

/* ================= ADD INVENTORY (POST) ================= */
async function addInventory(req, res, next) {
  try {
    const {
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
      classification_id
    } = req.body;

    const errors = [];
    if (!inv_make) errors.push('Make is required.');
    if (!inv_model) errors.push('Model is required.');
    if (!inv_year || !/^\d{4}$/.test(inv_year)) errors.push('Year must be 4 digits.');
    if (!inv_description) errors.push('Description is required.');
    if (!inv_image) errors.push('Image path is required.');
    if (!inv_thumbnail) errors.push('Thumbnail path is required.');
    if (!inv_price || isNaN(inv_price)) errors.push('Price must be a number.');
    if (!inv_miles || isNaN(inv_miles)) errors.push('Miles must be a number.');
    if (!inv_color) errors.push('Color is required.');
    if (!classification_id) errors.push('Select a classification.');

    if (errors.length) {
      const classificationList = await utilities.buildClassificationList(classification_id);
      return res.status(400).render('inventory/add-inventory', {
        title: 'Add Vehicle',
        classificationList,
        errors,
        inv_make, inv_model, inv_year, inv_description,
        inv_image, inv_thumbnail, inv_price,
        inv_miles, inv_color, classification_id
      });
    }

    const newItem = {
      inv_make: utilities.sanitizeText(inv_make),
      inv_model: utilities.sanitizeText(inv_model),
      inv_year: inv_year,
      inv_description: utilities.sanitizeText(inv_description),
      inv_image,
      inv_thumbnail,
      inv_price: Number(inv_price),
      inv_miles: Number(inv_miles),
      inv_color: utilities.sanitizeText(inv_color),
      classification_id: Number(classification_id)
    };

    const inserted = await inventoryModel.addInventoryItem(newItem);

    req.session.message = {
      type: 'success',
      content: `Vehicle added successfully (ID: ${inserted.inv_id}).`
    };

    res.redirect('/inv');
  } catch (error) {
    next(error);
  }
}

/* ================= BY CLASSIFICATION ================= */
async function buildByClassification(req, res, next) {
  try {
    const classificationId = req.params.classificationId;
    res.send(`Clasificación ${classificationId} (pendiente)`);
  } catch (error) {
    next(error);
  }
}

/* ================= VEHICLE DETAIL ================= */
async function buildDetailView(req, res, next) {
  try {
    const invId = req.params.inventoryId;
    const vehicle = await inventoryModel.getVehicleById(invId);

    if (!vehicle) {
      const error = new Error("Vehículo no encontrado");
      error.status = 404;
      return next(error);
    }

    res.render("inventory/detail", {
      title: `${vehicle.inv_make} ${vehicle.inv_model}`,
      vehicle
    });
  } catch (error) {
    next(error);
  }
}

/* ================= EXPORTS ================= */
module.exports = {
  buildManagement,
  buildAddClassification,
  addClassification,
  buildAddInventory,
  addInventory,
  buildByClassification,
  buildDetailView
};
