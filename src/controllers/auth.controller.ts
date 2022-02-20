import config from 'config';
import { Request, Response } from 'express';
import { clearUserRefreshToken, getUserByRefreshToken } from '../models/User';

import * as AuthService from '../services/auth.service';
import asyncHandler from '../middlewares/asyncHandler';

const COOKIE_AGE: number = config.get('cookie.age');

export const login = asyncHandler(async (req: Request, res: Response) => {
	const data = await AuthService.loginWithUsernameAndPassword(req.body.username, req.body.password);

	// sign cookie
	res.cookie('jwt', data.refreshToken, {
		httpOnly: true,
		sameSite: true,
		secure: true,
		maxAge: COOKIE_AGE,
	});

	// send response
	return res.json({ accessToken: data.accessToken });
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
	const cookies = req.cookies;

	// ! No cookie set
	if (!cookies?.jwt) return res.sendStatus(204); // No Content

	// get refresh token from cookie
	const refreshToken = cookies.jwt;

	// get the user data for the refresh token
	const user = await getUserByRefreshToken(refreshToken);

	// user found, clear refreshToken from db
	if (user) await clearUserRefreshToken(user.username);

	// clear cookie
	res.clearCookie('jwt', {
		httpOnly: true,
		sameSite: true,
		secure: true,
	});

	// send response
	return res.sendStatus(204);
});
