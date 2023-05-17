// middleware.test.js

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
      expect(mockUsers).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith("El usuario no fue encontrado");
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe("checkUserCapacity", () => {
    it("should call next() when user capacity is not reached", () => {
      // Arrange
      const users = [{ id: 1 }, { id: 2 }];

      // Espiar el módulo "../config/data" y asignar el objeto con la propiedad "users"
      jest.mock("../config/data", () => ({
        users: users,
      }));

      // Act
      checkUserCapacity(req, res, next);

      // Assert
      expect(next).toHaveBeenCalledTimes(1);
    });

    it("should send an error response when user capacity is reached", () => {
      // Arrange
      const users = [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
        { id: 6 },
        { id: 7 },
        { id: 8 },
        { id: 9 },
        { id: 10 },
        { id: 11 },
        { id: 12 },
        { id: 13 },
        { id: 14 },
        { id: 15 },
        { id: 16 },
        { id: 17 },
        { id: 18 },
        { id: 19 },
        { id: 20 },
      ];

      // Mock the users array
      // Espiar el módulo "../config/data" y asignar el objeto con la propiedad "users"
      jest.mock("../config/data", () => ({
        users: users,
      }));

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
  describe("checkUserFound", () => {
    it("should call next() and update user properties when user is found", () => {
      // Arrange
      const users = [
        {
          id: 1,
          name: "John Doe",
          age: 25,
          color: "red",
          address: "456 Street",
        },
      ];
      const requestBody = {
        id: 1,
        name: "John Doe",
        age: 25,
        color: "red",
        address: "456 Street",
      };

      // Mock the users array
      // Espiar el módulo "../config/data" y asignar el objeto con la propiedad "users"
      jest.mock("../config/data", () => ({
        users: users,
      }));

      // Mock the request
      req.body = requestBody;

      // Act
      checkUserFound(req, res, next);

      // Assert
      expect(users[0].name).toBe(requestBody.name);
      expect(users[0].age).toBe(requestBody.age);
      expect(users[0].color).toBe(requestBody.color);
      expect(users[0].address).toBe(requestBody.address);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(
        `El usuario:${JSON.stringify(
          users[0]
        )} ha sido modificado correctamente`
      );
      expect(next).toHaveBeenCalledTimes(1);
    });

    describe("checkUserFound", () => {
      it("should call next() when user is found and update user properties", () => {
        // Arrange
        const users = [{ id: 1, name: "John Doe" }];
        const requestBody = {
          id: 1,
          name: "Jane Smith",
          age: 25,
          color: "red",
          address: "456 Street",
        };

        const req = { body: requestBody };
        const res = {
          status: jest.fn(),
          send: jest.fn(),
        };
        const next = jest.fn();

        jest.mock("../config/data", () => ({
          users: users,
        }));

        // Call the middleware
        checkUserFound(req, res, next);

        // Assert
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(
          `El usuario:${JSON.stringify(
            users[0]
          )} ha sido modificado correctamente`
        );
        expect(next).toHaveBeenCalled();
        expect(users[0].name).toBe(requestBody.name);
        expect(users[0].age).toBe(requestBody.age);
        expect(users[0].color).toBe(requestBody.color);
        expect(users[0].address).toBe(requestBody.address);
      });

      it("should send error response when user is not found", () => {
        // Arrange
        const users = [];
        const requestBody = {
          id: 1,
          name: "Jane Smith",
          age: 25,
          color: "red",
          address: "456 Street",
        };

        const req = { body: requestBody };
        const res = {
          status: jest.fn(),
          send: jest.fn(),
        };
        const next = jest.fn();

        // Espiar el módulo "../config/data" y asignar el objeto con la propiedad "users"
        jest.mock("../config/data", () => ({
          users: users,
        }));

        // Call the middleware
        checkUserFound(req, res, next);

        // Assert
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith("El usuario no fue encontrado");
        expect(next).not.toHaveBeenCalled();
      });
    });

    it("should send an error response when required parameters are missing", () => {
      // Arrange
      const requestBody = {
        id: 1,
        name: "Jane Smith",
        age: 25,
        color: "red",
        // Missing address
      };

      // Mock the request
      req.body = requestBody;

      // Act
      checkUserFound(req, res, next);

      // Assert
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith("Faltan parámetros requeridos");
      expect(next).not.toHaveBeenCalled();
    });
  });
});
