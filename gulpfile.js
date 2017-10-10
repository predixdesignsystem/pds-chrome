// const gulp = require('gulp');
// const browserify = require('browserify');
// const source = require('vinyl-source-stream');
// const watchify = require("watchify");
// const tsify = require('tsify');
// const buffer = require('vinyl-buffer');
// const sourcemaps = require('gulp-sourcemaps');
// const uglify = require('gulp-uglify');
// const util = require('gulp-util');

// const browserifyConfig = {
//   basedir: '.',
//   debug: true,
//   entries: ['src/scripts/apphub.ts'],
//   cache: {},
//   packageCache: {}
// };
//
// function runBrowserify() {
//   return browserify(browserifyConfig)
//     .plugin(tsify)
//     .transform('babelify', {
//       presets: ['es2015'],
//       extensions: ['ts']
//     });
// };
//
// function bundle() {
//   return runBrowserify()
//     .bundle()
//     .pipe(source('bundle.js'))
//     .pipe(buffer())
//     .pipe(sourcemaps.init({loadMaps: true}))
//     .pipe(uglify())
//     .pipe(sourcemaps.write('./'))
//     .pipe(gulp.dest('dist'));
// };
//
// function bundleWatch(watch) {
//   return watch
//     .bundle()
//     .pipe(source('bundle.js'))
//     .pipe(buffer())
//     .pipe(sourcemaps.init({loadMaps: true}))
//     .pipe(uglify())
//     .pipe(sourcemaps.write('./'))
//     .pipe(gulp.dest('dist'));
// };
//
// gulp.task('serve', function(cb) {
//   const watchBrowserify = watchify(runBrowserify());
//   bundleWatch(watchBrowserify);
//   watchBrowserify.on('update', bundleWatch.bind(null, watchBrowserify));
//   watchBrowserify.on('log', util.log);
// });
//
// gulp.task('default', [], bundle);

'use strict';

const gulp = require('gulp');
const del = require('del');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');
const importOnce = require('node-sass-import-once');
const umd = require('umd');

/**
 * TASK: SASS
 * Build chrome SCSS files into CSS
 */

const sassOptions = {
  importer: importOnce,
  importOnce: {
    index: true,
    bower: true
  }
};

const autoprefixerOptions = {
  browsers: ['last 2 versions'],
  cascade: false,
  flexbox: false
};

gulp.task('sass:clean', function() {
  return del(['./css/**/*']);
});

gulp.task('sass:build', function() {
  return gulp.src(['./src/scss/*.scss'])
    .pipe(sass(sassOptions))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(cssmin())
    .pipe(gulp.dest('./css'))
});

gulp.task('sass', ['sass:clean', 'sass:build']);

/**
 * TASK: JS
 * Builds chrome JavaScript files into UMD modules.
 */

gulp.task('js:clean', function() {
  return del(['./dist/scripts/**/*']);
});

gulp.task('js:build', function() {
  return gulp.src(['./src/scripts/service.js'])
    .pipe(umd({
      templateName: 'returnExportsGlobal',
      namespace: function(file) {
        return 'AppHub.Service';
      }
    }))
    .pipe(gulp.dest('./dist/scripts'))
});

gulp.task('js', ['js:clean', 'js:build']);

/**
 * TASK: WATCH
 * Watch files and rebuild on save. Useful for development.
 */

gulp.task('watch', ['sass'], function(cb) {
  gulp.watch(['./src/scss/*.scss'], ['sass']);
});
