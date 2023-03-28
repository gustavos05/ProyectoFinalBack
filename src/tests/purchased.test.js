const request = require("supertest");
const app = require("../app");

require("../models");

let token;
let PurchasedId;

beforeAll(async () => {
  const credentials = {
    email: "test@gmail.com",
    password: "test1234",
  };
  const res = await request(app).post("/users/login").send(credentials);
  token = res.body.token;
});

test("POST /Purchased should create one Purchased", async () => {
  const Purchased = {
   userID:1,
   productID:1,
   quantity:12
  };
  const res = await request(app)
    .post("/purchased")
    .send(Purchased)
    .set("Authorization", `Bearer ${token}`);
  PurchasedId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.quantity).toBe(Purchased.quantity);
});

test("GET /Purchased should return all Purchased", async () => {
  const res = await request(app)
  .get("/purchased")
  .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});