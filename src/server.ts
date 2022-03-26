import config from 'config';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';

import routes from './routes';
import prisma from './database/PrismaClient';
import errorHandler from './middlewares/errorHandler';
import logger from './utils/loggers/logger';

dotenv.config();

const port = config.get('port') as number;
const env = config.get('env') as string;
const corsOptions: any = config.get('corsOptions');

const app = express();

// apply middleware
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(hpp());
app.use('/api', routes);
app.use(errorHandler);

// start express server
app.listen(port, () => {
	const message = `Server is running in mode: ${env} at http://localhost:${port}`;
	logger.info(message);

	try {
		prisma.$connect();
		logger.info('Connected to database');
	} catch (error) {
		logger.error(error);
		process.exit(1);
	}
});
