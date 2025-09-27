const { Device, BasketDevice, Basket } = require("../models/models")

class BasketController {
	// ------ CRUD корзины ------ //

	async addToBasket(req, res, next) {
		const user = req.user
		const { deviceId } = req.body
		const basket = await BasketDevice.create({ basketId: user.id, deviceId: deviceId })
		return res.json(basket)
	}

	async getBasketUser(req, res) {
		const { id } = req.user
		const basket = await BasketDevice.findAll({
			include: {
				model: Device
			}, where: { basketId: id }
		})

		return res.json(basket)
	}

	async deleteToBasket(req, res) {
  const user = req.user;
  const { deviceId } = req.body; // получаем deviceId из тела запроса

  // Удаляем запись корзины, соответствующую userId и deviceId
  const result = await BasketDevice.destroy({
    where: {
      basketId: user.id,
      deviceId: deviceId
    }
  });

  if (result === 0) {
    // Если ничего не удалилось (запись не найдена)
    return res.status(404).json({ message: "Товар не найден в корзине" });
  }

  return res.json({ message: "Товар удалён из корзины" });
}

}

module.exports = new BasketController()