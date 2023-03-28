const request = require("supertest");
const app = require("../app");
require("../models");

let usersId;
let token;

test("POST /users ", async () => {
  const body = {
    firstName: "Bratt",
    lastName: "Pitt",
    email: "pittbratt@gmail.com",
    password:"albahaca",
    phone:"05-09-1996"
  };
  const res = await request(app).post("/users").send(body);
  usersId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.name).toBe(body.name);
});

test("POST /users/login should do login", async () => {
  const user = {
    email: "pittbratt@gmail.com",
    password:"albahaca",
  };
  const res = await request(app).post("/users/login").send(user);
  token = res.body.token;
  expect(res.status).toBe(200);
  expect(res.body.user.email).toBe(user.email);
  expect(res.body.token).toBeDefined();
});

test("POST /users/login with invalid credentials should return 401", async () => {
  const user = {
    email: "sebastian3@gmail.com",
    password: "wrongpassword",
  };
  const res = await request(app).post("/users/login").send(user);
  expect(res.status).toBe(401);
});

test("GET /users", async () => {
  const res = await request(app)
  .get("/users")
  .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(200)
  expect(res.body).toHaveLength(2);
});

test("PUT /users/:id", async () => {
  const body = { firstName: "Bratt updated" };
  const res = await request(app) 
  .put(`/users/${usersId}`)
  .send(body)
  .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(body.name);
});

test("DELETE /users/:id", async () => {
  const res = await request(app)
  .delete(`/users/${usersId}`)
  .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(204);
});
