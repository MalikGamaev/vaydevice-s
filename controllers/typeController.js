const { Type } = require('../models/models')
const ApiError = require('../error/ApiError')

class TypeController {
	async getAll(req, res) {
		const types = await Type.findAll();
		return res.json(types);
	}
	async create(req, res, next) {
		const { name } = req.body;
		const existingType = await Type.findOne({ where: { name } });
		if (existingType) {
			return next(ApiError.badRequest('Такой тип уже существует'));
		}
		const type = await Type.create({ name });
		return res.json(type);
	}
}


module.exports = new TypeController()