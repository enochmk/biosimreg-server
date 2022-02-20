import dotenv from 'dotenv';

dotenv.config();

const COOKIE_AGE = 1000 * 60 * 60 * 24;

export default {
	port: process.env.PORT || 5000,
	env: process.env.NODE_ENV || 'development',
	jwt: {
		accessExpiresIn: '30s',
		refreshExpiresIn: '1h',
		accessToken: process.env.ACCESS_TOKEN_SECRET,
		refreshToken: process.env.REFRESH_TOKEN_SECRET,
	},
	cookie: {
		age: COOKIE_AGE,
	},
};
