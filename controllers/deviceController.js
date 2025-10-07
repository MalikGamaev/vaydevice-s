const uuid = require('uuid')
const path = require('path')
const { Device, DeviceInfo } = require('../models/models')
const ApiError = require('../error/ApiError')
const { where } = require('sequelize')

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
		let { brandId, typeId, limit, page } = req.query
		page = page || 1
		limit = limit || 9
		let offset = page * limit - limit
		let devices;
		if (!brandId && !typeId) {
			devices = await Device.findAndCountAll({ limit, offset })
		}
		if (brandId && !typeId) {
			devices = await Device.findAndCountAll({ where: { brandId }, limit, offset })
		}
		if (!brandId && typeId) {
			devices = await Device.findAndCountAll({ where: { typeId }, limit, offset })
		}
		if (brandId && typeId) {
			devices = await Device.findAndCountAll({ where: { typeId, brandId }, limit, offset })
		}

		return res.json(devices)
	}

	async getOne(req, res) {
		const { id } = req.params
		const device = await Device.findOne({
			where: { id },
			include: [{ model: DeviceInfo, as: 'info' }]
		})
		return res.json(device)
	}

	async createBasketDevice(req, res, next) {
		const { id, userId } = req.body;
		const userBasket = await Basket.findOne({ where: { userId } });
		const deviceBasket = await BasketDevice.create({ deviceId: id, basketId: userBasket.id });
		return res.json(deviceBasket);
	}

	async rate(req, res, next) {
		const { userId, deviceId, rate } = req.body;
		const userRaiting = await Rating.findOne({ where: { userId } });
		if (userRaiting) {
			const updateRating = await Rating.update({ rate: rate }, { where: { id: deviceId } });
		}
		const deviceRate = await Rating.create({ userId, deviceId, rate });
		const ratingAvg = await Rating.findOne({
			attributes: [sequelize.fn('AVG', sequelize.col('rate'))],
			raw: true,
		});

		const updatedDevice = await Device.update(
			{
				rating: Math.floor(Number(ratingAvg.avg)),
			},
			{ where: { id: deviceId } },
		);
		return res.json(updatedDevice);
	}
}

module.exports = new DeviceController()