const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
  correo: String,
  password: String
});

module.exports = mongoose.model("Usuario", usuarioSchema);