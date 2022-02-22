/* eslint-disable no-console */
import config from 'config';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import { PrismaClient } from '@prisma/client';

import routes from './routes/routes';
import errorHandler from './middlewares/errorHandler';

dotenv.config();

const port = config.get('port') as number;
const env = config.get('env') as string;
const corsOptions: any = config.get('corsOptions');

const prisma = new PrismaClient();
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
	console.log(message);

	prisma
		.$connect()
		.then(() => console.log('Connected to database'))
		.catch((err: any) => {
			console.error(err.message);
			process.exit(1);
		});
});
