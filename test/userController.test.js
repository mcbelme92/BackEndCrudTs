const request = require("supertest");
const app = require("../index"); // Reemplaza '../app' con la ruta correcta a tu archivo principal de la aplicación

describe("GET /users", () => {
  test("debería devolver un código de estado 200 y un arreglo de usuarios", async () => {
    const response = await request(app).get("/users");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });
});
