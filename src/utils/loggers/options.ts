import path from 'path';
import config from 'config';
import { format } from 'winston';
import moment from 'moment';

import * as logFormatter from './formats';

const directory = config.get<string>('logger.path');
const currentDay = moment().format('YYYYMMDD');

export const console = {
	level: 'verbose',
	filename: path.join(directory, 'logs', currentDay, 'verbose.log'),
	format: format.combine(logFormatter.pretty, format.colorize({ all: true })),
	colorize: true,
};

export const error = {
	level: 'error',
	filename: path.join(directory, 'logs', currentDay, 'error.log'),
	format: format.combine(logFormatter.error),
	expressFormat: true,
};

export const combined = {
	level: 'http',
	format: logFormatter.json,
	filename: path.join(directory, 'logs', currentDay, 'combined.log'),
};
