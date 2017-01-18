/**
 * Clean
 *
 * Tasks for cleaning defined project paths
 */

// Project Configuration
var config	= require('../config.js');

// Dependencies
var del	= require('del');
var gulp = require('gulp');
var gutil = require('gulp-util');
var vinylPaths = require('vinyl-paths');

// Clean: Assets
gulp.task('clean:assets', function() {

	var ignores = ['**/!(*css|*js|themes|shared)/', '!**/(themes|shared)/*'];

	var logFile = function(paths) {
  		gutil.log(paths);
		return Promise.resolve();
	};


	var deleteAsync = function(path){
		del.sync(path, {force:true});
		return Promise.resolve();
	}

	gulp.src(ignores, {cwd:config.BUILD_ASSETS_PATH})
	.pipe(vinylPaths(logFile))
	.pipe(vinylPaths(deleteAsync));

	gulp.src(ignores, {cwd:config.DIST_ASSETS_PATH})
	.pipe(vinylPaths(logFile))
	.pipe(vinylPaths(deleteAsync));

});

// Clean: HTML
gulp.task('clean:html', function() {
	del.sync(config.BUILD_BASE_PATH + '*.html');
});

// Clean: Temp
gulp.task('clean:temp', function() {
	del.sync(config.BUILD_TEMP_PATH);
});
