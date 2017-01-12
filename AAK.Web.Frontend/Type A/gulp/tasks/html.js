/**
 * HTML (Assemble)
 *
 * Task for generating HTML with Assemble (a build system for web projects)
 *
 * @see {@link https://www.npmjs.com/package/assemble|Assemble}
 * @see {@link http://assemble.io|Assemble}
 */

// Project Configuration
var config		= require('../config.js');

// Dependencies
var assemble	= require('assemble');
var extname		= require('gulp-extname');
var gulp		= require('gulp');
var helpers		= require('handlebars-helpers')();
var merge		= require('merge');

gulp.task('html', ['clean:html'], function() {

	var app = assemble();

	app.data(config.SOURCE_DATA_PATH + '*.json');

	app.layouts(config.SOURCE_TEMPLATES_PATH + 'layouts/*.hbs');
	app.pages(config.SOURCE_TEMPLATES_PATH + 'pages/*.hbs');
	app.partials(config.SOURCE_TEMPLATES_PATH + 'partials/**/*.hbs');
	app.option('layout', 'default');
	app.option('context', function(view, locals) {

		var theme = !!this.data ? this.data.get('global.themes.' + this.data.get('global.currentTheme')) : undefined;

		return !!this.data ? merge(true, {'page' : this.cache.data[view.relative.split('.hbs').join('')]}, this.cache.data, {theme: theme}) : locals;
	});

	return app.toStream('pages')
		.pipe(app.renderFile())
		.pipe(extname())
		.pipe(app.dest(config.BUILD_BASE_PATH));
});
