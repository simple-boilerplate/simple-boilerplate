var proto = proto || {};

/**
 * Header
 */
proto.header = function() {

	var $header = $('.header');
	var stickyClass = 'header_is-sticky';

	$(window).scroll(function () {

		scrollPos = $(window).scrollTop();

		if (scrollPos > 0) {
			$header.addClass(stickyClass);
		} else {
			$header.removeClass(stickyClass);
		}
	});
};

proto.matrix = function() {

	// DOM stuff
	var $w = window;
	var $b = document.body;

	var toArray = function toArray(arr) {
		return Array.prototype.slice.call(arr);
	};
	var items = toArray(document.querySelectorAll('.matrix__item'));

	function updateNodes() {
		var bottomClass = 'matrix__item_offset_pos';
		var topClass = 'matrix__item_offset_neg';

		items.filter(function (el) {
			return el.offsetTop < $b.scrollTop + $w.innerHeight;
		}).forEach(function (el) {
			return el.classList.remove(bottomClass);
		});
		items.filter(function (el) {
			return el.offsetTop > $b.scrollTop + $w.innerHeight;
		}).forEach(function (el) {
			return el.classList.add(bottomClass);
		});
		items.filter(function (el) {
			return el.offsetTop + el.offsetHeight > $b.scrollTop;
		}).forEach(function (el) {
			return el.classList.remove(topClass);
		});
		items.filter(function (el) {
			return el.offsetTop + el.offsetHeight < $b.scrollTop;
		}).forEach(function (el) {
			return el.classList.add(topClass);
		});
	}

	document.addEventListener('scroll', updateNodes, false);
	document.addEventListener('resize', updateNodes, false);
};

/**
 * Navigation
 */
proto.nav = function() {

	var $body = $('body');
	var $close = $('.nav__close');
	var $item = $('.nav__item');
	var $link = $('.nav__link');
	var $toggle = $('.nav__toggle');
	var $trigger = $('.nav-supp__link[data-icon="menu"]');
	var activeClass = 'nav__item_is-selected';
	var visibleClass = 'nav_is-visible';

	$close.click(function (event) {
		event.preventDefault();
		$body.removeClass(visibleClass);
	});

	$toggle.click(function (event) {
		event.preventDefault();

		if (!$(this).parent().hasClass(activeClass)) {
			$(this).attr('data-icon', 'up');
			$(this).parent().addClass(activeClass);
			$(this).next().slideToggle();
		} else {
			$(this).attr('data-icon', 'down');
			$(this).parent().removeClass(activeClass);
			$(this).next().slideToggle();
		}

	});

	$trigger.click(function (event) {
		event.preventDefault();
		$body.addClass(visibleClass);
	});
};

/**
 * Sidebar
 */
proto.sidebar = function() {
	var $body = $('body');
	var $close = $('.sidebar__close');
	var $trigger = $('.nav-supp__link[data-icon="mail"]');
	var visibleClass = 'sidebar_is-visible';

	$trigger.click(function (event) {
		event.preventDefault();
		$body.addClass(visibleClass);
	});

	$close.click(function (event) {
		event.preventDefault();
		$body.removeClass(visibleClass);
	});
};

/**
 * DOM Ready
 */
$(function() {
	proto.header();
	proto.matrix();
	proto.nav();
	proto.sidebar();
});
