const pool = require("../database/index")

// Obtener todo el inventario
async function getInventory() {
  return await pool.query("SELECT * FROM inventory ORDER BY inv_id");
}

// Por clasificación
async function getInventoryByClassification(classification_id) {
  return await pool.query(
    "SELECT * FROM inventory WHERE classification_id = $1",
    [classification_id]
  );
}

// Por ID
async function getVehicleById(inv_id) {
  const data = await pool.query(
    "SELECT * FROM inventory WHERE inv_id = $1",
    [inv_id]
  );
  return data.rows[0];
}

module.exports = {
  getInventory,
  getInventoryByClassification,
  getVehicleById
};
