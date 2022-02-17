import { PrismaClient } from '@prisma/client';
import md5 from 'md5';
import Yup from 'yup';

import HttpError from '../utils/errors/HttpError';
import { generateAccessToken } from '../helpers/tokenGenerator';


export const login = async (username: string, password: string) => {
	const prisma = new PrismaClient();

	
	const user = await prisma.user.findFirst({
		where: {
			username: username,
		},
	});
	// console.log(user.password)

	// ! Check if user exists
	if (!user) throw new HttpError('Invalid credentials', 401);

	// ! check if password match
	const hashedPassword = md5(password);

	if (user.password !== hashedPassword) throw new HttpError('Invalid credentials', 401);

	// return user object
	const data = {
		firstName: user.firstName,
		lastName: user.lastName,
		id: user.id,
		username: user.username,
		msisdn: user.msisdn,
	};

	const token: string = generateAccessToken(data);

	return { data, token };
};
