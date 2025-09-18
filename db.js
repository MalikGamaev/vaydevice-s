const { Sequelize } = require('sequelize');


module.exports = new Sequelize('postgresql://vaydevice_database_user:bTqZAgJeIiKJYP9oyaAAo3sOg9pZVjZC@dpg-csa20ja3esus739ofaa0-a.oregon-postgres.render.com/vaydevice_database?sslmode=no-verify',
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