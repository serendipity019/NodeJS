

//First example
// const winstom = require('winston');
// const logger = winston.createLogger(
//     {
//         format: winston.format.json(),
//         transports: [
//             new winston.transports.Console()
//         ]
//     }
// )

//second example custom format with timestamp
// const {format, createLogger, transports} = require('winston');
// const {combine, timestamp, label, printf} = format; 
// const CATEGORY = 'Product app loggs'
// const customFormat = printf(({message, level, label, timestamp}) => {
//     return `${timestamp} [${label}: ${level}, ${message}]`; 
// } );

// const logger = createLogger({
//     // level: "warn",
//     format: combine(
//         label({label:CATEGORY}),
//         timestamp(),
//         customFormat
//     ),
//     transports: [new transports.Console()]
// });

//Third example use MongoDB and dailyrotateFile 
require(winston-daily-rotate-file);
require('winston-mongodb');

const {format, createLogger, transports} = require('winston');
const { DailyRotateFile } = require('winston/lib/winston/transports');
const {combine, timestamp, label, printf, prettyPrint} = format; 
const CATEGORY = 'Product app loggs';

const fileRotateTransport = new transports.DailyRotateFile({
    filename: "./logs/rotate-%DATE%.log",
    datePattern: "DD-MM-YYYY",
    maxFiles: "7d", // create a new file every 7 days or maxSize: create a new file when fill the size. 
    //level: "error" //if we want to be only for the errors
});

const logger = createLogger({
    format: combine(
        label({label: "MY LABEL FOR PRODUCTS APP"}),
        timestamp({format: "DD-MM-YYYY HH:mm:sss"}),
        format.json()
        //prettyPrint()
    ),
    transports: [
        new transports.Console(), // This saw the log message in our console
        fileRotateTransport,
        new transports.File(
            {
                filename: "logs/example.log"
            }
        ),
        new transports.File(
            {
                level: "warn", // this file will log and the errors
                filename: 'logs/warn.log' 
            }
        ),
        new transports.File({
            level: "info", // This file will log errors, warns and info level
            //filename: 'logs/info.json' 
            filename: 'logs/info.log' 
        }),
        new transports.MongoDB({
            level: "error",
            db: process.env.MONGODB_URI,
            collection: 'server_logs', // the name of the collection
            format: format.combine(
                format.timestamp(),
                format.json()
            )
        })
    ]
})

module.exports = logger; 