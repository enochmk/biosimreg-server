import dotenv from 'dotenv';
import config from 'config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';

import routes from './routes';

dotenv.config();

const port = config.get('port') as number;
const env = config.get('env') as string;
const app = express();

// apply middleware
app.use(cors());
app.use(morgan('short'));
app.use(express.json());
app.use(helmet());
app.use(hpp());
app.use('/', routes);

// start express server
app.listen(port, () => {
	const message = `Server is running in mode: ${env} at http://localhost:${port}`;
	console.log(message);
});
