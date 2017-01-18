// Dependencies
var gulp		= require('gulp');
var requireDir	= require('require-dir');

requireDir('gulp', {
	recurse: true
});

/**
 * Default Task
 *
 * Used for building/developing front-end (HTML, CSS)
 */
gulp.task('default', [
	'copy:assets',
	'copy:temp',
	'styles',
	'icons',
	'html',
	'scripts',
	'watch'
]);
