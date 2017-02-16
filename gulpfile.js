const gulp = require('gulp');
const jshint = require('gulp-jshint');
const jasmine = require('gulp-jasmine-phantom');
const connect = require('gulp-connect');
const clean = require('gulp-clean');
const uglify = require('gulp-uglify');
const gzip = require('gulp-gzip');
const rename = require('gulp-rename');
const runSequence = require('run-sequence');

/**

  Define global tasks
  
*/

gulp.task('jshint', function() {
  return gulp.src('lib/vanilla-masker.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('jasmine', function () {
  return gulp.src(['lib/**/*.js', 'tests/**/*.js'])
    .pipe(jasmine({integration: true}));
});

gulp.task('clean:dev', function() {
  return gulp.src('public/vanilla-masker*', {read: false})
    .pipe(clean());
});

gulp.task('clean:build', function() {
  return gulp.src('build/vanilla-masker*', {read: false})
    .pipe(clean());
});

gulp.task('concat:dev', ['clean:dev'], function() {
  return gulp.src('lib/vanilla-masker.js')
    .pipe(gulp.dest('public'));
});

gulp.task('concat:build', ['clean:build'], function() {
  return gulp.src('lib/vanilla-masker.js')
    .pipe(rename('vanilla-masker.min.js'))
    .pipe(gulp.dest('build'));
});

gulp.task('uglify', function() {
  return gulp.src('build/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('build'));
});

gulp.task('compress', function() {
  return gulp.src('build/*.js')
    .pipe(gzip())
    .pipe(gulp.dest('build'));
});

gulp.task('connect:server', function() {
  return connect.server({root: 'public', port: 4500, livereload: true});
});

gulp.task('connect:reload', function() {
  return gulp.src('public')
    .pipe(connect.reload());
});

gulp.task('watch', function() {
  return gulp.watch(['lib/*', 'tests/*', 'gulpfile.js', 'package.json'], ['reload']);
});

/**

  Define workflow tasks

*/

gulp.task('dev', function(callback) {
  return runSequence(['jshint', 'jasmine'], 'concat:dev', 'connect:server', 'watch', callback);
});

gulp.task('build', function(callback) {
  return runSequence(['jshint', 'jasmine'], 'concat:build', 'uglify', 'compress', callback);
});

gulp.task('reload', function(callback) {
  return runSequence(['jshint', 'jasmine'], 'concat:dev', 'connect:reload', callback);
});

gulp.task('default', function(callback) {
  return runSequence(['jshint', 'jasmine'], callback);
});

gulp.task('test', function(callback) {
  return runSequence(['jshint', 'jasmine'], callback);
});
