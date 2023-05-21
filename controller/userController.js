let users = require("../config/data.js");
const jwt = require("jsonwebtoken");

// Obtener todos los usuarios
const getUsers = (req, res) => {
  res.json(users);
};
// Modificar un usuario
const modifyUser = (req, res) => {};

const newUser = (req, res) => {
  const lastObj = Object.assign({}, users.slice(-1).pop());
  const lastId = parseInt(lastObj.id);
  const newIDUser = lastId + 1;
  const newItem = {
    id: newIDUser,
    ...req.body,
  };
  users.push(newItem);
  res.status(201).json(newItem);
};

const getUserId = (req, res) => {};
const deleteUserPerId = (req, res) => {};

const generateToken = (req, res) => {
  // Obtener la información del usuario
  const { id, name, email } = req.body;

  // Generar el token
  const token = jwt.sign({ id, name, email }, "secreto", { expiresIn: "1h" });

  // Enviar el token en la respuesta
  res.json({ token });
};

module.exports = {
  getUsers,
  modifyUser,
  modifyUser,
  newUser,
  getUserId,
  deleteUserPerId,
  generateToken,
};
