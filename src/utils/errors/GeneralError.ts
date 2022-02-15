import Messages from '../messages/app.messages';

class GeneralError extends Error {
	statusCode: number;

	constructor() {
		super(Messages.TECHNICAL_ISSUE);
		Error.captureStackTrace(this, this.constructor);
		this.name = this.constructor.name;
		this.statusCode = 500;
	}
}

export default GeneralError;
