// models/inventory-model.js
const pool = require('../database/connection');

/**
 * Devuelve un vehículo por inv_id
 * @param {number|string} invId
 * @returns {Promise<object|null>}
 */
async function getVehicleById(invId) {
  const sql = `
    SELECT
      inv_id,
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
    FROM inventory
    WHERE inv_id = $1
    LIMIT 1;
  `;
  const params = [invId];

  try {
    const { rows } = await pool.query(sql, params);
    return rows[0] || null;
  } catch (error) {
    console.error('Error en getVehicleById:', error);
    throw error;
  }
}

module.exports = {
  getVehicleById,
};
