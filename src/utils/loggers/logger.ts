import config from 'config';
import winston, { format } from 'winston';

import { pretty } from './formats';
import * as options from './options';

const transports: any = [
	new winston.transports.File(options.combined),
	new winston.transports.File(options.error),
];

// if console logging is enabled
if (config.get('logger.console')) {
	transports.push(
		new winston.transports.Console({
			level: 'verbose',
			format: format.combine(pretty, format.colorize({ all: true })),
		})
	);
}

// Create logger with configurations
const logger = winston.createLogger({
	transports,
	levels: winston.config.npm.levels,
	format: format.combine(
		format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
		format.errors({ stack: true })
	),
});

export default logger;
