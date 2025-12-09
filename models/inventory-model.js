const pool = require('../database/connection');

// ============================
// OBTENER TODO EL INVENTARIO
// ============================
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

// ============================
// OBTENER VEHÍCULO POR ID
// ============================
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

// ============================
// OBTENER CLASIFICACIONES
// ============================
async function getClassifications() {
  try {
    const sql = "SELECT * FROM classification ORDER BY classification_name";
    const result = await pool.query(sql);
    return result.rows;
  } catch (error) {
    console.error("getClassifications error:", error);
    throw error;
  }
}

// ============================
// AGREGAR CLASIFICACIÓN
// ============================
async function addClassification(classification_name) {
  try {
    const sql = `
      INSERT INTO classification (classification_name)
      VALUES ($1)
    `;
    return await pool.query(sql, [classification_name]);
  } catch (error) {
    console.error("addClassification error:", error);
    throw error;
  }
}

// ============================
// AGREGAR VEHÍCULO
// ============================
async function addInventory(data) {
  try {
    const sql = `
      INSERT INTO inventory
      (classification_id, inv_make, inv_model, inv_year, inv_description,
       inv_image, inv_thumbnail, inv_price, inv_miles, inv_color)
      VALUES
      ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
    `;

    const params = [
      data.classification_id,
      data.inv_make,
      data.inv_model,
      data.inv_year,
      data.inv_description,
      data.inv_image,
      data.inv_thumbnail,
      data.inv_price,
      data.inv_miles,
      data.inv_color
    ];

    return await pool.query(sql, params);
  } catch (error) {
    console.error("addInventory error:", error);
    throw error;
  }
}

// ============================
// EXPORTAR TODO
// ============================
module.exports = {
  getInventory,
  getVehicleById,
  getClassifications,
  addClassification,
  addInventory
};
