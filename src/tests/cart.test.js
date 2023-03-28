const request = require("supertest");
const app = require("../app");

require("../models");

let token;
let cartId;

beforeAll(async () => {
  const credentials = {
    email: "test@gmail.com",
    password: "test1234",
  };
  const res = await request(app).post("/users/login").send(credentials);
  token = res.body.token;
});

test("POST /cart should create one cart", async () => {
  const cart = {
   userID:1,
   productID:1,
   quantity:12
  };
  const res = await request(app)
    .post("/cart")
    .send(cart)
    .set("Authorization", `Bearer ${token}`);
  cartId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.quantity).toBe(cart.quantity);
});

test("GET /cart should return all cart", async () => {
  const res = await request(app)
  .get("/cart")
  .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("PUT /category/:id", async () => {
  const body = { quantity: 3};
  const res = await request(app)
  .put(`/cart/${cartId}`)
  .send(body)
  .set("Authorization", `Bearer ${token}`);;
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(body.name);
});


test("DELETE /cart/:id", async () => {
  const res = await request(app)
  .delete(`/cart/${cartId}`)
  .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(204);
});