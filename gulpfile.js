'use strict';

// requirements
var gulp        = require('gulp');
var gutil       = require('gulp-util');
var source      = require('vinyl-source-stream');
var babelify    = require('babelify');
var watchify    = require('watchify');
var exorcist    = require('exorcist');
var browserify  = require('browserify');
var browserSync = require('browser-sync').create();
var exec = require('child_process').exec;
    

// Input file.
watchify.args.debug = true;
var bundler = watchify(browserify('./app/static/js/main.js', watchify.args));

// Babel transform
bundler.transform(babelify.configure({
    sourceMapRelative: 'app/static/js'
}));

// On updates recompile
bundler.on('update', bundle);

function bundle() {

    gutil.log('Compiling JS...');

    return bundler.bundle()
        .on('error', function (err) {
            gutil.log(err.message);
            browserSync.notify("Browserify Error!");
            this.emit("end");
        })
        .pipe(exorcist('app/static/js/dist/bundle.js.map'))
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./app/static/js/dist'))
      
}

/**
 * Gulp task alias
 */


gulp.task('bundle', function () {
    return bundle();
});

/**
 * First bundle, then serve from the ./app directory
 */
gulp.task('default', ['bundle'], function () {
    gutil.log('compiled JSX to bundle.js');
});