const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
	{
		fullName: { type: String, required: true, trim: true },
		contactPreference: { type: String, required: true, trim: true },
		phone: {
			type: String,
			trim: true,
		},
		email: {
			type: String,
			trim: true,
			lowercase: true,
		},
		skills: [{
			skillName: { type: String, trim: true, required: true },
			experienceInYears: { type: Number, trim: true, required: true },
			proficiency: { type: String, trim: true, required: true },
		}],
		password: {
			type: String,
			required: true,
			trim: true
		},

	},
	{ timestamps: true }
);

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign(
		{
			email: this.email,
			userId: this._id,
		},
		keys.jwtPrivateKey,
		{ expiresIn: '10h' }
	);
	return token;
};

userSchema.methods.comparePassword = function (password) {
	return bcrypt.compareSync(password, this.password);
};


userSchema.pre('save', async function () {
	if (this.password) this.password = await bcrypt.hash(this.password, 10);
});

const User = mongoose.model('User', userSchema);

exports.User = User;