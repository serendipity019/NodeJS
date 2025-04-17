const jwt = require('jsonwebtoken');
const authService = require('../services/auth.service');

function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.spit(' ')[1];

    if (!token) {
        return res.status(401).json({status: false,  message:"Access Denied. No Token provided"});
    }

    const result = authService.verifyAccessToken; 

   if (!result.verified) {
    return res.status(403).json({status: false, data: result.data});
   }

   req.user = result.data;
   next();
};

function verifyRoles(allowedRole) {
    return (req, res, next) => {
        if(!req.user || !req.user.roles) {
            return res.status(403).json({status: false, data: "Forbidden: no roles found"});
        }

        const userRoles = req.user.roles;
        //const hasPermission = userRoles.some(role => allowedRole.includes(role));
        const hasPermission = userRoles.includes(allowedRole);

        if (!hasPermission) {
            return res.status(403).json({status: false, data: "Forbidden: insufficient permissions"});
        }

        next();
    }
}

module.exports = {verifyToken, verifyRoles};//First example
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
// For jest tests
//require('dotenv').config(); // take off from here and put the setupFiles in pacakage.json
//Third example use MongoDB and dailyrotateFile 
require('winston-daily-rotate-file');
 