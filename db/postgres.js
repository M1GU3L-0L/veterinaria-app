const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "veterinaria",
  password: "1982",
  port: 5432,
});

pool.connect()
  .then(() => console.log("PostgreSQL conectado"))
  .catch(err => console.log(err));

module.exports = pool;