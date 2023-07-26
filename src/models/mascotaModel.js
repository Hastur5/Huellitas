const mongoose = require("mongoose");

const mascotaSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    veterinario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Veterinario",
      required: true,
    },
    nombre_mascota: {
      type: String,
      required: [true, "Por favor escribe el nombre de tu mascota."],
    },
    especie_mascota: {
      type: String,
      required: [true, "Por favor escribe la especie de tu mascota."],
    },
    raza_mascota: {
      type: String,
    },
    genero_mascota: {
      type: String,
      required: [true, "Por favor escribe el género de tu mascota."],
    },
    edad_mascota: {
      type: String,
      required: [true, "Por favor escribe la edad de tu mascota."],
    },
    peso_mascota: {
      type: Number,
      required: [true, "Por favor anota el peso de tu mascota."],
    },
    veterinario_mascota: {
      type: String,
    },
    ultima_visita_mascota: {
      type: Date,
      timestamps: true,
    },
    // imagen_mascota: {
    //   type: ,
    // }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Mascota", mascotaSchema);
