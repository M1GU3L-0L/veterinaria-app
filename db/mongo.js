const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_PUBLIC_URL)
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.log(err));