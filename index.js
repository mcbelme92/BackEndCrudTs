// Requerir los módulos necesarios
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const cors = require("cors");
const BASE_PATH = require("./config/constants");
//acceso a ip front end
const corsOptions = {
  origin: BASE_PATH,
};

const users = require("./config/data.js");
const {
  getUsers,
  modifyUser,
  newUser,
  getUserId,
  deleteUserPerId,
  generateToken,
} = require("./controller/userController.js");
const {
  validateRequestBody,
  checkUserCapacity,
  checkUserFound,
  checkGetUserFound,
  DeleteUserMiddleware,
} = require("./middleware/middlewares.js");
//Esto hace que nuestro servidor pueda recibir datos en JSON
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors(corsOptions));
// Definir un arreglo de objetos como backend
users;

app.get("/users", getUsers);
// Definir una ruta para modificar las propiedades del arreglo
app.post("/modify-user", checkUserFound, modifyUser);
//agregara un elemento nuevo al arreglo
app.post("/user", validateRequestBody, checkUserCapacity, newUser);
//Obtienepor id informacion del usuario
app.get("/user/:id", checkGetUserFound, getUserId);
app.get("/token", generateToken);

//Borra por id el usuario
app.delete("/user/:id", DeleteUserMiddleware, deleteUserPerId);
//
app.delete("/user/:id", DeleteUserMiddleware, deleteUserPerId);
// Escuchar el puerto 3000
app.listen(port, () => {
  console.log("###########################");
  console.log(`http://localhost:${port}`);
  console.log("###########################");
});

module.exports = app;
