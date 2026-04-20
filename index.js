const express = require("express");
const cors = require("cors");

require("./db/mongo");
require("./db/postgres");

const Usuario = require("./models/Usuario");

const app = express(); // 👈 PRIMERO CREAS app

app.use(cors());
app.use(express.json());

// rutas
app.use("/auth", require("./routes/auth"));
app.use("/ventas", require("./routes/ventas"));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/login.html");
});

// 👇 DESPUÉS de crear app
app.get("/usuarios", async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).send("Error");
  }
});

app.get("/crear-admin", async (req, res) => {
  try {
    const usuario = new Usuario({
      correo: "admin@vet.com",
      password: "123456"
    });
    await usuario.save();
    res.send("Usuario creado");
  } catch (error) {
    res.status(500).send("Error");
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});