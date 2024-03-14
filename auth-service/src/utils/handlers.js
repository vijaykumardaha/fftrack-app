const fs = require('fs')
const path = require('path');
const { createLogger, transports } = require('winston');
const { GetErrorFileName, GetRequestFileName } = require('./helpers');

class CustomError extends Error {
    constructor(error, data, message, code, res = null) {
            super(message)
            this.error = true;
            this.message = message;
            if (res) {
                    res.status(code);
                    res.json({ error, data, message });
            }
    }
}

class CustomResponse {
    constructor(error, data, message, res, count = 0) {
            res.status(200);
            res.json({ error, data, message, count });
    }
}

class WinstonLogger {
    constructor() {
        try {
            // Create logs directory for logs
            const logDir = 'logs';
            if (!fs.existsSync(logDir)) {
                fs.mkdirSync(logDir);
            }

            const errorFilePath = path.join(logDir, `/${GetErrorFileName()}`);

            if (!fs.existsSync(errorFilePath)) {
                fs.writeFileSync(errorFilePath, '');
            }

            const requestFilePath = path.join(logDir, `/${GetRequestFileName()}`);
            if (!fs.existsSync(requestFilePath)) {
                fs.writeFileSync(requestFilePath, '');
            }


        } catch (err) {
            this.logError(err);
        }
    }

    logError(err) {
        const logDir = 'logs';
        const LogErrors = createLogger({
            transports: [
                new transports.Console(),
                new transports.File({ filename: path.join(logDir, `/${GetErrorFileName()}`)})
            ]
        });
        LogErrors.log({ private: true, level: 'error', message: err.message, time: `${new Date()}}` });
    }

    logRequest(req) {
        const logDir = 'logs';
        const LogErrors = createLogger({
            transports: [
                new transports.Console(),
                new transports.File({ filename: path.join(logDir, `/${GetRequestFileName()}`)})
            ]
        });
        const requestInfo = `Url: ${req.url}, Method: ${req.method}, Query: ${JSON.stringify(req.query)}, Body: ${JSON.stringify(req.body)}`;
        LogErrors.info({ private: true, level: 'info', message: requestInfo, time: `${new Date()}}` });
    }
}

const ErrorLogging = async (error) => {
    const errorLogger = new WinstonLogger();
    await errorLogger.logError(error);
}


const RequestLogging = async (req) => {
    const requestLogger = new WinstonLogger();
    requestLogger.logRequest(req);
}

const ErrorHandler = (err, _req, res, next) => {
    if (err) {
        const errorLogger = new WinstonLogger();
        errorLogger.logError(err);
        return res.status(500).json({ error: err.error || true, data: err.data || null, message: err.message })
    }
    next();
}

module.exports.ErrorHandler = ErrorHandler;
module.exports.ErrorLogging = ErrorLogging;
module.exports.RequestLogging = RequestLogging;
module.exports.CustomResponse = CustomResponse;
module.exports.CustomError = CustomError;
