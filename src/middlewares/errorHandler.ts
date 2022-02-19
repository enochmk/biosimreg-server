import { Request, Response } from 'express';
import moment from 'moment';

import HttpError from '../utils/errors/HttpError';
import ValidationError from '../utils/errors/ValidationError';

const errorHandler = (error: any, req: Request, res: Response) => {
	const channelID: string = req.body.channelID || req.query.channelID;

	const response = {
		timestamp: moment(),
		requestID: req.body.requestID,
		message: error.message,
	};

	// HTTP Handler
	if (error instanceof HttpError) {
		return channelID === 'ussd'
			? res.send(response.message)
			: res.status(error.statusCode).json(response);
	}

	// Validation error Handler
	if (error instanceof ValidationError) {
		return channelID === 'ussd'
			? res.send(response.message)
			: res.status(error.statusCode).json(response);
	}

	// ! Generic Error handler
	return channelID === 'ussd' ? res.send(response.message) : res.status(500).json(response);
};

export default errorHandler;
