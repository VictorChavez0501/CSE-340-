const utilities = require("../utilities")

const invController = {}

invController.buildManagement = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("inventory/management", {
    title: "Inventory Management",
    nav,
  })
}

module.exports = invController
