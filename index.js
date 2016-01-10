'use strict';

const Hapi = require('hapi');

// Create a server with a host and port
const server = new Hapi.Server();

server.connection({
    host: 'localhost',
    port: 8000
});

const io = require('socket.io')(server.listener);


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

    console.log('Server running at:', server.info.uri);
});
