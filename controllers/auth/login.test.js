const mongoose = require("mongoose");
const request = require("supertest");

require("dotenv").config();
const { PORT, DB_HOST, EMAIL_TEST, PASSWORD_TEST } = process.env;

const data = {
  email: EMAIL_TEST,
  password: PASSWORD_TEST,
};

const app = require("../../app");

let server;
beforeAll(async () => {
  await mongoose.connect(DB_HOST).then(() => {
    server = app.listen(PORT);
  });
});

afterAll(async () => {
  await mongoose.connection.close().then(() => {
    server.close();
  });
});

describe("test login", () => {
  test("return response code 200", async () => {
    const response = await request(app).post("/users/login").send(data);
    expect(response.status).toBe(200);
  });

  test("return token in response", async () => {
    const response = await request(app).post("/users/login").send(data);
    expect(response.body.token).toBeTruthy();
  });

  test("return token in response", async () => {
    const { body } = await request(app).post("/users/login").send(data);
    const response = body.user;
    expect(typeof response).toBe("object");
    expect(typeof response.email).toBe("string");
    expect(typeof response.subscription).toBe("string");
  });
});
