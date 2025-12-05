const pool = require('../database/connection');

// Obtener todo el inventario
async function getInventory() {
  try {
    const sql = `SELECT * FROM inventory ORDER BY inv_id ASC`;
    const result = await pool.query(sql);
    return result.rows;
  } catch (error) {
    console.error("getInventory error:", error);
    throw error;
  }
}

// Obtener vehículo por ID
async function getVehicleById(invId) {
  try {
    const sql = `
      SELECT *
      FROM inventory
      WHERE inv_id = $1
      LIMIT 1
    `;
    const result = await pool.query(sql, [invId]);
    return result.rows[0];
  } catch (error) {
    console.error("getVehicleById error:", error);
    throw error;
  }
}

module.exports = {
  getInventory,
  getVehicleById
};
