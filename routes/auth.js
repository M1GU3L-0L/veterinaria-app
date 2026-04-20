const express = require("express");
const router = express.Router();
const pool = require("../db/postgres");

router.post("/login", async (req, res) => {
  const { correo, password } = req.body;

  const result = await pool.query(
    "SELECT * FROM usuarios WHERE correo=$1 AND password=$2",
    [correo, password]
  );

  if (result.rows.length > 0) {
    res.send("Login correcto");
  } else {
    res.status(401).send("Datos incorrectos");
  }
});

module.exports = router;