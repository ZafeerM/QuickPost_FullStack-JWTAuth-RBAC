const pg = require("pg");
const { Pool } = pg;

const pool = new Pool({
  user: "postgres",
  password: "1234",
  host: "localhost",
  port: 5432,
  database: "QuickPost",
});

// Checking Database Connection by trying a query at start
(async () => {
  try {
    await pool.query(`SELECT 1`);
    console.log("Postgres Connected Successfully");
  } catch (error) {
    console.error("Postgres Connection Failed");
    process.exit(-1); //Stop the whole app lol
  }
})();

module.exports = pool;
