// middleware.test.js

const users = require("../config/data");
const {
  validateRequestBody,
  checkUserCapacity,
  checkUserFound,
  checkGetUserFound,
  DeleteUserMiddleware,
} = require("../middleware/middlewares");

describe("Middleware Tests", () => {
  let req, res, next;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("validateRequestBody", () => {
    it("should call next() when request body is not empty", () => {
      // Arrange
      req.body = {
        id: 1,
        name: "John Doe",
        age: 30,
        color: "blue",
        address: "123 Street",
      };

      // Act
      validateRequestBody(req, res, next);

      // Assert
      expect(next).toHaveBeenCalledTimes(1);
    });

    it("should send an error response when request body is empty", () => {
      // Arrange
      req.body = {};

      // Act
      validateRequestBody(req, res, next);

      // Assert
      // Assert
      expect(Object.keys(req.body).length).toBe(0);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith("Faltan parámetros en el body");
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe("checkUserCapacity", () => {
    // Crea un mock para req, res y next
    let req, res, next;

    beforeEach(() => {
      // Reinicia el estado de req, res y next antes de cada prueba
      req = {};
      res = {
        status: jest.fn(() => res),
        send: jest.fn(),
      };
      next = jest.fn();
    });

    it("should call next() when user capacity is not reached", () => {
      // Arrange en caso no tengas la data creas una
      //const users = [{ id: 1 }, { id: 2 }];

      // Act
      checkUserCapacity(req, res, next);

      // Assert
      expect(next).toHaveBeenCalledTimes(1);
      expect(res.status).not.toHaveBeenCalled();
      expect(res.send).not.toHaveBeenCalled();
    });

    it("should send an error response when user capacity is reached", () => {
      // Agregar 20 usuarios al arreglo
      for (let i = 1; i <= 20; i++) {
        users.push({ id: i });
      }

      // Act
      checkUserCapacity(req, res, next);

      // Assert
      expect(res.status).toHaveBeenCalledWith(429);
      expect(res.send).toHaveBeenCalledWith(
        "Máxima capacidad del arreglo alcanzada"
      );
      expect(next).not.toHaveBeenCalled();
    });
  });
});
