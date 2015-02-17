var gulp = require('gulp');
var del = require('del');
var wrap = require('gulp-wrap');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglifyjs');
var karma = require('karma').server;
var jasmine = require('gulp-jasmine');

var path = require('path');

var config = {
  appName: 'igneous',
  dist: './dist',
  test: './spec',
  src: './src',
  tmp: './tmp'
};

gulp.task('clean', function (cb) {
  del([
    config.tmp + '/**',
    config.dist + '/**'
  ], cb);
});

gulp.task('build:test', ['clean'], function () {
  return gulp.src(
    [
      config.src + '/enum.js',
      config.src + '/class.js'
    ])
    .pipe(concat(config.appName + '.js'))
    .pipe(wrap({src: config.src + '/wrap-template.js'}))
    .pipe(rename(config.appName + '.min.js'))
    .pipe(uglify({
      outSourceMap: true
    }))
    .pipe(gulp.dest(config.tmp));
});

gulp.task('build', ['clean'], function () {
  return gulp.src(
    [
      config.src + '/enum.js',
      config.src + '/class.js'
    ])
    .pipe(concat(config.appName + '.js'))
    .pipe(wrap({src: config.src + '/wrap-template.js'}))
    .pipe(gulp.dest(config.dist))
    .pipe(rename(config.appName + '.min.js'))
    .pipe(uglify({
      outSourceMap: true
    }))
    .pipe(gulp.dest(config.dist));
});

gulp.task('test:node', ['build:test'], function () {
  return gulp.src([
    config.test + '/**/*[sS]pec.js'
  ])
    .pipe(jasmine({
      verbose: true,
      includeStackTrace: true
    }));
});

gulp.task('test:browser', ['build:test'], function (done) {
  karma.start({
    configFile: path.join(__dirname, config.test + '/karma.conf.js'),
    singleRun: true
  }, done);
});

gulp.task('test:sauce', ['build:test'], function (done) {
  karma.start({
    configFile: path.join(__dirname, config.test + '/karma.conf-ci.js'),
    singleRun: true
  }, done);
});

gulp.task('test', ['build:test','test:node', 'test:browser']);
gulp.task('test:ci', ['build:test', 'test:node', 'test:sauce']);

gulp.task('watch-test', function () {
  gulp.watch([config.src + '/**', config.test + '/**'], ['test']);
});

gulp.task('default', ['watch-test']);