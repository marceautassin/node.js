// OS global module

// const os = require('os');

// const totalMemory = os.totalmem();

// const freeMemory = os.freemem();


// console.log(`total memory: ${totalMemory}`);
// console.log(`free memory: ${freeMemory}`);

// FS global module

// const fs = require('fs');

// fs.readdir('./', (err, files) => {
//   if (err) console.log('Error', err);
//   else console.log('Result', files)
// });

//Event module and Class

// const EventEmitter = require('events');

// const Logger = require('./logger');
// const logger = new Logger();

// // Register a listener
// logger.on('messageLogged', (event) => console.log("welcome on the website"));

// logger.log('message');


// HTTP module

const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.write('Hello World');
    res.end();
  }

  if (req.url === '/test') {
    res.write(JSON.stringify([1,2,3]));
    // res.write([1,2,3]);
    res.end();
  }
});

// server.on('connection', (socket) => {
//   console.log('New connection');
// });

server.listen(3000);

console.log('listening on port 3000');
