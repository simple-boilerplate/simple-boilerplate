/// <binding AfterBuild='vs' />
/* jshint node:true */

module.exports = function (grunt) {
	'use strict';

	require('load-grunt-tasks')(grunt);
	var path = require('path');

	/**
	 * Project settings
	 */
	var settings = {
		prototype_src: '_Prototype/src',
		vs_src: 'Assets',
		dev: '_Prototype/dev',
		siteType: grunt.option('type') || '*',
		buildTargets: grunt.option('target') ? grunt.option('target').split(',') : ['dev', 'vs'],
		port: 9000,

		themes: {
		    peab: [
				'aggregates',
				'annehem',
				'asunnot',
				'ats',
				'bararelaget',
				'bostad',
				'businessgarden',
                'byggelement',
				'ferdig-betong',
				'linje-kabel',
				'lambertsson',
				'lkb',
				'masab',
				'nordiskfundamentering',
				'peab',
				'peabmarin',
				'pgs',
				'radasand',
				'ralling',
				'swecem',
				'tomas-pumpare',
				'valhallpark',
				'wbm'
			]
		}
	};

	/**
	 * Generate a list of all possible site types
	 */
	function getAllSiteTypes() {
		var root = path.join(settings.prototype_src, 'types');

		var fs = require('fs');
		var types = fs.readdirSync(root);

		types = types.filter(function(type) {
			return fs.statSync(path.join(root, type)).isDirectory();
		});

		return types;
	}

	/**
	 * Get filtered site types
	 */
	function getSiteTypes() {
		return getAllSiteTypes().filter(function(type) {
			return type === settings.siteType || settings.siteType === '*';
		});
	}

	function generateSvgStoreTargets() {
		var types = getSiteTypes();

		var targets = {};
		types.forEach(function(type) {
			var options = {
				cleanup: ['fill', 'stroke'],
				includeTitleElement: false,
				prefix : 'icon-', // This will prefix each ID
				svg: { // will add and overide the the default xmlns="http://www.w3.org/2000/svg" attribute to the resulting SVG
					xmlns: 'http://www.w3.org/2000/svg'
				},
				symbol: {
					viewbox: '0 0 16 16'
				}
			};

			if (settings.buildTargets.indexOf('dev') !== -1) {
				targets['dev-' + type] = {
					options : options,
					src: ['<%= settings.prototype_src %>/types/' + type + '/svg/*.svg'],
					dest: '<%= settings.prototype_src %>/types/' + type  + '/templates/misc/icons.hbs'
				};
			}

			// if (settings.buildTargets.indexOf('vs') !== -1) {
			// 	targets['vs-' + type] = {
			// 		options: options,
			// 		src: ['<%= settings.prototype_src %>/types/' + type + '/svg/*.svg'],
			// 		dest: '<%= settings.vs_src %>/' + type + '/svg/icons.svg'
			// 	};
			// }

		});

		return targets;
	}

	/**
	 * Generate grunt targets for assembling templates
	 * Creates one for each siteType
	 * Needs to be created like this because partials would interfere if only having one global assemble target pointing to all
	 */
	function generateAssembleTargets() {
		var types = getSiteTypes();

		var targets = {};
		types.forEach(function(type) {
			targets[type] = {
				options: {
					currentTheme: settings.themes[type][0],
					theme: function() {
						this.theme = {};
						for (var key in this.themes) {
							if (key === this.currentTheme) {
								this.theme = this.themes[key];
								this.theme2 = JSON.stringify(this.themes[key]);
                            }
                        }
                        return this.theme;
                    },
					helpers: '<%= settings.prototype_src %>/types/' + type + '/helpers/**/*.js',
					partials: [
						'<%= settings.prototype_src %>/core/templates/modules/**/*.hbs',
						'<%= settings.prototype_src %>/types/' + type + '/templates/modules/**/*.hbs',
						'<%= settings.prototype_src %>/types/' + type + '/templates/layout/**/*.hbs',
						'<%= settings.prototype_src %>/types/' + type + '/templates/elements/**/*.hbs',
						'<%= settings.prototype_src %>/types/' + type + '/templates/misc/**/*.hbs'
					],
					layout: '<%= settings.prototype_src %>/types/' + type + '/templates/index.hbs',
					data: ['<%= settings.prototype_src %>/types/' + type + '/data/**/*.json'],
					siteRoot: type
				},
				files: [{
					expand: true,
					cwd: '<%= settings.prototype_src %>/types/' + type + '/templates/pages',
					src: ['**/*.hbs'],
					dest: '<%= settings.dev %>/' + type
				}]
			};
		});

		return targets;
	}

	function generateSassTargets() {
		var siteTypes = getSiteTypes();

		var targets = {
			options: {
				sourceMap: false
			}
		};

		siteTypes.forEach(function(siteType) {
			var themes = settings.themes[siteType];

			themes.forEach(function(theme) {

				// Dev
				if (settings.buildTargets.indexOf('dev') !== -1) {
					targets['dev-' + siteType + '-' + theme] = getTargetBase(siteType, theme, {
						includePaths: [settings.prototype_src + '/types/' + siteType + '/sass/environment/development'],
						src: ['!<%= settings.siteType %>/sass/editor.scss'],
						dest: '<%= settings.dev %>'
					});
				}

				// Vs
				if (settings.buildTargets.indexOf('vs') !== -1) {
					targets['vs-' + siteType + '-' + theme] = getTargetBase(siteType, theme, {
						includePaths: [settings.prototype_src + '/types/' + siteType + '/sass/environment/production'],
						src: ['!<%= settings.siteType %>/sass/prototype.scss'],
						dest: '<%= settings.vs_src %>'
					});
				}
			});
		});

		function getTargetBase(siteType, theme, extend) {
			return {
				options: {
					includePaths: [ settings.prototype_src + '/types/' + siteType + '/sass/themes/' + theme ].concat(extend.includePaths || [])
				},
				files: [{
					expand: true,
					cwd: '<%= settings.prototype_src %>/types',
					src: ['<%= settings.siteType %>/sass/*.scss', '!**/_*.scss'].concat(extend.src || []),
					ext: '.css',
					dest: extend.dest,
					rename: function(destRoot, src) {
						var type = src.substr(0, src.indexOf('/'));
						var filename = src.substr(src.lastIndexOf('/') + 1);

						return path.join(destRoot, type, 'css', theme + '-' + filename);
					}
				}]
			};
		}

		return targets;
	}

	/**
	 * Grunt config
	 */
	grunt.initConfig({

		settings: settings,

		/**
		 * Start server with livereload
		 */
		connect: {
			livereload: {
				options: {
					port: '<%= settings.port %>',
					hostname: '*',
					base: '<%= settings.dev %>'
				}
			}
		},

		/**
		 * Watch for changes in files
		 */
		watch: {
			options: {
				livereload: 35729
			},
			html: {
			    files: ['<%= settings.prototype_src %>/types/<%= settings.siteType %>/data/**/*', '<%= settings.prototype_src %>/types/<%= settings.siteType %>/templates/**/*'],
				tasks: ['assemble']
			},
			sass: {
				files: ['<%= settings.prototype_src %>/types/<%= settings.siteType %>/sass/**/*.scss'],
				// tasks: ['sass:dev']
				tasks: ['stylelint', 'sass']
			},
			svg: {
				files: ['<%= settings.prototype_src %>/types/<%= settings.siteType %>/svg/**/*.svg'],
				tasks: ['svgstore']
			},
			scripts: {
				files: [
					'<%= settings.vs_src %>/<%= settings.siteType %>/js/src/**/*.js',
					'<%= settings.vs_src %>/Common/js/**/*.js'
				],
				tasks: ['jshint', 'browserify:dev']
			},
			assets: {
				files: ['<%= settings.prototype_src %>/types/<%= settings.siteType %>/assets/**/*', '<%= settings.prototype_src %>/types/<%= settings.siteType %>/assets-temp/**/*'],
				tasks: ['newer:copy:dev', 'generateIndex']
			}
		},

		/**
		 * Sass
		 */
		sass: generateSassTargets(),

		/**
		 * Stylelint
		 */
		stylelint: {
			options: {
				configFile: '_Prototype/stylelint.config.js',
				format: 'scss'
			},
			src: '<%= settings.prototype_src %>/types/<%= settings.siteType %>/sass/**/*.scss'
		},

		/**
		 * SVG
		 */
		svgstore: generateSvgStoreTargets(),

		/*
		 * Validate files with JSHint.
		 */
		jshint: {
			// Configure JSHint (documented at http://www.jshint.com/docs/).
			files: ['gruntfile.js']
		},

		/**
		 * Concat JS files to one
		 */
		concat: {
			options: {},
			dev: {
				options: {
					sourceMap: true
				},
				src: ['<%= settings.vs_src %>/js/bubblesession/*.js'],
				dest: '<%= settings.dev %>/Assets/js/bubblesession/scripts.js'
			}
		},

		/**
		 * Uglify and compress JS
		 */
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n\n',
				beautify: true,
				compress: true,			//true false
				mangle: false,			//true false,
				preserveComments: false //'all' 'some'
			},
			dev: {
				src: '<%= settings.dev %>/Assets/js/bubblesession/scripts.js',
				dest: '<%= settings.dev %>/Assets/js/bubblesession/scripts.min.js'
			},
			yt: {
				src: '<%= settings.yt %>/Assets/js/bubblesession/scripts.js',
				dest: '<%= settings.yt %>/Assets/js/bubblesession/scripts.min.js'
			}
		},

		/**
		 * Assemble all hbs files to html files
		 */
		assemble: generateAssembleTargets(),

		/**
		 * Browserify
		 */
		browserify: {
			options: {
				browserifyOptions: {
					debug: true
				},
				alias: {
					jquery: './Assets/Common/js/libs/jquery.js'
				},
				plugin: [
					[
						'remapify', [{
							cwd: './Assets/Common/js',
							src: '**/*.js',
							expose: 'core'
						}]
					]
				]
			},
			dev: {
				files: [{
					expand: true,
					cwd: '<%=settings.vs_src %>',
					src: ['<%= settings.siteType %>/js/src/*.js'],
					dest: '<%= settings.dev %>'
				}]
			},
			vs: {
				files: [{
					expand: true,
					cwd: '<%=settings.vs_src %>',
					src: ['<%= settings.siteType %>/js/src/*.js', '!<%= settings.siteType %>/js/src/prototype.js'],
					dest: '<%= settings.vs_src %>',

					// We want the output in form "{dest}/{type}/js/bundles/{filename}.js"
					// the source will come in form "{type}/js/src/{filename}.js"
					rename: function(destRoot, src) {
						var type = src.substr(0, src.indexOf('/'));
						var filename = src.substr(src.lastIndexOf('/'));

						return path.join(destRoot, type, 'js/bundles', filename);
					}
				}]
			}
		},


		/**
		 * Copy static asset files
		 */
		copy: {
			dev: {
				files: [{
					// Assets
					expand: true,
					cwd: '<%= settings.prototype_src %>/types',
					src: [ '<%= settings.siteType %>/assets/**/*'],
					dest: '<%= settings.dev %>/',

					// Remove 'assets/' from path
					rename: function(destRoot, src) {
						return path.join(destRoot, src.replace('assets/', ''));
					}
				}, {
					// Temp
					expand: true,
					cwd: '<%= settings.prototype_src %>/types',
					src: [ '<%= settings.siteType %>/assets-temp/**/*'],
					dest: '<%= settings.dev %>/'
				}]
			},
			vs: {
				files: [{
					expand: true,
					cwd: '<%= settings.prototype_src %>/types',
					src: [ '<%= settings.siteType %>/assets/**/*'],
					dest: '<%= settings.vs_src %>/',

					// Remove 'assets/' from path
					rename: function(destRoot, src) {
						return path.join(destRoot, src.replace('assets/', ''));
					}
				}]
			}
		},

		/**
		 * Generate index file for prototype
		 */
		generateIndex: {
			dev: {
				options: {
					// style: '',
					// filename: 'index.html'
				},
				files: [{
					expand: true,
					cwd: '<%= settings.dev %>',
					src: ['.']
				}, {
					expand: true,
					cwd: '<%= settings.dev %>',
					src: ['<%= settings.siteType %>']
				}]
			}
		},


		/**
		 * Create directories that are required for vs when deploying even if there's no content
		 */
		// mkdir: {
		// 	vs: {
		// 		options: {
		// 			create: (function() {
		// 				var res = [];

		// 				settings.themes.peab.forEach(function(theme) {
		// 					res.push(
		// 						path.join(settings.vs_src, 'Peab/css/themes', theme),
		// 						path.join(settings.vs_src, 'Peab/assets/themes', theme, 'favicon')
		// 					);
		// 				});

		// 				return res;
		// 			}())

		// 		}
		// 	}
		// },

		/**
		 * Clean dev folder
		 */
		clean: {
			dev: ['<%= settings.dev %>']
		},

		/**
		 * Teamcity, just needs an empty task
		 */
		teamcity: {
			all: {}
		}
	});


	/* Grunt tasks */
	grunt.registerTask('dev', [
		'clean:dev',
		'svgstore',
		'assemble',
		//'generateIndex',
		// 'sass:dev',
		//'stylelint',
		'sass',
		'copy:dev',
		'browserify:dev'
	]);

	grunt.registerTask('server', [
		'connect',
		'dev',
		'watch'
	]);

	grunt.registerTask('vs', [
		// 'mkdir:vs',
		// 'sass:vs',
		'svgstore',
		'sass',
		'copy:vs',
		'browserify:vs'
	]);

	grunt.registerTask('default', 'server');

	// Enable teamcity-style outputs for teamcity
	grunt.registerTask('teamcity-dev', ['teamcity', 'dev']);
	grunt.registerTask('teamcity-vs', ['teamcity', 'vs']);
};
