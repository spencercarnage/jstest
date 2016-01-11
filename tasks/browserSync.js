'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var historyApiFallback = require('connect-history-api-fallback')
const port = process.env.PORT || 3000;

module.exports = function() {
    browserSync.init(null, {
        // we need to disable clicks and forms for when we test multiple rooms
        proxy : 'http://localhost:' + port,
        files: ['public/**/*.*'],
        // broken with hapi
        //middleware : [ historyApiFallback() ],
        ghostMode: false,
        port: port
    });
};

