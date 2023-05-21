//Los middlewares son funciones que se ejecutan antes de que la solicitud llegue a la ruta correspondiente y pueden realizar tareas como la validación de datos, el manejo de errores, la autenticación, etc.

const users = require("../config/data.js");

// Middleware para validar si se envían datos en el body
const validateRequestBody = (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send("Faltan parámetros en el body");
  }
  //siguiente paso del endpoint que seria ir al repsonse
  next();
};

// Middleware para verificar la capacidad del arreglo de usuarios
const checkUserCapacity = (req, res, next) => {
  if (users.length >= 20) {
    return res.status(429).send("Máxima capacidad del arreglo alcanzada");
  }
  next();
};
// Middleware para verificar existencia del usuario
const checkUserFound = (req, res, next) => {
  const { id, name, age, color, address } = req.body;
  //valdiacion de que todas las propeidades esten seteadas
  if (!id || !name || !age || !color || !address) {
    return res.status(400).send("Faltan parámetros requeridos");
  }
  // Buscar el usuario por su id
  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).send("El usuario no fue encontrado");
  } else {
    user.name = name;
    user.age = age;
    user.color = color;
    user.address = address;
    const jsonUser = JSON.stringify(user);
    res
      .status(200)
      .send(`El usuario:${jsonUser} ha sido modificado correctamente`);
  }
  next();
};

const checkGetUserFound = (req, res, next) => {
  const userId = parseInt(req.params.id);
  let user = users.filter((item) => item.id !== userId);
  //si es nullo o undefined muestrame UserNotFound
  if (user) {
    return res.status(404).send("Usuario no encontrado");
  } else {
    //sino muestrame la respuesta correcta
    res.status(200).json(user[0]);
  }
  next();
};

const DeleteUserMiddleware = (req, res, next) => {
  const id = parseInt(req.params.id);
  /* console.log(id); */
  let user = users.findIndex((item) => item.id == id);
  /* console.log(user); */

  if (user >= 0) {
    users.splice(user, 1);
    return res.status(201).json({ message: `Usuario ${id} borrado.` });
  } else {
    return res.status(500).json({ message: `Usuario ${id} no existe.` });
  }
  next();
};

module.exports = {
  validateRequestBody,
  checkUserCapacity,
  checkUserFound,
  checkGetUserFound,
  DeleteUserMiddleware,
};
