/**
 * @license
 * Copyright (c) 2018, General Electric
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const gulp = require('gulp');
const del = require('del');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');
const importOnce = require('node-sass-import-once');
const execSync = require('child_process').execSync;
const replace = require('gulp-replace');
const gulpSequence = require('gulp-sequence');
const { ensureLicense } = require('ensure-px-license');

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
  return gulp.src(['./scss/*.scss'])
    .pipe(sass(sassOptions))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(cssmin())
    .pipe(ensureLicense())
    .pipe(gulp.dest('./css'))
});

gulp.task('sass', ['sass:clean', 'sass:build']);

/**
 * TASK: LICENSE
 * Automatically adds Apache-2.0 license header to all files.
 */

gulp.task('license', function() {
  return gulp.src(['./**/*.{html,js,css,scss}', '!**/node_modules/**/*', '!**/bower_components?(-1.x)/**/*'])
    .pipe(ensureLicense())
    .pipe(gulp.dest('.'));
});

/**
 * TASK: BUILD
 * Run polymer build to create es5 and es6 bundles, do some path rewrites
 * so the client loads resources from the right place.
 */

gulp.task('build:polymer', function(cb) {
  execSync('./node_modules/.bin/polymer build', {stdio: [0,1,2]});
  cb();
});

gulp.task('build:fixpaths', function() {
  return gulp.src('./build/*/views/*.handlebars', {base: './'})
    .pipe(replace(
      /\/(ui-hub-assets\/bower_components\/pds-chrome)\/(scripts|elements|css|bower_components)\//g,
      function(match, $1, $2) {
        const buildDir = /pds-chrome\/build\/([\w-]+)\/views/.exec(this.file.path)[1];
        return `/${$1}/build/${buildDir}/${$2}/`;
      }
    ))
    .pipe(gulp.dest('./'));
});

gulp.task('build', function(cb) {
  gulpSequence('build:polymer', 'build:fixpaths', 'license')(cb);
});

/**
 * TASK: WATCH
 * Watch files and rebuild on save. Useful for development.
 */

gulp.task('watch', ['sass'], function(cb) {
  gulp.watch(['./scss/*.scss'], ['sass']);
});

/**
 * TASK: DEFAULT
 * Build SCSS and run Polymer build tasks.
 */

gulp.task('default', function(cb) {
  gulpSequence('sass', 'build', 'license')(cb);
});
