'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var historyApiFallback = require('connect-history-api-fallback')
const port = process.env.PORT || 3000;

module.exports = function() {
  browserSync.init(null, {
    proxy : {
      target: 'http://localhost:' + port,
      ws: true
    },
    files: ['public/**/*.*'],
    ghostMode: true,
    port
  });
};

