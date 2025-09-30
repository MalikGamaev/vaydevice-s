const { Device, BasketDevice, Basket } = require("../models/models")

class BasketController {
	async addToBasket(req, res, next) {
		const user = req.user;
  		const { deviceId } = req.body;
  		let basket = await Basket.findOne({ where: { userId: user.id } });
  		if (!basket) {
    	console.log('Корзина не найдена, создаём новую');
    	basket = await Basket.create({ userId: user.id });
  		} else {
    		console.log('Корзина найдена:', basket.id);
  		}

  		const basketDevice = await BasketDevice.create({ basketId: basket.id, deviceId });
  		return res.json(basketDevice);
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
    try {
      const user = req.user; 
      const deviceId = Number(req.params.deviceId); 
      
      const basket = await Basket.findOne({ where: { userId: user.id } });
      if (!basket) {
        return res.status(404).json({ message: "Корзина пользователя не найдена" });
      }

		console.log(deviceId)
      
      const deletedRowsCount = await BasketDevice.destroy({
        where: {
          basketId: basket.id,
          id: deviceId
        }
      });

      if (deletedRowsCount === 0) {
        return res.status(404).json({ message: "Товар не найден в корзине" });
      }

      return res.json({ message: "Товар успешно удален из корзины" });
    } catch (error) {
      console.error("Ошибка при удалении товара из корзины:", error);
      return res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
  }

}

module.exports = new BasketController()