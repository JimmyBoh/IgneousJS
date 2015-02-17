var gulp = require('gulp');
var del = require('del');
var wrap = require('gulp-wrap');
var concat = require('gulp-concat');
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

function uglifyWithSourceMaps(destPath){
  return gulp.src(
    [
      config.src + '/enum.js',
      config.src + '/class.js'
    ])
    .pipe(concat(config.appName + '.js'))
    .pipe(wrap({src: config.src + '/wrap-template.js'}))
    .pipe(gulp.dest(destPath))
    .pipe(uglify(config.appName + '.min.js', {
      outSourceMap: true,
      basePath: destPath,
      output: {
        source_map: {
          root: '/'
        }
      }
    }))
    .pipe(gulp.dest(destPath));
}

gulp.task('build:tmp', ['clean'], function () {
  return uglifyWithSourceMaps(config.tmp);
});

gulp.task('build', ['clean', 'build:tmp'], function () {
  return uglifyWithSourceMaps(config.dist);
});

gulp.task('test:node', ['build:tmp'], function () {
  return gulp.src([
    config.test + '/**/*[sS]pec.js'
  ])
    .pipe(jasmine({
      verbose: true,
      includeStackTrace: true
    }));
});

gulp.task('test:browser', ['build:tmp'], function (done) {
  karma.start({
    configFile: path.join(__dirname, config.test + '/karma.conf.js'),
    singleRun: true
  }, done);
});

gulp.task('test:sauce', ['build:tmp'], function (done) {
  karma.start({
    configFile: path.join(__dirname, config.test + '/karma.conf-ci.js'),
    singleRun: true
  }, done);
});

gulp.task('test', ['build:tmp','test:node', 'test:browser']);
gulp.task('test:ci', ['build:tmp', 'test:node', 'test:sauce']);

gulp.task('watch-test', function () {
  gulp.watch([config.src + '/**', config.test + '/**'], ['test']);
});

gulp.task('default', ['watch-test']);