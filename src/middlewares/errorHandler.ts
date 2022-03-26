import { NextFunction, Request, Response } from 'express';
import moment from 'moment';

import HttpError from '../utils/errors/HttpError';
import ValidationError from '../utils/errors/ValidationError';
import messages from '../utils/messages/app.messages';
import logger from '../utils/loggers/logger';

// eslint-disable-next-line
const errorHandler = (error: any, req: Request, res: Response, _next: NextFunction) => {
	const channelID: string = req.body.channelID;

	const context = {
		user: 'ErrorHandler',
		label: error.system,
		requestID: req.body?.requestID,
		endpoint: req.originalUrl,
		channelID: channelID,
		request: {
			body: req.body,
			query: req.query,
			params: req.params,
			user: res.locals?.user,
		},
		error: { ...error },
	};

	const response = {
		timestamp: moment(),
		requestID: req.body?.requestID,
		message: error.message,
	};

	// HTTP Handler
	if (error instanceof HttpError) {
		logger.warn(error.message, { context });
		return res.status(error.statusCode).json(response);
	}

	// Validation error Handler
	if (error instanceof ValidationError) {
		logger.warn(error.message, { context });
		return res.status(error.statusCode).json(response);
	}

	// ! Generic Error handler
	response.message = messages.TECHNICAL_ISSUE;
	error.statusCode = 500;
	logger.error(error.message, { context });

	return res.status(error.statusCode).json(response);
};

export default errorHandler;
