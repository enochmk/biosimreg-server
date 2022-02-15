import { Request, Response, NextFunction } from 'express';

import { decodeToken } from '../helpers/tokenGenerator';
import HttpError from '../utils/errors/HttpError';

const authHandler = (req: Request, res: Response, next: NextFunction) => {
	let token;

	try {
		if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
			// get the token
			token = req.headers.authorization.split(' ')[1];

			// verify the token
			const decoded = decodeToken(token);

			// store user
			res.locals.user = decoded;

			// next middleware
			next();
		}
	} catch (error) {
		throw new HttpError('Not Authorized', 401);
	}

	if (!token) {
		throw new HttpError('Not logged in', 403);
	}
};

export default authHandler;
