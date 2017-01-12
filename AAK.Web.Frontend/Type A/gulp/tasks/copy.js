/**
 * Copy
 *
 * Tasks for copying defined project paths and files
 */

// Project Configuration
var config	= require('../config.js');

// Dependencies
var gulp	= require('gulp');

// Copy: Assets (Fonts, Images)
gulp.task('copy:assets', ['clean:assets'], function() {

	return gulp.src(config.SOURCE_ASSETS_PATH + '**/*', {base: config.SOURCE_BASE_PATH})
		.pipe(gulp.dest(config.BUILD_BASE_PATH));
});

// Copy: Temp (Fonts, Images)
gulp.task('copy:temp', ['clean:temp'], function() {

	return gulp.src(config.SOURCE_TEMP_PATH + '**/*', {base: config.SOURCE_BASE_PATH})
		.pipe(gulp.dest(config.BUILD_BASE_PATH));
});
