import dotenv from 'dotenv';

dotenv.config();

export default {
	port: process.env.PORT || 5002,
	env: process.env.NODE_ENV || 'development',
};
