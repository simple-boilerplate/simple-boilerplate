/**
 * Clean
 *
 * Tasks for cleaning defined project paths
 */

// Project Configuration
var config	= require('../config.js');

// Dependencies
var del		= require('del');
var gulp	= require('gulp');

// Clean: Assets
gulp.task('clean:assets', function() {
	del.sync([
		config.BUILD_ASSETS_PATH + '**/*',
		'!' + config.BUILD_ASSETS_PATH + 'themes',
		'!' + config.BUILD_THEMES_PATH + '*',
		'!' + config.BUILD_THEMES_PATH + '*/css',
		'!' + config.BUILD_THEMES_PATH + '*/css/*.css',
	]);
});

// Clean: HTML
gulp.task('clean:html', function() {
	del.sync([
		config.BUILD_BASE_PATH + '*.html',
	]);
});

// Clean: Temp
gulp.task('clean:temp', function() {
	del.sync([
		config.BUILD_TEMP_PATH + '**/*'
	]);
});
