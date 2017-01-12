/**
 * Icons (Gulp SVG Sprite)
 *
 * SVG sprites & stacks galore — Gulp plugin wrapping around svg-sprite that
 * reads in a bunch of SVG files, optimizes them and creates SVG sprites and CSS
 * resources in various flavours
 *
 * @see {@link https://www.npmjs.com/package/gulp-svg-sprite|gulp-svg-sprite}
 * @see {@link https://github.com/jkphl/svg-sprite|svg-sprite}
 */

// Project Configuration
var config		= require('../config.js');

// Dependencies
var gulp		= require('gulp');
var svgSprite	= require('gulp-svg-sprite');

gulp.task('icons', function() {

	var options = {
		mode: {
			inline: true,
			symbol: {
				dest: '',
				sprite: 'icons.hbs'
			}
		},
		shape: {
			id: {
				generator: 'icon-%s'
			}
		},
		svg: {
			doctypeDeclaration: false,
			xmlDeclaration: false
		}
	};

	return gulp.src(config.SOURCE_ICONS_PATH + '**/*.svg')
		.pipe(svgSprite(options))
		.pipe(gulp.dest(config.SOURCE_TEMPLATES_PATH + 'partials/misc/'));
});
