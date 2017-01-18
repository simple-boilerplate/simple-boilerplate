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

	//del(config.BUILD_ASSETS_PATH + '**/!(themes|css)');
	//del([config.BUILD_ASSETS_PATH + '**/*', '!' + config.BUILD_ASSETS_PATH + 'themes/*/css']);
	//del(['**/*', '!**/themes/*/css'], {cwd: config.BUILD_ASSETS_PATH});

	// Temp task errors without sync?
	var ignore = [
		'shared',
		'shared/js',
		'shared/js/*.js',
		'themes',
		'themes/*',
		'themes/*/css',
		'themes/*/css/*.css'
	];

	// Build (Web.Frontend)
	del.sync('**/*', {
		cwd: config.BUILD_ASSETS_PATH,
		ignore: ignore
	});

	// Distribution (Web)
	del.sync('**/*', {
		cwd: config.DIST_ASSETS_PATH,
		ignore: ignore
	});
});

// Clean: HTML
gulp.task('clean:html', function() {
	del.sync(config.BUILD_BASE_PATH + '*.html');
});

// Clean: Temp
gulp.task('clean:temp', function() {
	del.sync(config.BUILD_TEMP_PATH);
});
