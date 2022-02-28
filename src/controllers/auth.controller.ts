/* eslint-disable  */
import config from 'config';
import { NextFunction, Request, Response } from 'express';
import { getUserByUsername, clearUserRefreshToken, getUserByRefreshToken } from '../models/User';

import { verifyRefreshToken, generateAccessToken } from '../helpers/jwtHandler';

import * as Auth from '../services/auth.service';
import asyncHandler from '../middlewares/asyncHandler';
import HttpError from '../utils/errors/HttpError';

const COOKIE_AGE: number = config.get('cookie.age');

// @desc generate an access token
// @route POST /api/v1/auth/login
export const handleLogin = asyncHandler(
	async (req: Request, res: Response, _next: NextFunction) => {
		const data = await Auth.loginWithUsernameAndPassword(req.body.username, req.body.password);

		// sign cookie
		res.cookie('jwt', data.refreshToken, {
			httpOnly: true,
			sameSite: true,
			// secure: true,
			maxAge: COOKIE_AGE,
		});

		// send response
		return res.json({ accessToken: data.accessToken });
	}
);

// @desc clear cookie and refreshToken from database
// @route POST /api/v1/auth/logout
export const handleLogout = asyncHandler(
	async (req: Request, res: Response, _next: NextFunction) => {
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
			await clearUserRefreshToken(user?.username);
		}

		// clear cookie
		res.clearCookie('jwt', {
			httpOnly: true,
			sameSite: true,
			// secure: true,
		});

		// send response
		return res.sendStatus(204);
	}
);

// @desc use cookie to generate new access token
// @route POST /api/v1/auth/refresh
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
