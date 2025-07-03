import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const logFormat = format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ timestamp, level, message }) => {
        return `[${timestamp}] [${level.toUpperCase()}] ${message}`;
    })
);

const logger = createLogger({
    level: 'info',
    format: logFormat,
    transports: [
        new transports.Console(),

        // Daily log rotation
        new DailyRotateFile({
            dirname: 'logs',               // Folder to store logs
            filename: '%DATE%.log',        // Log file name format
            datePattern: 'YYYY-MM-DD',     // Rotate daily
            zippedArchive: true,           // Compress old logs
            maxSize: '20m',                // Max size per file
            maxFiles: '14d'                // Keep logs for 14 days
        }),

        // Optionally keep a separate error log
        new DailyRotateFile({
            dirname: 'logs',
            filename: 'error-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            level: 'error',
            zippedArchive: true,
            maxFiles: '30d'
        })
    ]
});

export default logger;
