import md5 from 'md5';

import HttpError from '../utils/errors/HttpError';
import { generateAccessToken, generateRefreshToken } from '../helpers/jwtHandler';
import * as Auth from '../models/Auth';

export const loginWithUsernameAndPassword = async (username: string, password: string) => {
	const foundUser = await Auth.getUserByUsername(username);

	// ! User does not exist
	if (!foundUser) throw new HttpError('Invalid credentials', 401);

	// hash password with MD5 algorithm
	const hashedPassword = md5(password);

	// ! Password does not match
	if (foundUser.PASSWORD !== hashedPassword) {
		throw new HttpError('Invalid credentials', 401);
	}

	// return user object
	const user = { username: foundUser.USERNAME };

	// generate access token
	const accessToken = generateAccessToken({ user });

	// generate refresh token
	const refreshToken = generateRefreshToken({ user });

	// save refresh token
	await Auth.saveUserRefreshToken(foundUser.USERNAME, refreshToken);

	return { accessToken, refreshToken };
};
