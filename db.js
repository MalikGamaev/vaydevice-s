const { Sequelize } = require('sequelize');


module.exports = new Sequelize('postgresql://vaydevice_database_user:bTqZAgJeIiKJYP9oyaAAo3sOg9pZVjZC@dpg-csa20ja3esus739ofaa0-a.oregon-postgres.render.com/vaydevice_database?',
	{
		pool: {
			max: 5,
  			min: 0,
  			idle: 30000,
  			acquire: 30000,
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