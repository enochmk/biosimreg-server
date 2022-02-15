import dotenv from 'dotenv';

dotenv.config();

export default {
	port: process.env.PORT || 3000,
	env: process.env.NODE_ENV || 'development',
	jwt: {
		expiresIn: '3d',
		secret: process.env.JWT_SECRET || '12345678',
	},
};
