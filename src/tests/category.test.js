const request = require("supertest");
const app = require("../app");
require("../models");


let categoryId;
let token;

beforeAll(async () => {
  const credentials = {
    email: "test@gmail.com",
    password: "test1234",
  };
  const res = await request(app).post("/users/login").send(credentials);
  token = res.body.token;
});

test("POST /categories should create one category", async () => {
  const newCategory = { name: "Tech" };
  const res = await request(app)
    .post("/category")
    .send(newCategory)
    .set("Authorization", `Bearer ${token}`);
    categoryId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.name).toBe(newCategory.name);
});

test("GET /category should return all categories", async () => {
  const res = await request(app)
  .get("/category")
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});


test("PUT /category/:id", async () => {
  const body = { name: "electro updated" };
  const res = await request(app).put(`/category/${categoryId}`).send(body);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(body.name);
});

test("DELETE /category/:id", async () => {
  const res = await request(app)
  .delete(`/category/${categoryId}`)
  .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(204);
});
