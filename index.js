const express = require("express");
const cors = require("cors");

require("./db/mongo");
require("./db/postgres");


const app = express();
app.use(cors());
app.use(express.json());

// rutas
app.use("/auth", require("./routes/auth"));
app.use("/ventas", require("./routes/ventas"));
app.use(express.static("public"));

app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});