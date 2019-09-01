if (process.env.NODE_ENV === 'production') {
	console.log('Production is started');
	// we are in production - return the prod set of keys
	module.exports = require('../config/prod');
} else {
	// we are in development - return the dev keys!!!
	module.exports = require('../config/dev');
	console.log('Dev. Env. Variables');
}
