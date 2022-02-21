import config from 'config';
import jwt from 'jsonwebtoken';

import { IPayload } from '../interfaces/User.interface';

const ACCESS_TOKEN: string = config.get('jwt.accessToken');
const REFRESH_TOKEN: string = config.get('jwt.refreshToken');

export const generateAccessToken = (data: any) => {
	const accessToken = jwt.sign(data, ACCESS_TOKEN, {
		expiresIn: config.get('jwt.accessExpiresIn'),
	});

	return accessToken;
};

export const generateRefreshToken = (data: any) => {
	const refreshToken = jwt.sign(data, REFRESH_TOKEN, {
		expiresIn: config.get('jwt.refreshExpiresIn'),
	});

	return refreshToken;
};

export const decodeToken = (token: string) => {
	const decoded = jwt.verify(token, ACCESS_TOKEN) as IPayload;
	return decoded;
};

export const verifyRefreshToken = (token: string) => {
	const decoded = jwt.verify(token, REFRESH_TOKEN) as IPayload;
	return decoded;
};
