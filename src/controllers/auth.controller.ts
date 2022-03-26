import config from 'config';
import { NextFunction, Request, Response } from 'express';
import { getUserByUsername, clearUserRefreshToken, getUserByRefreshToken } from '../models/Auth';

import { verifyRefreshToken, generateAccessToken } from '../helpers/jwtHandler';

import * as Auth from '../services/auth.services';
import asyncHandler from '../middlewares/asyncHandler';
import HttpError from '../utils/errors/HttpError';

const COOKIE_AGE: number = config.get('cookie.age');

// @desc generate an access token
export const handleLogin = asyncHandler(async (req: Request, res: Response) => {
	const auth = await Auth.loginWithUsernameAndPassword(req.body.username, req.body.password);

	// sign cookie
	res.cookie('jwt', auth.refreshToken, {
		httpOnly: true,
		sameSite: true,
		// secure: true,
		maxAge: COOKIE_AGE,
	});

	// send response
	return res.json({ accessToken: auth.accessToken });
});

// @desc clear cookie and refreshToken from database
export const handleLogout = asyncHandler(async (req: Request, res: Response) => {
	const cookies = req.cookies;

	// ! No cookie set
	if (!cookies?.jwt) {
		return res.sendStatus(204);
	}

	// get refresh token from cookie
	const refreshToken = cookies.jwt;

	// get the user of this refresh token
	const user = await getUserByRefreshToken(refreshToken);

	// clear refresh token from db
	if (user) {
		await clearUserRefreshToken(user?.USERNAME);
	}

	// clear cookie
	res.clearCookie('jwt', {
		httpOnly: true,
		sameSite: true,
		// secure: true,
	});

	// send response
	return res.sendStatus(204);
});

// @desc use cookie to generate new access token
export const handleRefreshToken = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		// get cookie from request
		const cookies = req.cookies;

		// ! No cookie set
		if (!cookies?.jwt) {
			return next(new HttpError('You are not logged in. Please log in.', 401));
		}

		// get refresh token from cookie
		const refreshToken = cookies.jwt;

		try {
			// decode refresh token
			const decoded = verifyRefreshToken(refreshToken);

			// get the user data for the decoded refresh token via username
			const user = await getUserByUsername(decoded.user.username);

			// ! user does not exist
			if (!user) return next(new HttpError('Not Authorized', 401));

			// ? generate new access token
			const accessToken = generateAccessToken({ user: decoded.user });

			// * send response
			return res.json({ accessToken });
		} catch (error: any) {
			// ! unable to grant new access token
			return next(new HttpError(error.message, 401));
		}
	}
);
