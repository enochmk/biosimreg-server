import { Request, Response, NextFunction } from 'express';

import { decodeToken } from '../helpers/jwtHandler';
import HttpError from '../utils/errors/HttpError';

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
	if (!req.headers?.authorization) {
		throw new HttpError('Not Authorized', 401);
	}

	const authorization = req.headers.authorization;

	if (!authorization.startsWith('Bearer')) {
		throw new HttpError('Invalid Authorization', 400);
	}

	// get the token
	const token = authorization.split(' ')[1];

	try {
		// verify the token
		const decoded = decodeToken(token);

		// store user
		res.locals.user = decoded.user;

		// next middleware
		next();
	} catch (error: any) {
		let message = error.message;

		// handle expired token
		if (message.includes('jwt expired')) {
			message = 'Token expired. Please login again';
		}

		// handle invalid signature
		if (message.includes('invalid signature')) {
			message = 'Invalid token. Please login again';
		}

		next(new HttpError(message, 401));
	}
};

export default verifyJWT;
