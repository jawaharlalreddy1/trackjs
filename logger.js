'use strict'
const winston = require('winston')
var expressWinston = require('express-winston')
const fs = require('fs')
const env = process.env.NODE_ENV || 'development'
//const { Airbrake } = require('winston-airbrake2');
const logDir = 'logger'

expressWinston.requestWhitelist.push('body')
expressWinston.responseWhitelist.push('body')
// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir)
}
const tsFormat = () => (new Date()).toLocaleTimeString()
const logger = winston.createLogger({
    transports: [
        // colorize the output to the console
        new (winston.transports.Console)({
            timestamp: tsFormat,
            colorize: true,
            level: 'info'
        }),
        new (require('winston-daily-rotate-file'))({
            filename: `${logDir}/-titanlogs.log`,
            timestamp: tsFormat,
            datePattern: 'yyyy-MM-dd',
            prepend: true,
            level: env === 'development' ? 'verbose' : 'info'
        })
    ]
})

var options = {
    apiKey: "d41277b604f2e90c53731cd83238b5b8",
    name:"241120"
}

//logger.add(new Airbrake(options));

var expresslogger = expressWinston.logger({
    transports: [
        new (require('winston-daily-rotate-file'))({
            filename: `${logDir}/-titanlogs.log`,
            timestamp: tsFormat,
            datePattern: 'yyyy-MM-dd',
            prepend: true,
            json: true,
            colorize: true,
            msg: 'HTTP {{req.method}} {{req.url}}',
            ignoreRoute: function (req, res) { return true; },
            requestWhitelist: ['body'],
            responseWhitelist: ['body']
        })

    ]
})



var infoLogger = function (infoMsg, id, object) {
    logger.info(object + '-' + id + '- ' + infoMsg)
}

var debugLogger = function (debugMsg, id, object) {
    logger.debug(object + '-' + id + '- ' + debugMsg)
}

var errorLogger = function (errMsg, id, object) {
    logger.error(object + '-' + id + '- ' + errMsg)
}

var warnLogger = function (warnMsg, id, object) {
    logger.warn(object + '-' + id + '- ' + warnMsg)
}

exports.info = infoLogger
exports.debug = debugLogger
exports.error = errorLogger
exports.warn = warnLogger
exports.expresslogger = expresslogger
