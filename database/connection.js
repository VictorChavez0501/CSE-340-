const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

/* ================================
 * Manejo de errores del Pool
 * ================================ */
pool.on("connect", () => {
  console.log("✅ Conectado a PostgreSQL (Render)");
});

pool.on("error", (err) => {
  console.error("❌ Error inesperado en PostgreSQL", err);
  process.exit(1);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
