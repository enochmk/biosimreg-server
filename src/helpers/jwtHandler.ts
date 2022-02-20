import config from 'config';
import jwt from 'jsonwebtoken';

const ACCESS_TOKEN: string = config.get('jwt.accessToken');
const REFRESH_TOKEN: string = config.get('jwt.refreshToken');

interface IPayload {
	user: {
		username: string;
	};
	[key: string]: any;
}

export const generateAccessToken = (data: any) => {
	const payload: IPayload = {
		user: {
			username: data.username,
		},
	};

	const accessToken = jwt.sign(payload, ACCESS_TOKEN, {
		expiresIn: config.get('jwt.accessExpiresIn'),
	});

	return accessToken;
};

export const generateRefreshToken = (data: any) => {
	const payload: IPayload = {
		user: {
			username: data.username,
		},
	};

	const refreshToken = jwt.sign(payload, REFRESH_TOKEN, {
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
