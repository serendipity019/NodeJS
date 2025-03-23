const http = require('node:http'); //this is a server library from node

const hostname = '127.0.0.1' ; //localhost ip

const port = 3000; 

const server = http.createServer((req, res) => {
    if (req) {
        console.log("A request");
        res.statusCode = 200; 
        res.setHeader("Content-Type", "text-plain");
        res.end("Hello World\n");
    }
})

server.listen(port, hostname, () => {
    console.log(`Server runing a http://${hostname}:${port}/` );
})

