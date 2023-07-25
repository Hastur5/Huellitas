const asyncHandler = require("express-async-handler");
const Mascota = require("../models/mascotaModel");

const getMascotas = asyncHandler(async (req, res) => {
  const mascotas = await Mascota.find({ user: req.user.id });
  res.status(200).json(mascotas);
});
const setMascotas = asyncHandler(async (req, res) => {
  // console.log(req.body);
  if (!req.body.name || !req.body.price) {
    res.status(400);
    throw new Error("Favor de teclear la descripcion del producto ");
  }
  // res.status(201).json({mensaje: 'Crear un Producto'})
  const mascota = await Mascota.create({
    name: req.body.name,
    price: req.body.price,
    user: req.user.id,
  });
  res.status(201).json(mascota);
});
const updateMascotas = asyncHandler(async (req, res) => {
  const mascota = await Mascota.findById(req.params.id);

  if (!mascota) {
    res.status(400);
    throw new Error("Producto no encontrado");
  }

  if (mascota.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error(
      "Acceso No Autorizado, el prodcto no pertenece al usuario logeado"
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
    throw new Error("Producto no encontrado");
  }

  if (mascota.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error(
      "Acceso No Autorizado, el producto no pertenece al usuario logeado"
    );
  }

  await Mascota.deleteOne();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getMascotas,
  setMascotas,
  updateMascotas,
  deleteMascotas,
};