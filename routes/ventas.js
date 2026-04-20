const express = require("express");
const router = express.Router();
const Venta = require("../models/Venta");

// CREAR
router.post("/", async (req, res) => {
  const { producto, precio, cantidad, fecha } = req.body;

  if(!producto || !precio || !cantidad || !fecha){
    return res.status(400).send("Campos incompletos");
  }

  if(precio <= 0 || cantidad <= 0){
    return res.status(400).send("Valores inválidos");
  }

  try {
    const nueva = new Venta(req.body);
    await nueva.save();
    res.send(nueva);
  } catch (error) {
    res.status(500).send("Error al guardar");
  }
});

// LEER
router.get("/", async (req, res) => {
  const ventas = await Venta.find();
  res.send(ventas);
});

// ACTUALIZAR
router.put("/:id", async (req, res) => {
  const venta = await Venta.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(venta);
});

// ELIMINAR
router.delete("/:id", async (req, res) => {
  await Venta.findByIdAndDelete(req.params.id);
  res.send("Eliminado");
});

const PDFDocument = require("pdfkit");

// GENERAR PDF
router.get("/reporte", async (req, res) => {
  const ventas = await Venta.find();

  const doc = new PDFDocument();

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=reporte.pdf");

  doc.pipe(res);

  doc.fontSize(18).text("Reporte de Ventas Veterinaria", { align: "center" });
  doc.moveDown();

  ventas.forEach(v => {
    doc.text(`Producto: ${v.producto}`);
    doc.text(`Precio: ${v.precio}`);
    doc.text(`Cantidad: ${v.cantidad}`);
    doc.text(`Fecha: ${v.fecha}`);
    doc.moveDown();
  });

  doc.end();
});

module.exports = router;