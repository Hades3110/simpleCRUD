import winston from 'winston';

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File( { filename: 'combined.log' })
    ]
});

interface LoggerRequest extends Request {
    calledFunction? : {
        [ name: string ]: unknown[];
    }
}

export const logInfo = (req: LoggerRequest) => {
    if(req.calledFunction) {
        logger.log({
            level: 'info',
            message: JSON.stringify(req.calledFunction),
        });
    }
};
