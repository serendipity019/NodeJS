const winstom = require('winston');

const logger = winston.createLogger(
    {
        format: winston.format.json(),
        transports: [
            new winston.transports.Console()
        ]
    }
)

module.exports = logger; 