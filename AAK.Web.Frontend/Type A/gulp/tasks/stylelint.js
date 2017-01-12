/**
 * Stylelint
 *
 * Gulp plugin for running Stylelint results through various reporters
 *
 * @see {@link https://www.npmjs.com/package/gulp-stylelint|gulp-stylelint}
 * @see {@link http://stylelint.io|Stylelint}
 */

// Project Configuration
var config		= require('../config.js');

// Dependencies
var gulp		= require('gulp');
var stylelint	= require('gulp-stylelint');

gulp.task('stylelint', function() {

	var options = {
		configFile: 'stylelint.config.js',
		reporters: [
			{
				console: true,
				formatter: 'string'
			}
		]
	};

	return gulp.src(config.SOURCE_STYLES_PATH + '**/*')
		.pipe(stylelint(options));
});
