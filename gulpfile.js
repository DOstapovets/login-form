'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    gulpIf = require('gulp-if'),
    browserSync = require('browser-sync').create(),
    useref = require('gulp-useref');

gulp.task('sass', function() {
    return gulp.src('app/scss/**/*.+(scss|sass)')
        .pipe(sass())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('useref', function() {
    return gulp.src('app/*.html')
        .pipe(gulpIf("*.js"), useref())
        .pipe(gulp.dest('dist'))
});

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'app'
        },
    });
});

gulp.task('default', ['browserSync', 'sass'], function() {
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
    gulp.watch('app/scss/**/*.+(scss|sass)', ['sass']);
});