import config from 'config';
import jwt from 'jsonwebtoken';

import { IUser } from '../interfaces/User.interface';

const JWT_SECRET: string = config.get('jwt.secret');

export const generateToken = (payload: IUser) => {
	const accessToken = jwt.sign(payload, JWT_SECRET, {
		expiresIn: config.get('jwt.expiresIn'),
	});

	return accessToken;
};

export const decodeToken = (token: string) => {
	const decoded = jwt.verify(token, JWT_SECRET);

	return decoded;
};
