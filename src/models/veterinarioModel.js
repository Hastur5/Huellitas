const mongoose = require("mongoose");

const veterinarioSchema = new mongoose.Schema({
    
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
  especialidad: {
    type: String,
    required: [true, "Ingresa la tu especialidad"],
  },
  telefono: {
    type: Number,
    required: [true, "Añade tu número telefónico."],
  },
});

module.exports = mongoose.model("Veterinario", veterinarioSchema);
