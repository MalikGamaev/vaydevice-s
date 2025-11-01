const Router = require('express')
const router = new Router()
const deviceController = require('../controllers/deviceController')
const checkRole = require('../middleware/checkRoleMidlleware')

router.post('/', checkRole('ADMIN'), deviceController.create)
router.get('/', deviceController.getAll)
router.get('/:id', deviceController.getOne)
router.post('/:id', deviceController.createBasketDevice);
router.put('/:id', deviceController.rate);
router.put('/:id', checkRole('ADMIN'), deviceController.update)

module.exports = router