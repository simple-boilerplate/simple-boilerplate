/**
 * Watch
 *
 * Utilities for watching file trees
 * @see {@link https://github.com/mikeal/watch|Watch}
 */

// Project Configuration
var config	= require('../config.js');

// Dependencies
var gulp	= require('gulp');
var gutil	= require('gulp-util');

gulp.task('watch', ['browser-sync'], function() {

	// Assets
	gulp.watch('**/*', {cwd: config.SOURCE_ASSETS_PATH}, ['copy:assets']);

	// Data
	gulp.watch('**/*', {cwd: config.SOURCE_DATA_PATH}, ['html']);

	// Icons
	gulp.watch('**/*', {cwd: config.SOURCE_ICONS_PATH}, ['icons']);

	// Scripts
	//gulp.watch('**/*', {cwd: config.SOURCE_SCRIPT_PATH}, ['scripts']);

	// Styles
	gulp.watch('**/*', {cwd: config.SOURCE_STYLES_PATH}, ['styles']);

	// Temp
	gulp.watch('**/*', {cwd: config.SOURCE_TEMP_PATH}, ['copy:temp']);

	// Templates
	gulp.watch('**/*', {cwd: config.SOURCE_TEMPLATES_PATH}, ['html']);

	gutil.log(gutil.colors.bgGreen('Watching for changes...'));
});
