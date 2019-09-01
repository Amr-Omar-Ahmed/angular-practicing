class ApiError extends Error {
	constructor(message, statusCode, details) {
		super(message);
		Object.assign(this, { statusCode, details });
	}

	static NotFound(name) {
		this.status = 404;
		this.message = `غير موجود ${name}`;
	}

	static BadRequest(message = 'Bad Request, Check your inputs') {
		this.status = 400;
		this.message = message;
	}

	static UnprocessableEntity(message) {
		this.status = 422;
		this.message = message;
	}

	static Forbidden(message) {
		this.status = 403;
		this.message = message;
	}
}

module.exports = ApiError;
