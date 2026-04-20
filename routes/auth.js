const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../db/postgres");

// REGISTER
router.post("/register", async (req, res) => {
  const { correo, password } = req.body;

  if (!correo || !password) {
    return res.status(400).send("Campos obligatorios");
  }

  if (!correo.includes("@")) {
    return res.status(400).send("Correo inválido");
  }

  if (password.length < 6) {
    return res.status(400).send("La contraseña debe tener al menos 6 caracteres");
  }

  try {
    // Verificar si el correo ya existe
    const existe = await pool.query(
      "SELECT * FROM usuarios WHERE correo = $1",
      [correo]
    );

    if (existe.rows.length > 0) {
      return res.status(409).send("El correo ya está registrado");
    }

    // Encriptar contraseña
    const hash = await bcrypt.hash(password, 10);

    // Insertar en Postgres
    await pool.query(
      "INSERT INTO usuarios (correo, password) VALUES ($1, $2)",
      [correo, hash]
    );

    res.status(201).send("Usuario registrado correctamente");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al registrar");
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const { correo, password } = req.body;

  if (!correo || !password) {
    return res.status(400).send("Campos obligatorios");
  }

  try {
    const result = await pool.query(
      "SELECT * FROM usuarios WHERE correo = $1",
      [correo]
    );

    if (result.rows.length === 0) {
      return res.status(401).send("Credenciales incorrectas");
    }

    const usuario = result.rows[0];

    // Comparar contraseña con el hash
    const coincide = await bcrypt.compare(password, usuario.password);

    if (!coincide) {
      return res.status(401).send("Credenciales incorrectas");
    }

    res.send("Login correcto");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error en login");
  }
});

module.exports = router;