import md5 from 'md5';
// import { getUserByRefreshToken } from '../models/User';

import HttpError from '../utils/errors/HttpError';
import { IUser } from '../interfaces/User.interface';
import { generateAccessToken, generateRefreshToken } from '../helpers/jwtHandler';
import { getUserByUsername, saveUserRefreshToken } from '../models/User';

export const loginWithUsernameAndPassword = async (username: string, password: string) => {
	const user = await getUserByUsername(username);

	// ! User does not exist
	if (!user) {
		throw new HttpError('Invalid credentials', 401);
	}

	// hash password with MD5 algorithm
	const hashedPassword = md5(password);

	// ! Password does not match
	if (user.password !== hashedPassword) {
		throw new HttpError('Invalid credentials', 401);
	}

	// return user object
	const data: IUser = {
		id: user.id,
		firstName: user.firstName,
		lastName: user.lastName,
		username: user.username,
		msisdn: user.msisdn,
	};

	// generate access token
	const accessToken = generateAccessToken(data);

	// generate refresh token
	const refreshToken = generateRefreshToken(data);

	// save refresh token
	await saveUserRefreshToken(data.username, refreshToken);

	return { ...data, accessToken, refreshToken };
};

// export const logout = async (refreshToken: string) => {
// 	if (!user) {
// 		throw new HttpError('Invalid credentials', 401);
// 	}
// };
