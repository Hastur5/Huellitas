const asyncHandler = require("express-async-handler");
const Veterinario = require("../models/veterinarioModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerVeterinario = asyncHandler(async (req, res) => {
  const { nombre, email, password, especialidad, telefono } = req.body;

  if (!nombre & !email & !password & !especialidad & !telefono) {
    res.status(400);
    throw new Error("Favor de verificar que esten todos los datos");
  }

  const veterinarioExist = await Veterinario.findOne({ email });
  if (veterinarioExist) {
    res.status(400);
    throw new Error("Ese email ya fue registrado, el usuario ya existe");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const veterinario = await Veterinario.create({
    nombre,
    email,
    password: hashedPassword,
    especialidad,
    telefono,
  });
  //* Mandamos la respuesta de la funcion
  if (veterinario) {
    res.status(201).json({
      _id: veterinario.id,
      nombre: veterinario.nombre,
      email: veterinario.email,
      especialidad: veterinario.especialidad,
      telefono: veterinario.telefono
    });
  } else {
    res.status(400);
    throw new Error("No se pudo crear el usuario, los datos son incorrectos");
  }
});

const loginVeterinario = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Favor de verificar que esten todos los datos");
  }

  const veterinario = await Veterinario.findOne({ email });

  if (veterinario && (await bcrypt.compare(password, veterinario.password))) {
    res.status(200).json({
      _id: veterinario.id,
      nombre: veterinario.nombre,
      email: veterinario.email,
      token: generateToken(veterinario.id),
    });
  } else {
    res.status(400);
    throw new Error("Credenciales incorrectas");
  }
});

const getMyDataVet = asyncHandler(async (req, res) => {
  res.json(req.veterinario);
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerVeterinario,
  loginVeterinario,
  getMyDataVet,
};
