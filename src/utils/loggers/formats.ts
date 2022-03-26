import { format } from 'winston';

// For console logs
export const pretty = format.printf((log: any): string => {
	const { timestamp, level, message, context } = log;
	return `[${timestamp}] [${level.toUpperCase()}] [${context?.user || ''} - ${
		context?.label || ''
	}]: ${message}`;
});

// For functional logs
export const json = format.printf((log: any): string => {
	const schema: any = {
		timestamp: log.timestamp,
		level: log.level,
		requestID: log?.context?.requestID,
		user: log?.context?.user,
		label: log?.context?.label,
		message: log.message,
		context: {
			requestID: log?.context?.requestID,
			user: log?.context?.user,
			...log?.context,
		},
	};

	return JSON.stringify(schema);
});

// For error logs
export const error = format.printf((log: any): string => {
	const schema: any = {
		timestamp: log.timestamp,
		level: log.level,
		requestID: log?.context?.requestID,
		user: log?.context?.user,
		label: log?.context?.label,
		message: log.message,
		context: {
			requestID: log.context?.requestID,
			user: log.context?.user,
			error: {
				statusCode: log.context?.statusCode,
				request: log.context?.request,
				trace: {
					stack: log.context?.stack,
				},
			},
		},
	};

	return JSON.stringify(schema);
});
