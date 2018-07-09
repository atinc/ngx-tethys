'use strict';

const gulp = require('gulp');
const gulpSass = require('gulp-sass');
const gulpCleanCSS = require('gulp-clean-css');
const path = require('path');

const _distDemoPath = 'demo/src/assets/css';
const _distBuiltPath = 'built/styles';
const scssOptions = {
    includePaths: [`${__dirname}/node_modules`],
    importer: function (url, prev, done) {
        // url is the path in import as is, which LibSass encountered.
        // prev is the previously resolved path.
        // done is an optional callback, either consume it or return value synchronously.
        // this.options contains this options hash, this.callback contains the node-style callback

        if (url.includes('~')) {
            const file = path.join(__dirname, 'node_modules/') + url.slice(1);
            return {
                file: file
            };
        } else {
            return {
                file: url
            };
        }
    },
};

gulp.task('built-theme', function () {
    let _themePath = './src/styles/themes/*.scss';
    return gulp.src(_themePath)
        .pipe(gulpSass.sync(scssOptions).on('error', gulpSass.logError))
        .pipe(gulpCleanCSS())
        .pipe(gulp.dest(_distDemoPath));
});
