import dotenv from 'dotenv';

dotenv.config();

const COOKIE_AGE = 1000 * 60 * 60 * 24;

export default {
	port: process.env.PORT || 5000,
	env: process.env.NODE_ENV || 'development',
	jwt: {
		accessExpiresIn: '30m',
		refreshExpiresIn: '1h',
		accessToken: process.env.ACCESS_TOKEN_SECRET,
		refreshToken: process.env.REFRESH_TOKEN_SECRET,
	},
	cookie: {
		age: COOKIE_AGE,
	},
	corsOptions: {
		credentials: true,
		origin: process.env.ORIGINS || ['http://localhost:3000', 'http://10.81.9.68:9090'],
		optionSuccessStatus: 200,
	},
	logger: {
		console: true,
		path: '',
	},
};
