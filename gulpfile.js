var gulp = require('gulp');
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');

gulp.task('default', ['jshint', 'mocha', 'watch-mocha'], function() { });

gulp.task('mocha', function() {
    return gulp.src(['test/*-specs.js'], { read: false })
        .pipe(mocha({ reporter: 'list' }))
        .on('error', console.log);
});

gulp.task('watch-mocha', function() {
    gulp.watch(['lib/**', 'test/**'], ['mocha']);
});

gulp.task('jshint', function() {
   return gulp.src(['lib/**'])
       .pipe(jshint())
       .pipe(jshint.reporter('default'));
});