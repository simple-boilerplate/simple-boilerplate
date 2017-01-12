/**
 * Stylelint Configuration
 *
 * @version 1.0.4
 * @requires Stylelint 7.6.0
 * @see {@link http://stylelint.io/user-guide/rules/|Stylelint}
 */
module.exports = {
	'rules': {

		/**
		 * General / Sheet
		 */

		// Specify indentation
		'indentation': 'tab',

		// Limit the number of adjacent empty lines
		'max-empty-lines': 1,

		// Disallow end-of-line whitespace
		'no-eol-whitespace': true,

		// Disallow extra semicolons
		'no-extra-semicolons': true,

		// Disallow missing end-of-source newlines
		'no-missing-end-of-source-newline': true,

		// Disallow animation names that do not correspond to a @keyframes declaration
		'no-unknown-animations': true,



		/**
		 * At-rule
		 */

		// Require or disallow an empty line before at-rules
		'at-rule-empty-line-before': [
			'always',
			{
				'except': [
					'blockless-after-same-name-blockless'
				],
				'ignore': [
					'after-comment'
				]
			}
		],

		// Specify lowercase or uppercase for at-rules names
		'at-rule-name-case': 'lower',

		// Require a newline after at-rule names
		'at-rule-name-newline-after': 'always-multi-line',

		// Require a single space after at-rule names
		'at-rule-name-space-after': 'always-single-line',

		// Disallow unknown at-rules
		'at-rule-no-unknown': [
			true,
			{
				'ignoreAtRules': [
					'content', // Sass @content
					'debug', // Sass @debug
					'each', // Sass @each
					'else', // Sass @else
					'error', // Sass @error
					'extend', // Sass @include
					'function', // Sass @function
					'for', // Sass @for
					'if', // Sass @if
					'include', // Sass @extend,
					'mixin' // Sass @mixin
				]
			}
		],

		// Require a newline after the semicolon of at-rules
		'at-rule-semicolon-newline-after': 'always',



		/**
		 * Block
		 */

		// Require or disallow an empty line before the closing brace of blocks
		'block-closing-brace-empty-line-before': 'never',

		// Require a newline or disallow whitespace after the closing brace of blocks
		'block-closing-brace-newline-after': 'always',

		// Require a newline or disallow whitespace before the closing brace of blocks
		'block-closing-brace-newline-before': 'always',

		// Disallow empty blocks
		'block-no-empty': true,

		// Disallow single-line blocks
		'block-no-single-line': true,

		// Require a newline after the opening brace of blocks
		'block-opening-brace-newline-after': 'always',

		// Require a single space or disallow whitespace before the opening brace of blocks
		'block-opening-brace-space-before': 'always',



		/**
		 * Color
		 */

		// Specify lowercase or uppercase for hex colors
		'color-hex-case': 'lower',

		// Specify short or long notation for hex colors
		'color-hex-length': 'short',

		// Require (where possible) or disallow named colors
		'color-named': [
			'never',
			{
				'ignore': [
					'inside-function'
				]
			}
		],

		// Disallow invalid hex colors
		'color-no-invalid-hex': true,



		/**
		 * Comment
		 */

		// Require or disallow an empty line before comments
		'comment-empty-line-before': [
			'always',
			{
				'ignore': [
					'between-comments',
					'stylelint-commands'
				]
			}
		],

		// Disallow empty comments
		'comment-no-empty': true,

		// Require or disallow whitespace on the inside of comment markers
		'comment-whitespace-inside': 'always',



		/**
		 * Custom Media
		 */



		/**
		 * Custom Property
		 */

		// Disallow custom properties outside of :root rules
		'custom-property-no-outside-root': true,



		/**
		 * Declaration
		 */

		// Require a single space or disallow whitespace after the bang of declarations
		'declaration-bang-space-after': 'never',

		// Require a single space or disallow whitespace before the bang of declarations
		'declaration-bang-space-before': 'always',

		// Require a newline or disallow whitespace after the colon of declarations
		'declaration-colon-newline-after': 'always-multi-line',

		// Require a single space or disallow whitespace after the colon of declarations
		'declaration-colon-space-after': 'always-single-line',

		// Require a single space or disallow whitespace before the colon of declarations
		'declaration-colon-space-before': 'never',

		// Require or disallow an empty line before declarations
		'declaration-empty-line-before': [
			'always',
			{
				'except': [
					'after-comment',
					'after-declaration',
					'first-nested'
				]
			}
		],

		// Disallow !important within declarations
		'declaration-no-important': [
			true,
			{
				'severity': 'warning',
				'message': 'Please reconsider the use of the `!important` value.'
			}
		],



		/**
		 * Declaration Block
		 */

		// Disallow duplicate properties within declaration blocks
		'declaration-block-no-duplicate-properties': [
			true,
			{
				'ignore': [
					'consecutive-duplicates-with-different-values'
				]
			}
		],

		// Disallow property values that are ignored due to another property value in the same rule
		'declaration-block-no-ignored-properties': true,

		// Disallow longhand properties that can be combined into one shorthand property
		'declaration-block-no-redundant-longhand-properties': true,

		// Disallow shorthand properties that override related longhand properties within declaration blocks
		'declaration-block-no-shorthand-property-overrides': true,

		// Specify the order of properties within declaration blocks
		'declaration-block-properties-order': 'alphabetical',

		// Require a newline or disallow whitespace after the semicolons of declaration blocks
		'declaration-block-semicolon-newline-after': 'always',

		// Require a single space or disallow whitespace before the semicolons of declaration blocks
		'declaration-block-semicolon-space-before': 'never',

		// Require or disallow a trailing semicolon within declaration blocks
		'declaration-block-trailing-semicolon': 'always',



		/**
		 * Font Family
		 */

		// Specify whether or not quotation marks should be used around font family names
		'font-family-name-quotes': 'always-where-recommended',

		// Disallow duplicate font family names
		'font-family-no-duplicate-names': true,



		/**
		 * Font Weight
		 */

		// Require numeric or named (where possible) font-weight values
		'font-weight-notation': 'named-where-possible',



		/**
		 * Function
		 */

		// Disallow an unspaced operator within calc functions
		'function-calc-no-unspaced-operator': true,

		// Require a single space or disallow whitespace after the commas of functions
		'function-comma-space-after': 'always',

		// Require a single space or disallow whitespace before the commas of functions
		'function-comma-space-before': 'never',

		// Disallow direction values in linear-gradient() calls that are not valid according to the standard syntax
		'function-linear-gradient-no-nonstandard-direction': true,

		// Limit the number of adjacent empty lines within functions
		'function-max-empty-lines': 0,

		// Specify lowercase or uppercase for function names
		'function-name-case': 'lower',

		// Require a single space or disallow whitespace on the inside of the parentheses of functions
		'function-parentheses-space-inside': 'never',

		// Disallow scheme-relative urls
		'function-url-no-scheme-relative': true,

		// Require or disallow quotes for urls
		'function-url-quotes': 'always',

		// Require or disallow whitespace after functions
		'function-whitespace-after': 'always',



		/**
		 * Keyframe Declaration
		 */

		// Disallow !important within keyframe declarations
		'keyframe-declaration-no-important': true,



		/**
		 * Length
		 */

		// Disallow units for zero lengths
		'length-zero-no-unit': true,



		/**
		 * Media Feature
		 */

		// Require a single space or disallow whitespace after the colon in media features
		'media-feature-colon-space-after': 'always',

		// Require a single space or disallow whitespace before the colon in media features
		'media-feature-colon-space-before': 'never',

		// Specify lowercase or uppercase for media feature names
		'media-feature-name-case': 'lower',

		// Disallow unknown media feature names
		'media-feature-name-no-unknown': true,

		// Disallow missing punctuation for non-boolean media features
		'media-feature-no-missing-punctuation': true,

		// Require a single space or disallow whitespace on the inside of the parentheses within media features
		'media-feature-parentheses-space-inside': 'never',

		// Require a single space or disallow whitespace after the range operator in media features
		'media-feature-range-operator-space-after': 'always',

		// Require a single space or disallow whitespace before the range operator in media features
		'media-feature-range-operator-space-before': 'always',



		/**
		 * Media Query List
		 */

		// Require a newline or disallow whitespace after the commas of media query lists
		'media-query-list-comma-newline-after': 'always-multi-line',

		// Require a newline or disallow whitespace after the commas of media query lists
		'media-query-list-comma-space-after': 'always-single-line',

		// Require a single space or disallow whitespace before the commas of media query lists
		'media-query-list-comma-space-before': 'never',



		/**
		 * Number
		 */

		// Require or disallow a leading zero for fractional numbers less than 1
		'number-leading-zero': 'always',

		// Disallow trailing zeros in numbers
		'number-no-trailing-zeros': true,



		/**
		 * Property
		 */

		// Specify lowercase or uppercase for properties
		'property-case': 'lower',

		// Disallow unknown properties
		'property-no-unknown': true,



		/**
		 * Root Rule
		 */



		/**
		 * Rule
		 */

		// Require or disallow an empty line before nested rules
		'rule-nested-empty-line-before': [
			'always',
			{
				'ignore': [
					'after-comment'
				]
			}
		],

		// Require or disallow an empty line before non-nested rules
		'rule-non-nested-empty-line-before': [
			'always',
			{
				'ignore': [
					'after-comment'
				]
			}
		],



		/**
		 * Selector
		 */

		// Require a single space or disallow whitespace on the inside of the brackets within attribute selectors
		'selector-attribute-brackets-space-inside': 'never',

		// Require a single space or disallow whitespace after operators within attribute selectors
		'selector-attribute-operator-space-after': 'never',

		// Require a single space or disallow whitespace before operators within attribute selectors
		'selector-attribute-operator-space-before': 'never',

		// Require or disallow quotes for attribute values
		'selector-attribute-quotes': 'always',

		// Require a single space or disallow whitespace after the combinators of selectors
		'selector-combinator-space-after': 'always',

		// Require a single space or disallow whitespace before the combinators of selectors
		'selector-combinator-space-before': 'always',

		// Disallow non-space characters for descendant combinators of selectors
		'selector-descendant-combinator-no-non-space': true,

		// Limit the number of adjacent empty lines within selectors
		'selector-max-empty-lines': 0,

		// Disallow empty selectors
		'selector-no-empty': true,

		// Specify lowercase or uppercase for pseudo-class selectors
		'selector-pseudo-class-case': 'lower',

		// Disallow unknown pseudo-class selectors
		'selector-pseudo-class-no-unknown': true,

		// Require a single space or disallow whitespace on the inside of the parentheses within pseudo-class selectors
		'selector-pseudo-class-parentheses-space-inside': 'never',

		// Specify lowercase or uppercase for pseudo-element selectors
		'selector-pseudo-element-case': 'lower',

		// Specify single or double colon notation for applicable pseudo-elements
		'selector-pseudo-element-colon-notation': 'double',

		// Disallow unknown pseudo-element selectors
		'selector-pseudo-element-no-unknown': true,

		// Specify lowercase or uppercase for type selector
		'selector-type-case': 'lower',

		// Disallow unknown type selectors
		'selector-type-no-unknown': true,



		/**
		 * Selector List
		 */

		// Require a newline or disallow whitespace after the commas of selector lists
		'selector-list-comma-newline-after': 'always',

		// Require a single space or disallow whitespace before the commas of selector lists
		'selector-list-comma-space-before': 'never',



		/**
		 * Shorthand Property
		 */

		// Disallow redundant values in shorthand properties
		'shorthand-property-no-redundant-values': true,



		/**
		 * String
		 */

		// Disallow (unescaped) newlines in strings
		'string-no-newline': true,

		// Specify single or double quotes around strings
		'string-quotes': 'single',



		/**
		 * Stylelint Disable Comment
		 */

		// Require a reason comment before or after stylelint-disable comments
		'stylelint-disable-reason': 'always-after',



		/**
		 * Time
		 */



		/**
		 * Unit
		 */

		// Specify lowercase or uppercase for units
		'unit-case': 'lower',

		// Disallow unknown units
		'unit-no-unknown': true,



		/**
		 * Value
		 */

		// Specify lowercase or uppercase for keywords values
		'value-keyword-case': 'lower',



		/**
		 * Value List
		 */

		// Require a newline or disallow whitespace after the commas of value lists
		'value-list-comma-newline-after': 'always-multi-line',

		// Require a single space or disallow whitespace after the commas of value lists
		'value-list-comma-space-after': 'always-single-line',

		// Require a single space or disallow whitespace before the commas of value lists
		'value-list-comma-space-before': 'never',

		// Limit the number of adjacent empty lines within value lists
		'value-list-max-empty-lines': 0
	}
};
