class ValidationError extends Error {
	statusCode: number;

	constructor(error: any) {
		super(error.message);
		Error.captureStackTrace(this, this.constructor);
		this.name = this.constructor.name;
		this.statusCode = 400;
	}
}

export default ValidationError;
