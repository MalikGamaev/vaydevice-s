const { Sequelize } = require('sequelize');


module.exports = new Sequelize('postgresql://vaydevice_database_sbmv_user:hkHEhyKeTFhK7r26Z1FfpGNgcW4fHUfn@dpg-d36j0g3uibrs739cqvkg-a/vaydevice_database_sbmv',
	{
		pool: {
			max: 3,
			min: 1,
			idle: 10000,
		},
		dialectOptions: {
			ssl: {
				require: true,
				rejectUnauthorized: false
			},
			keepAlive: true
		}
	}

)

//malikgamaev @icloud.com
//e1e71b174c3357ef02ecbc654fe989c9