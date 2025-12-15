const pool = require("../database/connection");
const bcrypt = require("bcryptjs");

/* ================================
 *  GET ACCOUNT BY EMAIL
 * ================================ */
async function getAccountByEmail(account_email) {
  try {
    const sql = "SELECT * FROM account WHERE account_email = $1";
    const result = await pool.query(sql, [account_email]);
    return result.rows[0];
  } catch (error) {
    return error.message;
  }
}

/* ================================
 *  GET ACCOUNT BY ID
 * ================================ */
async function getAccountById(account_id) {
  try {
    const sql = "SELECT * FROM account WHERE account_id = $1";
    const result = await pool.query(sql, [account_id]);
    return result.rows[0];
  } catch (error) {
    return error.message;
  }
}

/* ================================
 *  UPDATE ACCOUNT
 * ================================ */
async function updateAccount(
  account_firstname,
  account_lastname,
  account_email,
  account_id
) {
  try {
    const sql =
      "UPDATE account SET account_firstname = $1, account_lastname = $2, account_email = $3 WHERE account_id = $4 RETURNING *";

    const result = await pool.query(sql, [
      account_firstname,
      account_lastname,
      account_email,
      account_id,
    ]);

    return result.rowCount;
  } catch (error) {
    return error.message;
  }
}

/* ================================
 *  UPDATE PASSWORD
 * ================================ */
async function updatePassword(account_password, account_id) {
  try {
    const sql =
      "UPDATE account SET account_password = $1 WHERE account_id = $2";

    const result = await pool.query(sql, [account_password, account_id]);

    return result.rowCount;
  } catch (error) {
    return error.message;
  }
}

module.exports = {
  getAccountByEmail,
  getAccountById,
  updateAccount,
  updatePassword,
};
