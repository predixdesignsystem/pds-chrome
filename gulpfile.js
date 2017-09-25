const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const watchify = require("watchify");
const tsify = require('tsify');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const util = require('gulp-util');

const browserifyConfig = {
  basedir: '.',
  debug: true,
  entries: ['src/scripts/apphub.ts'],
  cache: {},
  packageCache: {}
};

function runBrowserify() {
  return browserify(browserifyConfig)
    .plugin(tsify)
    .transform('babelify', {
      presets: ['es2015'],
      extensions: ['ts']
    });
};

function bundle() {
  return runBrowserify()
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist'));
};

function bundleWatch(watch) {
  return watch
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist'));
};

gulp.task('serve', function(cb) {
  const watchBrowserify = watchify(runBrowserify());
  bundleWatch(watchBrowserify);
  watchBrowserify.on('update', bundleWatch.bind(null, watchBrowserify));
  watchBrowserify.on('log', util.log);
});

gulp.task('default', [], bundle);
