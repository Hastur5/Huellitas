const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = asyncHandler(async (req, res) => {
  const { nombre, email, password, direccion, telefono } = req.body;

  if (!nombre & !email & !password & !direccion & !telefono) {
    res.status(400);
    throw new Error("Favor de verificar que esten todos los datos");
  }

  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("Ese email ya fue registrado, el usuario ya existe");
  }

  const salt = await bcrypt.genSalt(10);
  // Crear el hash
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    nombre,
    email,
    password: hashedPassword,
    direccion,
    telefono,
  });
  //* Mandamos la respuesta de la funcion
  if (user) {
    res.status(201).json({
      _id: user.id,
      nombre: user.nombre,
      email: user.email,
      direccion: user.direccion,
      telefono: user.telefono
    });
  } else {
    res.status(400);
    throw new Error("No se pudo crear el usuario, los datos son incorrectos");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Favor de verificar que esten todos los datos");
  }

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user.id,
      nombre: user.nombre,
      email: user.email,
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error("Credenciales incorrectas");
  }
});

const getMyData = asyncHandler(async (req, res) => {
  res.json(req.user);
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMyData,
};
