// models/user.js
class User {
  constructor(id, name, age, color, address) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.color = color;
    this.address = address;
  }
}

module.exports = User;
