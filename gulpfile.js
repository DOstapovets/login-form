'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    del = require('del'),
    gulpIf = require('gulp-if'),
    uglify = require('gulp-uglify'),
    csso = require('gulp-csso'),
    cache = require('gulp-cache'),
    runSequence = require('run-sequence'),
    imagemin = require('gulp-imagemin'),
    browserSync = require('browser-sync').create(),
    useref = require('gulp-useref'),
    gzip = require('gulp-gzip');

gulp.task('default', ['browserSync', 'sass'], function() {
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
    gulp.watch('app/scss/**/*.+(scss|sass)', ['sass']);
});


gulp.task('sass', function() {
    return gulp.src('app/scss/**/*.+(scss|sass)')
        .pipe(sass())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('fonts', function() {
    return gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('images', function() {
    return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
        .pipe(cache(imagemin({
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'))
});

gulp.task('useref', function() {
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulpIf('*.css', csso({
            restructure: false,
            sourceMap: true,
            debug: true
        })))
        .pipe(gulp.dest('dist'));
});

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'app'
        },
    });
});
gulp.task('clean:dist', function() {
    return del.sync('dist');
})

gulp.task('build', function() {
    runSequence('clean:dist', ['sass', 'images', 'fonts'], 'useref',
        () => { console.log("Build Succses!"); }
    )
});