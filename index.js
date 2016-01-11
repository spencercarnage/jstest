'use strict';

const Hapi = require('hapi');
const port = process.env.PORT || 3000;

// Create a server with a host and port
const server = new Hapi.Server();

server.connection({
  host: 'localhost',
  port: port,
  labels: ['app']
});

server.connection({
  port: 4040,
  labels: ['quiz']
});

const io = require('socket.io')(server.select('quiz').listener);

io.on('connection', function (socket) {
  socket.emit('oh hi!');

  socket.on('burp', function () {
    console.log('excuse you');
  });
});

const rootHandler = function (request, reply) {
    reply.view('index', {
        title: 'example',
        message: 'hello world'
    });
};

server.register(require('vision'), (err) => {
    if (err) {
        throw err;
    }

    server.views({
        engines: {
            jade: require('jade')
        },
        path: __dirname + '/templates',
        compileOptions: {
            pretty: true
        }
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: rootHandler
    });
});

server.register(require('inert'), (err) => {
    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: 'public'
            }
        }
    });
});


// Start the server
server.start((err) => {
    if (err) {
        throw err;
    }

    console.log('Server running at:', server.connections[0].info.uri);
});
