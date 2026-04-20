const express = require("express");
const cors = require("cors");

require("./db/mongo");
require("./db/postgres");

const Usuario = require("./models/Usuario");

app.get("/usuarios", async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error obteniendo usuarios");
  }
});

const app = express();
app.use(cors());
app.use(express.json());

// rutas
app.use("/auth", require("./routes/auth"));
app.use("/ventas", require("./routes/ventas"));
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/login.html");
});

app.get("/crear-admin", async (req, res) => {
  try {
    const existe = await Usuario.findOne({ correo: "admin@vet.com" });

    if (existe) {
      return res.send("Usuario ya existe");
    }

    const usuario = new Usuario({
      correo: "admin@vet.com",
      password: "123456"
    });

    await usuario.save();
    res.send("Usuario creado");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error");
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});