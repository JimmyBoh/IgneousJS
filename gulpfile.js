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
  tmp: './tmp',
  runBrowserTestsWithNodeVersion: 0.10
};

gulp.task('clean', function (cb) {
  del([
    config.tmp + '/**',
    config.dist + '/**'
  ], cb);
});

gulp.task('build', function () {
  return gulp.src(
    [
      config.src + '/enum.js',
      config.src + '/class.js'
    ])
    .pipe(concat(config.appName + '.js'))
    .pipe(wrap({src: config.src + '/wrap-template.js'}))
    .pipe(gulp.dest(config.dist))
    .pipe(uglify(config.appName + '.min.js', {
      outSourceMap: true,
      basePath: config.dist,
      output: {
        source_map: {
          root: '/'
        }
      }
    }))
    .pipe(gulp.dest(config.dist));
});

gulp.task('test:node', ['build'], function () {
  return gulp.src([
    config.test + '/**/*[sS]pec.js'
  ])
    .pipe(jasmine({
      verbose: true,
      includeStackTrace: true
    }));
});

gulp.task('test:browser', ['build'], function (done) {
  karma.start({
    configFile: path.join(__dirname, config.test + '/karma.conf.js'),
    singleRun: true
  }, done);
});

gulp.task('test:sauce', ['build'], function (done) {
  karma.start({
    configFile: path.join(__dirname, config.test + '/karma.conf-ci.js'),
    singleRun: true
  }, done);
});

gulp.task('test', ['build', 'test:node', 'test:browser']);

// Only run the browser tests on Node v0.10
//   (This speeds up the Travis builds, node 
//    version doesn't change browser test results)
var ciTests = ['build', 'test:node'];
if(new Number(process.version.match(/^v(\d+\.\d+)/)[1]) == config.runBrowerTestsWithNodeVersion){
  ciTests.push('test:sauce');
}
gulp.task('test:ci', ciTests);

gulp.task('watch-test', function () {
  gulp.watch([config.src + '/**', config.test + '/**'], ['test:node']);
});

gulp.task('default', ['watch-test']);