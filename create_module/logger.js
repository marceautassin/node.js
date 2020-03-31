const EventEmitter = require('events');
// const emitter = new EventEmitter();

const url = 'http://test.io/log';

class Logger extends EventEmitter {
  log(message) {
    console.log(message + ' oh yeah');

    // Raise emitter
    this.emit('messageLogged',  {id: 1, url: 'http://'});
  }
}


module.exports = Logger;
