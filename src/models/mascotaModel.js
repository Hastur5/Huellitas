const mongoose = require("mongoose");

const mascotaSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: [true, "Por favor escribe el producto que buscas"],
    },
    price: {
      type: Number,
      required: [true, "Por favor digita el precio del producto"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Mascota", mascotaSchema);
