// Requerir los módulos necesarios
const express = require("express");
const bodyParser = require("body-parser");
// Crear una instancia de Express
const app = express();
const port = 3000;
//acceso a ip front end
const corsOptions = {
  origin: "*",
};
//Acceso desde el front end test
const cors = require("cors");
//Esto hace que nuestro servidor pueda recibir datos en JSON
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors(corsOptions));

// Definir un arreglo de objetos como backend
let users = [
  { id: 1, name: "Pepe", age: 31, color: "rojo", address: "Ciudad de Mexico" },

  { id: 2, name: "Rodrigo", age: 25, color: "azul", address: "Puebla" },
  {
    id: 3,
    name: "Francisco",
    age: 50,
    color: "amarillo",
    address: "Zacatecas",
  },
  {
    id: 4,
    name: "Adriana",
    age: 80,
    color: "violeta",
    address: "Tijuana",
  },
  {
    id: 5,
    name: "Jhonny",
    age: 150,
    color: "verde",
    address: "Monterrey",
  },
];

app.get("/users", (req, res) => {
  res.json(users);
  return res.status(200);
});

//agregara un elemento nuevo al arreglo
app.post("/user", (req, res) => {
  //validacion si se envian datos del body
  let validationBody = Object.values(req.body).length > 0;
  if (!validationBody) {
    res.status(500).send("Faltan parametros en el body");
  } else {
    //crear una copia del último objeto en un array de objetos
    const lastObj = Object.assign({}, users.slice(-1).pop());
    const lastId = parseInt(lastObj.id);
    const newIDUser = lastId + 1;
    const newItem = {
      id: newIDUser,
      ...req.body,
    };
    /* console.log(newItem); */
    if (users.length < 20) {
      users.push(newItem);
      /* console.log("Objeto agregado al arreglo"); */
      res.status(201).json(newItem);
    } else {
      /* console.log("Maxima capacidad del arreglo"); */
      res.status(429).send("Maxima capacidad disco lleno").json(newItem);
    }
  }
});
// Definir una ruta para modificar las propiedades del arreglo
app.post("/modify-user", (req, res) => {
  // Obtener los datos enviados por el frontend
  const { id, name, age, color, address } = req.body;

  // Buscar el usuario por su id
  const user = users.find((u) => u.id === id);

  // Si se encontró el usuario, modificar su nombre
  if (user) {
    user.name = name;
    user.age = age;
    user.color = color;
    user.address = address;
    res.send("El usuario ha sido modificado correctamente");
  } else {
    res.status(500).send("El usuario no fue encontrado");
  }
});

app.get("/user", (req, res) => {
  //validacion si se envian datos del body
  let validationBody = Object.values(req.body).length > 0;
  if (!validationBody) {
    res.send("metodo get no aceptado");
  } else {
    // Obtener los datos enviados por el frontend
    const { id, name } = req.body;

    // Buscar el usuario por su id
    let user = users.find((u) => u.id === id);

    // Si se encontró el usuario, modificar su nombre
    if (user) {
      user.name = name;
      res.send("El usuario ha sido modificado correctamente");
    } else {
      res.send("El usuario no fue encontrado");
    }
  }
});

app.delete("/user/:id", (req, res) => {
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
});

// Escuchar el puerto 3000
app.listen(port, () => {
  console.log("###########################");
  console.log(`http://localhost:${port}`);
  console.log("###########################");
});

module.exports = app;
