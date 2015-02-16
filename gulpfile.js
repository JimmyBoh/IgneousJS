var gulp = require('gulp');
var del = require('del');
var wrap = require('gulp-wrap');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglifyjs');
var jasmine = require('gulp-jasmine');

var config = {
  appName: require('./package.json').name,
  dist: './dist',
  test: './spec',
  src: './src',
  tmp: './tmp'
};

gulp.task('clean', function (cb) {
  del([
    config.dist + '/**'
  ], cb);
});

gulp.task('build', ['clean'], function () {
  return gulp.src(
    [
      config.src + '/enum.js',
      config.src + '/class.js'
    ])
    .pipe(concat(config.appName + '.js'))
    .pipe(wrap({src: config.src + '/wrap-template.js'}))
    .pipe(gulp.dest(config.dist));
});

gulp.task('build:min', ['build'], function () {
  return gulp.src(config.dist + '/' + config.appName + '.js')
    .pipe(rename(config.appName + '.min.js'))
    .pipe(uglify({
      outSourceMap: true
    }))
    .pipe(gulp.dest(config.dist));
});

gulp.task('test', ['build'], function () {
  return gulp.src([
    config.test + '/**/*[sS]pec.js'
  ])
    .pipe(jasmine());
});

gulp.task('watch-test', function () {
  gulp.watch([+config.src + '/**', config.test + '/**'], ['test']);
});