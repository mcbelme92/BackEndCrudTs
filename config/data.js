const User = require("../model/User.js");
const users = [
  new User(1, "Pepe", 31, "rojo", "Ciudad de Mexico"),
  new User(2, "Rodrigo", 25, "azul", "Puebla"),
  new User(3, "Francisco", 50, "amarillo", "Zacatecas"),
  new User(4, "Adriana", 80, "violeta", "Tijuana"),
  new User(5, "Jhonny", 150, "verde", "Monterrey"),
];

module.exports = users;
