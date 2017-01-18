/**
 * Styles (Sass)
 *
 * Task for preprocessing CSS with Sass & PostCSS
 *
 * @see {@link https://www.npmjs.com/package/gulp-sass|gulp-sass}
 * @see {@link https://sass-lang.com|Sass}
 */

// Project Configuration
var config			= require('../config.js');

// Dependencies
var autoprefixer	= require('autoprefixer');
var gulp			= require('gulp');
var mqpacker		= require('css-mqpacker');
var postcss			= require('gulp-postcss');
var rename			= require('gulp-rename');
var sass			= require('gulp-sass');
var scss			= require('postcss-scss');

gulp.task('styles', ['stylelint'], function() {

	// Sass options
	var options = {
		includePaths: [config.SOURCE_STYLES_PATH + 'core'],
		outputStyle: 'compressed'
	};

	// PostCSS plugins
	var processors = [
		autoprefixer({
			browsers: ['last 2 versions']
		}),
		mqpacker()
	];

	return gulp.src(config.SOURCE_STYLES_PATH + 'themes/**/*' + config.SOURCE_STYLES_TYPE)

		// Sass compilation
		.pipe(sass(options).on('error', sass.logError))

		// PostCSS processing after Sass compilation
		.pipe(postcss(processors, {syntax: scss}))

		// Generate separate directories for each theme
		.pipe(rename(function(path){
			path.dirname = path.dirname + '/css/';
		}))

		// Generate CSS file(s)
		.pipe(gulp.dest(config.BUILD_THEMES_PATH))
		.pipe(gulp.dest(config.DIST_THEMES_PATH));
});
