/**
 * ESLint
 *
 * A gulp plugin for processing files with ESLint
 * The pluggable linting utility for JavaScript and JSX
 *
 * @see {@link https://www.npmjs.com/package/gulp-stylelint|gulp-stylelint}
 * @see {@link http://eslint.org|ESLint}
 */

// Project Configuration
var config		= require('../config.js');

// Dependencies
var gulp		= require('gulp');
var eslint		= require('gulp-eslint');

gulp.task('eslint', function() {

	var options = {
		configFile: '.eslintrc.json'
	};

	return gulp.src(config.SOURCE_SCRIPTS_PATH + '**/*')
		.pipe(eslint(options));
});
