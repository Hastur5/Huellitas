const asyncHandler = require("express-async-handler");
const Mascota = require("../models/mascotaModel");

const getMascotas = asyncHandler(async (req, res) => {
  const mascotas = await Mascota.find({ user: req.user.id });
  res.status(200).json(mascotas);
});
const setMascotas = asyncHandler(async (req, res) => {
  // console.log(req.body);
  if (!req.body.nombre_mascota || !req.body.especie_mascota || !req.body.peso_mascota || !req.body.genero_mascota) {
    res.status(400);
    throw new Error("Ingresa los campos requeridos.");
  }
  // res.status(201).json({mensaje: 'Crear un Producto'})
  const mascota = await Mascota.create({
    nombre_mascota: req.body.nombre_mascota,
    especie_mascota: req.body.especie_mascota,
    raza_mascota: req.body.raza_mascota,
    genero_mascota: req.body.genero_mascota,
    edad_mascota: req.body.edad_mascota,
    peso_mascota: req.body.peso_mascota,
    veterinario_mascota: req.body.veterinario_mascota,
    ultima_visita_mascota: req.body.ultima_visita_mascota,
    user: req.user.id,
  });
  res.status(201).json(mascota);
});
const updateMascotas = asyncHandler(async (req, res) => {
  const mascota = await Mascota.findById(req.params.id);

  if (!mascota) {
    res.status(400);
    throw new Error("Mascota no encontrada :(");
  }

  if (mascota.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error(
      "Acceso No Autorizado, esta mascotita no es tuya :("
    );
  }

  const mascotaModify = await Mascota.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(mascotaModify);
});
const deleteMascotas = asyncHandler(async (req, res) => {
  const mascota = await Mascota.findById(req.params.id);
  if (!mascota) {
    res.status(400);
    throw new Error("Mascota no encontrada.");
  }

  if (mascota.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error(
      "Acceso No Autorizado, la mascota no pertenece al usuario logeado"
    );
  }

  await Mascota.deleteOne({ _id: req.params.id });

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getMascotas,
  setMascotas,
  updateMascotas,
  deleteMascotas,
};