const winston = require('winston');
const logger = winston.createLogger({
	level: 'info',
	format: winston.format.json(),
	transports: [
		//
		// - Write to all logs with level `info` and below to `combined.log`
		// - Write all logs error (and below) to `error.log`.
		//
		new winston.transports.File({ filename: `logs/log-error/error.log`, level: 'error' }),
		new winston.transports.File({ filename: 'logs/log-info/info.log', level: 'info' })
	]
});

module.exports = logger;
