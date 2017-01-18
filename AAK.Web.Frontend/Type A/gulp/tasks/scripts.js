/**
 * Scripts (Browserify)
 *
 * Task for preprocessing CSS with Sass & PostCSS
 *
 * @see {@link https://www.npmjs.com/package/browserify|browserify}
 * @see {@link https://github.com/substack/node-browserify|browserify}
 */

// Project Configuration
var config		= require('../config.js');

// Dependencies
var browserify	= require('browserify');
var buffer		= require('gulp-buffer');
var gulp		= require('gulp');
var gutil		= require('gulp-util');
var remapify	= require('remapify');
var tap			= require('gulp-tap');
var uglify		= require('gulp-uglify');

gulp.task('scripts', ['eslint'], function() {
	var props = {
		debug: true,//!production,
		//cache: {},
		//packageCache: {},
		 plugin: [
			['remapify', {
					cwd: config.SOURCE_SCRIPTS_PATH + 'shared',
					src: '**/*.js',
					expose: 'core'
				}
			]
		]
	};
	return gulp.src(config.SOURCE_SCRIPTS_PATH + '*.js', {read: false})
		.pipe(tap(function (file) {
			gutil.log('bundling ' + file.path);
      		file.contents = browserify(file.path, props).bundle().on('error', function (err) {
        		if (err instanceof SyntaxError) {
          			gutil.log(gutil.colors.red('Syntax Error'), err.message);
          			gutil.log(err.codeFrame);
        		} else {
          			gutil.log(gutil.colors.red('Error'), err.message);
        		}
        		this.emit('end');
			});
		}))
		.pipe(buffer())
		.pipe(uglify())
		.pipe(gulp.dest(config.DIST_SCRIPTS_PATH));
});
