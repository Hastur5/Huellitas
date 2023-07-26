const mongoose = require("mongoose");

const clinicaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "Introduce el nombre del hospital."],
  },
  direccion: {
    type: String,
    required: [true, "Ingresa la dirección del hospital."],
  },
  telefono: {
    type: Number,
    required: [true, "Añade el número telefónico."],
  },
});

module.exports = mongoose.model("Clinica", clinicaSchema);
