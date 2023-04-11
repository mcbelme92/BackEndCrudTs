const request = require("supertest");
const app = require("./server");

describe("Test a agregar usuario,borrar,modificar,obtener usuarios", () => {
  test("Test obtener todos los usuarios", async () => {
    const response = await request(app).get("/user");
    expect(response.statusCode).toBe(200);
  });

  test("test modificar propiedades del usuario", async () => {
    const response = await request(app).post("/modify-user").send({
      id: 2,
      name: "test",
      age: "azul",
      address: "usa",
    });
    expect(response.statusCode).toBe(200);
  });

  test("Test borrar usuario", async () => {
    const response = await request(app).delete("/user/5");
    expect(response.statusCode).toBe(201);
  });
});
