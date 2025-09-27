const Router = require('express')
const router = new Router()

const basketController = require('../controllers/basketDeviceController')

// ------- Добавил проверку на авторизацию для того, чтобы вытащить оттуда авторизованного юзера -------- //
const authMiddleware = require('../middleware/authMiddleware')

// ------- CRUD корзины ------- //
router.get('/', authMiddleware, basketController.getBasketUser)
router.post('/', authMiddleware, basketController.addToBasket)
router.delete('/', authMiddleware, basketController.deleteToBasket);



module.exports = router