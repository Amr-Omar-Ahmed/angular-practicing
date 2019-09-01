const bodyParser = require('body-parser');
const ApiError = require('../helpers/ApiError');
const mongoose = require('mongoose');
const authRoute = require('../routes/auth/auth');

module.exports = function (app, express, path) {
	//CORS Handler
	app.use((req, res, next) => {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader(
			'Access-Control-Allow-Headers',
			'Origin, X-Requested-With, Content-Type, Accept, x-auth-token , Authorization, application/json, charset=utf-8'
		);
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS, PUT');
		next();
	});
	// app.use(express.static(path.join(__dirname, '../dist')));
	//Parsing Data To Json
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));

	//Routes Handler
	app.use('/api/auth', authRoute);
	// app.get('*', (req, res, next) => {
	// 	res.sendFile(path.join(__dirname, '../dist', 'index.html'));
	// });
	//ERROR Handler
	app.use((req, res, next) => {
		next(new ApiError('Not Found...', 404));
	});
	app.use((err, req, res, next) => {
		// if (err.statusCode !== 500) {
		//   logger.warn(message);
		// } else {
		//   logger.error(message);
		// }
		if (err instanceof mongoose.CastError) {
			err = new ApiError(err.model.modelName);
		}
		res.status(err.statusCode || 500).json({
			message: err.message,
			details: err.details,
		});
	});
};
