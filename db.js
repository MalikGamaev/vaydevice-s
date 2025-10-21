const { Sequelize } = require('sequelize');


module.exports = new Sequelize('postgresql://waydevice_database_user:FjIDT7X17bdmiPboVI7IMth7XmSNcmvs@dpg-d3rjoj8dl3ps73ffkhbg-a/waydevice_database',
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