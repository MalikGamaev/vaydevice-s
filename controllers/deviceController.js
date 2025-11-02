const uuid = require('uuid')
const path = require('path')
const { Device, DeviceInfo } = require('../models/models')
const ApiError = require('../error/ApiError')
const { where, Op } = require('sequelize')

class DeviceController {
	async create(req, res, next) {
  try {
    const { name, price, typeId, brandId, info, img } = req.body;
	 

    // img - это URL картинки, пришедший с фронтенда после загрузки на Cloudinary

    const device = await Device.create({
      name,
      price,
      brandId,
      typeId,
      img, // сохраняем URL
    });

    if (info !== '[]') {
      const parsedInfo = JSON.parse(info);
      for (const i of parsedInfo) {
        await DeviceInfo.create({
          title: i.title,
          description: i.description,
          deviceId: device.id,
        });
      }
    }
    return res.json(device);
  } catch (e) {
    next(ApiError.badRequest(e.message));
  }
}

	async getAll(req, res) {
  		let { brandId, typeId, limit, page, searchName } = req.query;

  		brandId = brandId ? Number(brandId) : undefined;
  		typeId = typeId ? Number(typeId) : undefined;
  		limit = limit ? Number(limit) : 9;
  		page = page ? Number(page) : 1;
  		const offset = page * limit - limit;

  		const where = {};
  		if (brandId) where.brandId = brandId;
  		if (typeId) where.typeId = typeId;
		if (searchName) where.name = { [Op.iLike]: `%${searchName}%` }

  		const devices = await Device.findAndCountAll({ where, limit, offset });

  		return res.json(devices);
}

	async update(req, res, next) {
		try {
			const { name, price, info, img } = req.body
			const deviceId = req.params.id

			await Device.update(
				{ name, price, img },
				{ where: { id: deviceId } }
			)

			if(info !== '[]') {
				const parsedInfo = JSON.parse(info);
				await DeviceInfo.destroy({where: {deviceId}})

				for(const i of parsedInfo) {
					await DeviceInfo.create({
						title: i.title,
          			description: i.description,
          			deviceId,
					})
				}
			}
			const device = await Device.findOne({
			where: { id: deviceId },
			include: [{ model: DeviceInfo, as: 'info' }]
			})
			return res.json(device);
		} catch (e) {
			next(ApiError.badRequest(e.message))
			console.log(e)
		}
		
	}

	async getOne(req, res) {
		const { id } = req.params
		const device = await Device.findOne({
			where: { id },
			include: [{ model: DeviceInfo, as: 'info' }]
		})
		return res.json(device)
	}

}

module.exports = new DeviceController()