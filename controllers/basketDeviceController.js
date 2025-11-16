const { Device, BasketDevice, Basket } = require("../models/models")
const { YooCheckout, ICreatePayment  } = require('@a2seven/yoo-checkout')
const {v4} = require('uuid')

const YooKassa = new YooCheckout({ 
	shopId: process.env.YK_SHOP_ID,
	secretKey: process.env.YK_SECRET_KEY 
});


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

  async createPayment(req, res) {
	const {amount, userId} = req.body
	const idempotenceKey = v4().toString();
	const createPayload = {
    amount: {
      value: parseFloat(amount).toFixed(2).toString(),
      currency: 'RUB',
    },
    payment_method_data: {
      type: 'bank_card',
    },
    confirmation: {
      type: 'redirect',
      return_url: 'https://vaydevice-s-6.onrender.com/',
    },
	 metadata: {
		userId
	 }
  };

  try {
    const payment = await YooKassa.createPayment(createPayload, idempotenceKey);
    res.json({ payment });
  } catch (error) {
    console.error('Ошибка создания платежа:', error.response?.data || error.message || error);
    res.status(500).json({ message: 'Ошибка создания платежа', details: error.response?.data || error.message });
  }
  }

}

module.exports = new BasketController()