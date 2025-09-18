const { Sequelize } = require('sequelize');


module.exports = new Sequelize('postgresql://vaydevice_db_user:26OWOodNk298LJZjv5q9yO6PvELFYLiI@dpg-cs9n4l23esus739ibv90-a.oregon-postgres.render.com/vaydevice_db?sslmode=no-verify',
	{
		pool: {
			max: 3,
			min: 1,
			idle: 10000,
		},
		dialectOptions: {
			ssl: {
				require: true
			},
			keepAlive: true
		}
	}

)

//malikgamaev @icloud.com
//e1e71b174c3357ef02ecbc654fe989c9