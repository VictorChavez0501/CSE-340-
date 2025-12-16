const pool = require("../database/connection");

/* Add favorite */
async function addFavorite(account_id, inv_id) {
  const sql = `
    INSERT INTO favorites (account_id, inv_id)
    VALUES ($1, $2)
    ON CONFLICT DO NOTHING
  `;
  return pool.query(sql, [account_id, inv_id]);
}

/* Remove favorite */
async function removeFavorite(account_id, inv_id) {
  const sql = `
    DELETE FROM favorites
    WHERE account_id = $1 AND inv_id = $2
  `;
  return pool.query(sql, [account_id, inv_id]);
}

/* Get favorites by user */
async function getFavoritesByAccount(account_id) {
  const sql = `
    SELECT i.*
    FROM favorites f
    JOIN inventory i ON f.inv_id = i.inv_id
    WHERE f.account_id = $1
  `;
  return pool.query(sql, [account_id]);
}

module.exports = {
  addFavorite,
  removeFavorite,
  getFavoritesByAccount,
};
