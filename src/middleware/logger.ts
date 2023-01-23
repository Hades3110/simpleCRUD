import process from 'process';
import winston from 'winston';

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File( { filename: 'combined.log' })
    ]
});

interface LoggerRequest extends Request {
    calledFunction : {
        [ name: string ]: unknown[];
    }
    error? : Error;
}

const logError = (error: Error) => {
    logger.log({
        level: 'error',
        message: JSON.stringify(error, Object.getOwnPropertyNames(error)),
    });
};

process.on('uncaughtException', (error) => {
    logError(error);
});

export const log = (req: LoggerRequest) => {
    logger.log({
        level: 'info',
        message: JSON.stringify(req.calledFunction),
    });
    if(req.error) logError(req.error);
};
