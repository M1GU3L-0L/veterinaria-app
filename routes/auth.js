const express = require("express");
const router = express.Router();
const pool = require("../db/postgres");
const Usuario = require("../models/Usuario"); // 👈 FALTABA

router.post("/login", async (req, res) => {
  const { correo, password } = req.body;

  if(!correo || !password){
    return res.status(400).send("Campos obligatorios");
  }

  try {
    const user = await Usuario.findOne({ correo });

    if(!user || user.password !== password){
      return res.status(401).send("Credenciales incorrectas");
    }

    res.send("Login correcto");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error en login");
  }
});

module.exports = router;