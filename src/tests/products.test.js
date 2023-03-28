const request = require("supertest");
const app = require("../app");
const ProductImg =require('../models/ProductImg')

require("../models");

let token;
let productsId;

beforeAll(async () => {
  const credentials = {
    email: "test@gmail.com",
    password: "test1234",
  };
  const res = await request(app).post("/users/login").send(credentials);
  token = res.body.token;
});

test("POST /products should create one products", async () => {
  const products = {
    title:"Nevera",
    description:"enfria",
    price:12
  };
  const res = await request(app)
    .post("/products")
    .send(products)
    .set("Authorization", `Bearer ${token}`);
  productsId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.title).toBe(products.title);
});

test("GET /products should return all products", async () => {
  const res = await request(app).get("/products");
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("POST /news/:id/images should set the news images", async () => {
  const image = await ProductImg.create({ url: "hfuosa", filename: "fsdjakl" });
  const res = await request(app)
    .post(`/products/${productsId}/images`)
    .send([image.id])
    .set("Authorization", `Bearer ${token}`);
  await image.destroy();
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);});

test("DELETE /products/:id", async () => {
  const res = await request(app)
  .delete(`/products/${productsId}`)
  .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(204);
});


