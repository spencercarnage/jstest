'use strict';

var fs = require('fs');
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserify = require('browserify');
var watchify = require('watchify');
var through = require('through2');
var babelify = require('babelify');
var path = require('path');
var jsxify = require('jsx-transform').browserifyTransform;
var pkg = require('../package.json');

var defaults = Object.assign({}, {debug: true}, watchify.args);

module.exports = function () {
    var bundler = through.obj(function (file, enc, next) {
        var b = browserify(file.path, defaults);

        b.plugin(watchify);
        b.transform('babelify', {presets: ['es2015']});
        b.transform(jsxify, {
            factory: 'require("virtual-dom/h")'
        });

        b.on('update', function () {
            $.util.log('Bundled', $.util.colors.magenta(file.path));

            b.bundle(function (err, res) {
                file.contents = res;
            })
            .pipe(fs.createWriteStream(file.path));
        });

        // We have do an initial bundle of all files or else subsequent watches
        // won't work
        b.bundle(function (err, res) {
            if (err) {
                $.util.log($.util.colors.red(err.message));
                this.emit('end');
                return;
            }

            file.contents = res;
            next(null, file);
        });

        b.on('log', $.util.log);

        b.on('error', function (err) {
            $.util.log($.util.colors.red(err.message));
            this.emit('end');
        });
    });

    return gulp
        .src('./static/js/workers/**/**-worker.js')
        .pipe(bundler)
        .pipe(gulp.dest(pkg.jstest.js.workerBuildDir));
}
