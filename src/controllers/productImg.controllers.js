const catchError = require('../utils/catchError');
const ProductImg = require('../models/ProductImg');

const getAll = catchError(async(req, res) => {
    const results = await ProductImg.findAll();
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const url = req.protocol + "://" + req.headers.host + "/uploads/" + req.file.filename;
		const filename = req.file.filename;
    const result = await ProductImg.create({ url, filename });
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await ProductImg.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await ProductImg.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await ProductImg.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
}