import md5 from 'md5';
import { PrismaClient } from '@prisma/client';

import HttpError from '../utils/errors/HttpError';
import { IUser } from './../interfaces/User.interface';
import { generateToken } from '../helpers/tokenGenerator';
import { getUserByUsername } from '../models/User';

/**
 * @description Login user
 */
export const loginWithUsernameAndPassword = async (username: string, password: string) => {
	const user = await getUserByUsername(username);

	// ! Check if user exists
	if (!user) {
		throw new HttpError('Invalid credentials', 401);
	}

	// hash password with MD5 algorithm
	const hashedPassword = md5(password);

	// ! check if password match
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

	// generate token
	const token = generateToken(data);

	return { ...data, token };
};
