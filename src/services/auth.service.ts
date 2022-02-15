import { PrismaClient } from '@prisma/client';

import HttpError from '../utils/errors/HttpError';
import { generateAccessToken } from '../helpers/tokenGenerator';

export const login = async (username: string, password: string) => {
	const prisma = new PrismaClient();

	const user = await prisma.user.findFirst({
		where: {
			username: username,
		},
	});

	// ! Check if user exists
	if (!user) throw new HttpError('Invalid credentials', 401);

	// ! check if password match
	if (user.password !== password) throw new HttpError('Invalid credentials', 401);

	// return user object
	const payload = {
		firstName: user.firstName,
		lastName: user.lastName,
		id: user.id,
		username: user.username,
		msisdn: user.msisdn,
	};

	const token = generateAccessToken(payload);

	return token;
};
