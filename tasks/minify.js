'use strict';

var gulp = require('gulp');
// Load all gulp- node modules
var $ = require('gulp-load-plugins')();
var pkg = require('../package.json');

var DEST = pkg.jstest.js.buildDir;

module.exports = function () {
    return gulp
        .src(DEST + '**/*_app.js')
        .pipe($.rename({
            suffix: '.min'
        }))
        .pipe($.uglify())
        .pipe(gulp.dest(DEST));
};
