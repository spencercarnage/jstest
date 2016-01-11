'use strict';

var gulp = require('gulp');
// Load all gulp- node modules
var $ = require('gulp-load-plugins')();
var pkg = require('./package.json');

// Load tasks
var watchifyJSApps = require('./tasks/watchify');
//var watchifyJSWorkers = require('./tasks/watchify-workers');
var minifyJSApps = require('./tasks/minify');

gulp.task('watchify-js-apps', watchifyJSApps);
//gulp.task('watchify-js-workers', watchifyJSWorkers);
gulp.task('minify-js-apps', minifyJSApps);

// watch for changes to build apps using gulp-watch so we can pick up changes
// for any new files.
// watchify-js-apps takes care of watching for src changes
gulp.task('watch-js-apps', function (done) {
    $.watch(pkg.jstest.js.buildDir + '**/*_app.js', function () {
        gulp.start('minify-js-apps', done);
    });
});

gulp.task('default', [
  'server',
  'watchify-js-apps',
  //'watchify-js-workers',
  'watch-js-apps'
]);

gulp.task('server', function (cb) {
  var started = false;

    $.nodemon({
        script: 'index.js',
        watch: ['index.js'],
        //ext: 'js html jade'
    }).on('start', function () {
      if (!started) {
        cb();

        started = true;
      }
    });
});
