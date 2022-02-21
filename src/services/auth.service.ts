import md5 from 'md5';

import HttpError from '../utils/errors/HttpError';
import { generateAccessToken, generateRefreshToken } from '../helpers/jwtHandler';
import * as AuthModel from '../models/User';

export const loginWithUsernameAndPassword = async (username: string, password: string) => {
	const foundUser = await AuthModel.getUserByUsername(username);

	// ! User does not exist
	if (!foundUser) throw new HttpError('Invalid credentials', 401);

	// hash password with MD5 algorithm
	const hashedPassword = md5(password);

	// ! Password does not match
	if (foundUser.password !== hashedPassword) throw new HttpError('Invalid credentials', 401);

	// return user object
	const user = {
		username: foundUser.username,
	};

	// generate access token
	const accessToken = generateAccessToken({ user });

	// generate refresh token
	const refreshToken = generateRefreshToken({ user });

	// save refresh token
	await AuthModel.saveUserRefreshToken(foundUser.username, refreshToken);

	return { accessToken, refreshToken };
};
