import dotenv from 'dotenv';

dotenv.config();

export default {
	port: process.env.PORT || 5000,
	env: process.env.NODE_ENV || 'development',
	jwt: {
		expiresIn: '1h',
		secret: process.env.JWT_SECRET || '12345678',
	},
};
