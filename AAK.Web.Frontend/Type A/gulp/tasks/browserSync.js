/**
 * Browser Sync
 *
 * Keep multiple browsers & devices in sync when building websites
 * @see {@link https://www.npmjs.com/package/browser-sync|Browsersync}
 */

// Project Configuration
var config		= require('../config.js');

// Dependencies
var browserSync	= require('browser-sync');
var gulp		= require('gulp');

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: config.BUILD_BASE_PATH
		},
		port: process.env.PORT || config.BROWSER_SYNC_PORT_NUMBER
	});
});
