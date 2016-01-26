'use strict';

const express = require('express');
const path = require('path');
const port = process.env.PORT || 3000;
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);


// serve static assets
app.use(express.static(__dirname + '/public'));

app.set('views', './templates');
app.set('view engine', 'jade');

// Handle all routes so they go to index.html
app.get('*', function (request, response) {
  response.render('index');
});

server.listen(4040);
app.listen(port);

io.on('connection', function (socket) {
  socket.emit('oh hi!');

  socket.on('burp', function () {
    console.log('excuse you');
  });

  socket.on('player:join', function (player) {
    console.log('player has joined', player);
  });
});

console.log('server started on port ' +  port);

//const rootHandler = function (request, reply) {
//    reply.view('index', {
//        title: 'example',
//        message: 'hello world'
//    });
//};
//
//server.register(require('vision'), (err) => {
//    if (err) {
//        throw err;
//    }
//
//    server.views({
//        engines: {
//            jade: require('jade')
//        },
//        path: __dirname + '/templates',
//        compileOptions: {
//            pretty: true
//        }
//    });
//
//    server.route({
//        method: 'GET',
//        path: '/*',
//        handler: rootHandler
//    });
//});
//
//server.register(require('inert'), (err) => {
//    server.route({
//        method: 'GET',
//        path: '/{param*}',
//        handler: {
//            directory: {
//                path: 'public'
//            }
//        }
//    });
//});
//
//
//// Start the server
//server.start((err) => {
//    if (err) {
//        throw err;
//    }
//
//    console.log('Server running at:', server.connections[0].info.uri);
//});
