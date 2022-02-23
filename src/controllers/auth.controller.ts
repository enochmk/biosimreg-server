/* eslint-disable  */
import config from 'config';
import { NextFunction, Request, Response } from 'express';
import { getUserByUsername, clearUserRefreshToken, getUserByRefreshToken } from '../models/User';

import { verifyRefreshToken, generateAccessToken } from '../helpers/jwtHandler';

import * as Auth from '../services/auth.service';
import asyncHandler from '../middlewares/asyncHandler';
import HttpError from '../utils/errors/HttpError';

const COOKIE_AGE: number = config.get('cookie.age');

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

export const handleRefreshToken = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const cookies = req.cookies;

		// ! No cookie set
		if (!cookies?.jwt) {
			return next(new HttpError("You're not logged in. Please log in.", 401));
		}

		// get refresh token from cookie
		const refreshToken = cookies.jwt;

		try {
			// decode refresh token
			const decoded = verifyRefreshToken(refreshToken);

			// get the user data for the refresh token
			const user = await getUserByUsername(decoded.user.username);

			// ! user does not exist
			if (!user) return next(new HttpError('Not Authorized', 401));

			const accessToken = generateAccessToken({ user: decoded.user });
			return res.json({ accessToken });
		} catch (error: any) {
			return next(new HttpError(error.message, 403));
		}
	}
);
