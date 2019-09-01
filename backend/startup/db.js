// const logger = require("./logging");
const mongoose = require('mongoose');
const keys = require('../config/keys');

module.exports = function() {
	const db = keys.mongoURI;
	mongoose
		.connect(db, {
			useNewUrlParser: true,
			useCreateIndex: true
		})
		.then(() => {
			// logger.info(`Connected to ${db}...`);
			mongoose.Promise = global.Promise;
			console.info(`Connected to ${db}...`);
		})
		.catch((err) => {
			console.log(err);
		});
};
