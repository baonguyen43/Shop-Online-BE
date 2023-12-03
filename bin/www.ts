#!/usr/bin/env node

/**
 * Module dependencies.
 */
<<<<<<< HEAD
<<<<<<< HEAD

// import app from '../app';
=======
=======
>>>>>>> c3b3c07cd14d8878f81b5aebf691ac948ed369fe
const app = require('../app');
const debug = require('debug')('express-typescript:server');
const http = require('http');

// const app = require('./app');
>>>>>>> c3b3c07 (fix bin 4)
// const debug = require('debug')('express-typescript:server');
<<<<<<< HEAD
// import http from 'http';

const app = require('./app');
const debug = require('debug')('express-typescript:server');
const http = require('http');
=======
// const http = require('http');
>>>>>>> c3b3c07cd14d8878f81b5aebf691ac948ed369fe

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '9000');
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val:any) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error:any) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + address?.port;
  debug('Listening on ' + bind);
}
