const bcrypt = require('bcrypt');
const ApiError = require('../../helpers/ApiError');
const { User } = require('../../models/user');

exports.signup = async (req, res, next) => {
	debugger;
	console.log(req.body);
	const { fullName, contactPreference, emailGroup: { email }, password, phone, skills } = req.body;
	let user = new User({
		fullName,
		contactPreference,
		email,
		password,
		phone,
		skills
	});
	try {
		user = await user.save();
		const token = user.generateAuthToken();

		res.status(201).json({
			message: 'تم التسجيل بنجاح',
			token: token,
			userId: user._id,
			expiresIn: 36000,
		});
	} catch (err) {
		next(err)
	}
};

exports.login = async (req, res, next) => {
	const { phone } = req.body;

	try {
		const user = await User.findOne({ phone });
		let isMatched;
		if (user) isMatched = await bcrypt.compare(req.body.password, user.password);
		if (!user || !isMatched) {
			return next(new ApiError('يوجد خطأ في التليفون او كلمة السر', 401));
		}
		const token = user.generateAuthToken();
		res.status(200).json({
			message: 'Authentication is successful',
			token: token,
			expiresIn: 36000,
			inActive: user.inActive
		});
	} catch (error) {
		next(new ApiError('يوجد خطأ في التليفون او كلمة السر', 401));
	}
};
