const Router = require('express')
const userRouter = require('./userRouter')
const deviceRouter = require('./deviceRouter')
const typeRouter = require('./typeRouter')
const brandRouter = require('./brandRouter')
const basketDeviceRouter = require('./basketDeviceRouter')

const router = new Router()

router.use('/user', userRouter)
router.use('/device', deviceRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/basket', basketDeviceRouter)



module.exports = router