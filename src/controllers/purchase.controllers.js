const catchError = require('../utils/catchError');
const Purchase = require('../models/Purchase');
const Products=require('../models/Product')


const getAll = catchError(async(req, res) => {
    const userId = req.user.id;
    const results = await Purchase.findAll({
        include: [Products],
        where: { userId }});
    return res.json(results);
});


const create = catchError(async(req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user.id;
    const result = await Purchase.create({ productId, quantity,userId });
    return res.status(201).json(result);
});

module.exports = {
    getAll,
    create
}