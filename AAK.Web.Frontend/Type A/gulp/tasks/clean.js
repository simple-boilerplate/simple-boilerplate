/**
 * Clean
 *
 * Tasks for cleaning defined project paths
 */

// Project Configuration
var config	= require('../config.js');

// Dependencies
var del	= require('del');
var es = require('event-stream');
var gulp = require('gulp');
var gutil = require('gulp-util');
var vinylPaths = require('vinyl-paths');

// Clean: Assets
gulp.task('clean:assets', function() {

	var logFile = function(es) {
  		return es.map(function(file, cb) {
    		gutil.log(file.path);
    		return cb();
  		});
	};

	gulp.src(['**/!(*css|*js|themes|shared)/', '!**/(themes|shared)/*'],{cwd:config.BUILD_ASSETS_PATH})
	// .pipe(logFile(es))
	.pipe(vinylPaths(del));

	gulp.src(['**/!(*css|*js|themes|shared)/', '!**/(themes|shared)/*'],{cwd:config.DIST_ASSETS_PATH})
	// .pipe(logFile(es))
	.pipe(vinylPaths(del));

});

// Clean: HTML
gulp.task('clean:html', function() {
	del.sync(config.BUILD_BASE_PATH + '*.html');
});

// Clean: Temp
gulp.task('clean:temp', function() {
	del.sync(config.BUILD_TEMP_PATH);
});
