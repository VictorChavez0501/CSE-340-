const inventoryModel = require('../models/inventory-model')
const utilities = require('../utilities/index')

async function buildManagement(req, res, next) {
  try {
    const inventory = await inventoryModel.getInventory()
    res.render('inventory/management', {
      title: 'Inventory Management',
      inventory,
      message: res.locals.message
    })
  } catch (error) {
    next(error)
  }
}

async function buildAddClassification(req, res, next) {
  try {
    res.render('inventory/add-classification', {
      title: 'Add Classification',
      errors: null,
      classification_name: ''
    })
  } catch (error) {
    next(error)
  }
}

async function addClassification(req, res, next) {
  try {
    const { classification_name } = req.body

    if (!classification_name || !utilities.isAlphaNumNoSpace(classification_name)) {
      return res.status(400).render('inventory/add-classification', {
        title: 'Add Classification',
        errors: ['Invalid classification name'],
        classification_name
      })
    }

    await inventoryModel.addClassification(classification_name)

    req.session.message = { type: 'success', content: 'Classification added successfully' }
    res.redirect('/inv')
  } catch (error) {
    next(error)
  }
}

async function buildAddInventory(req, res, next) {
  try {
    const classificationList = await utilities.buildClassificationList()
    res.render('inventory/add-inventory', {
      title: 'Add Vehicle',
      classificationList,
      errors: null
    })
  } catch (error) {
    next(error)
  }
}

async function addInventory(req, res, next) {
  try {
    await inventoryModel.addInventoryItem(req.body)
    req.session.message = { type: 'success', content: 'Vehicle added successfully' }
    res.redirect('/inv')
  } catch (error) {
    next(error)
  }
}

async function buildDetailView(req, res, next) {
  try {
    const invId = req.params.inventoryId
    const vehicle = await inventoryModel.getVehicleById(invId)

    if (!vehicle) {
      return next(new Error('Vehicle not found'))
    }

    res.render('inventory/detail', {
      title: `${vehicle.inv_make} ${vehicle.inv_model}`,
      vehicle
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  buildManagement,
  buildAddClassification,
  addClassification,
  buildAddInventory,
  addInventory,
  buildDetailView
}
