class ValidationError extends Error {
	statusCode: number;

	constructor(error: any) {
		super(error.message);
		this.name = this.constructor.name;
		this.statusCode = 400;
	}
}

export default ValidationError;
