const { Pool } = require("pg")

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
})

// Helper function for queries
pool.on("connect", () => {
  console.log("Connected to the database")
})

module.exports = pool
