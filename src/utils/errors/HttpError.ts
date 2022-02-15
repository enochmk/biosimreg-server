class HttpError extends Error {
	statusCode: number;

	constructor(message: string, statusCode: number) {
		super(message);
		this.name = this.constructor.name;
		Error.captureStackTrace(this, this.constructor);
		this.statusCode = statusCode;
	}
}

export default HttpError;
