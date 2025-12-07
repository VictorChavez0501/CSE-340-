const pool = require('../database/connection');

// =======================
// CLASIFICACIONES
// =======================

async function getClassifications() {
  const sql = `
    SELECT classification_id, classification_name
    FROM classification
    ORDER BY classification_name
  `;
  return await pool.query(sql);
}

async function addClassification(classification_name) {
  const sql = `
    INSERT INTO classification (classification_name)
    VALUES ($1)
    RETURNING classification_id, classification_name
  `;
  const values = [classification_name];
  const result = await pool.query(sql, values);
  return result.rows[0];
}

// =======================
// INVENTARIO
// =======================

async function addInventoryItem(item) {
  const sql = `
    INSERT INTO inventory
      (inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail,
       inv_price, inv_miles, inv_color, classification_id)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
    RETURNING inv_id;
  `;

  const values = [
    item.inv_make,
    item.inv_model,
    item.inv_year,
    item.inv_description,
    item.inv_image,
    item.inv_thumbnail,
    item.inv_price,
    item.inv_miles,
    item.inv_color,
    item.classification_id
  ];

  const result = await pool.query(sql, values);
  return result.rows[0];
}

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

// Obtener inventario por clasificación
async function getInventoryByClassificationId(classificationId) {
  try {
    const sql = `
      SELECT *
      FROM inventory
      WHERE classification_id = $1
      ORDER BY inv_make ASC
    `
    const result = await pool.query(sql, [classificationId])
    return result.rows
  } catch (error) {
    console.error("getInventoryByClassificationId error:", error)
    throw error
  }
}

// =======================
// EXPORTS ÚNICOS
// =======================

module.exports = {
  getInventory,
  getVehicleById,
  addClassification,
  addInventoryItem,
  getInventoryByClassificationId
}
