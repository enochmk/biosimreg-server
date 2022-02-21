import { Request, Response, NextFunction } from 'express';

import { decodeToken } from '../helpers/jwtHandler';
import HttpError from '../utils/errors/HttpError';
import { getProfileDetails } from '../services/profile.service';

const verifyJWT = async (req: Request, res: Response, next: NextFunction) => {
	const authorization = req.headers?.authorization;

	if (!authorization) throw new HttpError('Not Authorized', 401);
	if (!authorization.startsWith('Bearer')) throw new HttpError('Invalid Authorization', 400);

	// get the token
	const token = authorization.split(' ')[1];

	try {
		// verify the token
		const decoded = decodeToken(token);

		// get user data
		const user = await getProfileDetails(decoded.user.username);

		// ! user not found
		if (!user) throw new HttpError('User not found', 404);

		// ! account disabled
		if (!user?.active) throw new HttpError('User is not active', 401);

		// save user data to request
		res.locals.user = user;

		// next middleware
		next();
	} catch (error: any) {
		let message = error.message;

		// handle expired token
		if (message.includes('jwt expired')) message = 'Token expired. Please login again';

		// handle invalid signature
		if (message.includes('invalid signature')) message = 'Invalid token. Please login again';

		next(new HttpError(message, 401));
	}
};

export default verifyJWT;
