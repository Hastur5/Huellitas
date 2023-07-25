const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "Introduce tu nombre."],
  },
  email: {
    type: String,
    required: [true, "Ingresa una dirección de correo válida."],
  },
  password: {
    type: String,
    required: [true, "Añade tu password."],
  },
  direccion: {
    type: String,
    required: [true, "Introduce tu dirección, por favor."],
  },
  telefono: {
    type: Number,
    required: [true, "Añade tu número telefónico."],
  },
});

module.exports = mongoose.model("User", userSchema);
