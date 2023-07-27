const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const app = express();
const port = 3000; //
const { errorHandler } = require("./middleware/errorMiddleware");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/users", require("./routes/user.routes"));
app.use("/mascotas", require("./routes/mascota.routes"));
app.use("/veterinarios", require("./routes/veterinario.routes"));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`ABEMUS API ${port}`);
  console.log(1, process.env.URI_MONGO);
});

async function main() {
  await mongoose.connect(process.env.URI_MONGO);

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

main().catch((err) => console.log(err));
