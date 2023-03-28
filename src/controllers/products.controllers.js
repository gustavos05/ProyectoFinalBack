const catchError = require('../utils/catchError');
const Products = require('../models/Product');
const Category = require('../models/Category');
const ProductImg=require("../models/ProductImg")

const getAll = catchError(async(req, res) => {
    const results = await Products.findAll({include:[ProductImg,Category]});
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const result = await Products.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Products.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Products.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Products.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

 const setProductsImages = catchError(async (req, res) => {
  const { id } = req.params;
  const products = await Products.findByPk(id);
  if (!products) return res.sendStatus(404);
  await products.setProductImgs(req.body);
  const productImgs = await products.getProductImgs();
  return res.json(productImgs);
}); 

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    setProductsImages
}