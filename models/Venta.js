const mongoose = require("mongoose");

const VentaSchema = new mongoose.Schema({
  producto: String,
  precio: Number,
  cantidad: Number,
  fecha: String
});

module.exports = mongoose.model("Venta", VentaSchema);