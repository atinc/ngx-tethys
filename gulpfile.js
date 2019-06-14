'use strict';

const gulp = require('gulp');
const gulpSass = require('gulp-sass');
const gulpCleanCSS = require('gulp-clean-css');
const gulpRename = require('gulp-rename');
const path = require('path');

const _distDemoPath = 'demo/src/assets/css';
const scssOptions = {
    includePaths: [`${__dirname}/node_modules`],
    importer: function(url, prev, done) {
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
    }
};

const buildTheme = function() {
    let _themePath = './src/styles/themes/*.scss';
    return gulp
        .src(_themePath)
        .pipe(gulpSass.sync(scssOptions).on('error', gulpSass.logError))
        .pipe(gulpCleanCSS())
        .pipe(
            gulpRename(function(path) {
                path.basename += '.min';
                return path;
            })
        )
        .pipe(gulp.dest(_distDemoPath));
};

gulp.task('build-theme', buildTheme);

gulp.task('build-theme:watch', function() {
    var watches = ['src/**/styles/*.scss', 'src/styles/**/**.*'];
    gulp.watch(watches, buildTheme);
});
