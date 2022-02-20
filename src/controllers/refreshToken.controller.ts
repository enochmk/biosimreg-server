import { Request, Response, NextFunction } from 'express';

import HttpError from '../utils/errors/HttpError';
import { getUserByRefreshToken } from '../models/User';
import { verifyRefreshToken, generateAccessToken } from '../helpers/jwtHandler';

export const handleRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
	const cookies = req.cookies;

	// ! No cookie set
	if (!cookies?.jwt) {
		return next(new HttpError('Not Authorized', 401));
	}

	// get refresh token from cookie
	const refreshToken = cookies.jwt;

	// get the user data for the refresh token
	const user = await getUserByRefreshToken(refreshToken);

	// ! user does not exist
	if (!user) return next(new HttpError('Not Authorized', 401));

	try {
		const decoded = verifyRefreshToken(refreshToken);
		const accessToken = generateAccessToken(decoded);
		return res.json({ accessToken });
	} catch (error) {
		return next(new HttpError('Forbidden', 403));
	}
};
