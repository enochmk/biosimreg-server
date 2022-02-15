import dotenv from 'dotenv';
import config from 'config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';

dotenv.config();

const port = config.get('port') as number;
const env = config.get('env') as string;
const app = express();

//* middleware
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(hpp());

app.listen(port, async () => {
	const message = `Server is running in mode: ${env} at http://localhost:${port}`;
	console.log(message);
});
