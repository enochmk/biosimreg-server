/* eslint-disable no-console */
import dotenv from 'dotenv';
import config from 'config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { PrismaClient } from '@prisma/client';

import routes from './routes';
import errorHandler from './middlewares/errorHandler';

const prisma = new PrismaClient();

dotenv.config();

const port = config.get('port') as number;
const env = config.get('env') as string;
const app = express();

// apply middleware
app.use(cors());
app.use(morgan('short'));
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
