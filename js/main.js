/**
 * @fileOverview  main.js, dev
 * @version 1.0
 */
 
 
// 'use strict';


(function($, window, document) {
	
'use strict';
	
// outer namespace
var globalLib = {
	ON_LOAD_WIDTH  : 0, // stores window.width()
	ON_LOAD_HEIGHT : 0, // stores window.height()
	SESSION        : 0	// id for requestAnimationFrame()
};

$(window).on('load', function(){ 			
	globalLib.ON_LOAD_WIDTH = $(window).width();
	globalLib.ON_LOAD_HEIGHT = $(window).height();
});


$(document).ready(function($){	
	//	if (window.console) console.log('console.log init');
	
	var $body				= $('body'),
		$bodyHtml			= $('html, body'),
		$mainHeader			= $('.scroll-hide-header'),
		$secondaryNavLinks 	= $('.secondary-nav a'),
		$secondaryNav 		= $('.secondary-nav'),
		mainHeaderHeight 	= $mainHeader.outerHeight(),		// includes padding
		$downArrow			= $('.down-arrow'),
		$about 				= $('.about'),
		$aboutPopup			= $('.about-popup'),
		$onScrollAnimate 	= $('.onScroll-animate'),
		// off-canvas:
		$menuToggle 		= $('.menu-toggle'),
		$menuClose			= $('.closeMobile'),
		$container 			= $('.page-container'),
		$offcanvasLinks 	= $('.off-canvas a'),
		// scroll-hide header nav
		isScrolling 		= false,
		previousTop 		= 0,
		currentTop 			= 0,
		scrollDelta 		= 10,
		scrollOffset 		= 150;
		
		
	// ================================================================================================================
	//  smooth scrolling
	//
	//	NOTES:
	//  2 smooth scrollers are used by simple animate() calls for:
	//  i)  desktop top nav (secondaryNavLinks), and
	//  ii) mobile off-canvas nav (offcanvasLinks)
	// ================================================================================================================

	/**
	 * @description 			 	uses animate() for smooth scrolling when clicking on anchor links; <br>
	 *								animate() syntax: <br>
	 *								(CSS selector).animate({styles}, speed, easing, callback) 
	 *
	 * @method smoothScroll 
	 *
	 * @param {hash} 	href	-	hash target selector for anchor links being offset()
	 *
	 * @example
	 * // 2 ways to pass the argument:
	 * smoothScroll($.attr(this, 'href'));	// static call: faster
	 * smoothScroll($(href.hash));			// method call: slower, but the @return includes the #-sign
	 * 
	 */ 
	function smoothScroll(href) {
		var id = href.substr(href.indexOf("#") + 1); 	//  anchor part of the href
		var tar = $("#" + id);
		
		$bodyHtml.animate(
			{scrollTop: tar.offset().top},
			600,
			function () {	// set anchor href to window URL on callback, after scrolling is complete
				window.location.hash = id;
			}
		);
	}
	
	$secondaryNavLinks.on('click', function(event){
		event.preventDefault();
		smoothScroll($.attr(this, 'href'));
	});
	
	$downArrow.on('click', function(event){
		event.preventDefault();
		smoothScroll($.attr(this, 'href'));
	});
	
	
	// ================================================================================================================
	//  spy scrolling
	//
	//	NOTES:
	//  2 spy scrollers are used for:
	//  i)  desktop top nav (secondaryNavLinks), and
	//  ii) mobile off-canvas nav (offcanvasLinks)
	//	run separately using the Modernizr.mq check invoked on window.resize()
	// ================================================================================================================
	
	/**
	 * @description 								adds an active class to anchor links on window.scroll()
	 * @method spyScroller
	 * 
	 * @param {array} 	cur		 		-	 		map of scroll items
	 *
	 * @param {number}  id		 		- 	 		id of anchor href, <br>
	 *							 	 	 			filtered as: filter("[href='#" + id + "']"); <br>
	 *							 	 	 			used for adding the active class
	 *
	 * @param {array}	links	 		-	 		map array of anchor links in either the: <br>
	 *									 			i)  desktop top nav (secondaryNavLinks), or <br>
	 *								 	 			ii) mobile off-canvas nav (offcanvasLinks)
	 *						  
	 * @param {string} 	active_class 	-			class to be added on scroll; <br>
	 *												same name 'active' in both cases
	 */
	function spyScroller(cur, id, links, active_class){
		var scrollItems = links.map(function(){		
			var item = $($(this).attr('href'));		
			if (item.length) { return item; }		// if non-zero, then return
		});
	
		$(window).on('scroll', function(){
			// vertical scrollbar position from mainHeader
			var fromTop = $(this).scrollTop() + mainHeaderHeight;
		
			// map current scroll item
			cur = scrollItems.map(function(){
			if ($(this).offset().top < fromTop) {
				return this;
			}
			});  
   
			// id of the current element
			cur = cur[cur.length - 1];
			id = cur && cur.length ? cur[0].id : '';
   
			// add/remove the active class to the current anchor href id
			links
				.parent().removeClass(active_class)
				.end().filter("[href='#" + id + "']").parent().addClass(active_class); 
		});
	}

	/**
	 * @description 			 uses Modernizr.mq() to invoke spyScroller() based on desktop / mobile viewport <br>
	 *							 at medium size of 40rem; <br>
	 *							 invoked on window.resize()
	 * @method ModernizrMQCheck 
	 * 
	 */
	function ModernizrMQCheck() {
		if(Modernizr.mq('screen and (min-width: 40rem)')) {			// desktop			
			var cur_desk = 0, 
				id_desk = 0;
			spyScroller(cur_desk, id_desk, $secondaryNavLinks, 'active');
				
		} else if(Modernizr.mq('screen and (max-width: 40rem)')) {	// mobile 
			var cur_mobile = 0, 
				id_mobile = 0;
			spyScroller(cur_mobile, id_mobile, $offcanvasLinks, 'active');
		}
	}
	
	// ================================================================================================================
	//  request/cancel AnimationFrame polyfill by Erik Möller, fixes from Paul Irish and Tino Zijdel:
	//  IE <= 9 fallback for setTimeout() and clearTimeout()
	//
	//  NOTES:
	//  https://cdn.polyfill.io/v2/polyfill.min.js is used instead
	//  http://paulirish.com/2011/requestanimationframe-for-smart-animating/
	//  http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
	// ================================================================================================================
	

/*	(function() {
		var lastTime = 0;
		var vendors = ['ms', 'moz', 'webkit', 'o'];
		for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
			window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
			window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
								   || window[vendors[x]+'CancelRequestAnimationFrame'];
		}
 
		if (!window.requestAnimationFrame)
			window.requestAnimationFrame = function(callback, element) {
				var currTime = new Date().getTime();
				var timeToCall = Math.max(0, 16 - (currTime - lastTime));
				var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
					timeToCall);
				lastTime = currTime + timeToCall;
				return id;
			};
 
		if (!window.cancelAnimationFrame)
			window.cancelAnimationFrame = function(id) {
			clearTimeout(id);
		};
	}());
*/

	// ================================================================================================================
	//  $(window).resize() common
	//
	//  NOTES:
	//  separate x- and y-axis use for:
	//  i)  width only  : spy scrolling, ModernizrMQCheck() 
	//  ii) height only : spy scrolling, mainHeaderHeight
	// ================================================================================================================

	
	$(window).on('resize', function() {
		if(globalLib.ON_LOAD_WIDTH != $(window).width()){		 // window.width() changed since window.load()	
			cancelAnimationFrame(globalLib.SESSION);
			globalLib.SESSION = requestAnimationFrame(ModernizrMQCheck); // invoke ModernizrMQCheck() on resize
			
			globalLib.ON_LOAD_WIDTH = $(window).width();

			 // delete ON_LOAD_WIDTH;

		} else if(globalLib.ON_LOAD_HEIGHT != $(window).height()){ // window.height() changed since window.load()
			mainHeaderHeight = $mainHeader.outerHeight();
			
			globalLib.ON_LOAD_HEIGHT = $(window).height();
		}
	});
	requestAnimationFrame(ModernizrMQCheck);


	// ================================================================================================================
	//  scroll-hide header nav
	//
	//  NOTES:
	//  requestAnimationFrame polyfill used for IE <= 9
	// ================================================================================================================


	/**
	 * @description 								sets scrolling position with scrollTop(), and <br>
	 *												checks if scrolling up/down with checkScrollUpDown(), then <br>
	 *												reset; <br>
	 *												invoked on window.scroll()
	 * @method scrollHideHeader
	 *
	 */
	function scrollHideHeader() {
		var currentTop = $(window).scrollTop();

		checkScrollUpDown(currentTop);

		// reset
		previousTop = currentTop;
		isScrolling = false;
	}

	/**
	 * @description 						checks if scrolling up/down, invoked in scrollHideHeader(), and <br>
	 *										adds the 'translateHeader' CSS class
	 *
	 * @method checkScrollUpDown
	 *
	 * @param {int} 	currentTop	 	-	scrolling position set with scrollTop() in scrollHideHeader(); <br>
	 *										default value 0
	 *
	 */
	function checkScrollUpDown(currentTop) {
		if (previousTop - currentTop > scrollDelta) {
			//  scrolling up
			$mainHeader.removeClass('translateHeader');
		} else if(currentTop - previousTop > scrollDelta && currentTop > scrollOffset) {
			// scrolling down
			$mainHeader.addClass('translateHeader');
		}
	}
	
	$(window).on('scroll', function(){
		if(!isScrolling) {
			isScrolling = true;
			
			requestAnimationFrame(scrollHideHeader);
		}
	});
	requestAnimationFrame(scrollHideHeader);
	
	
	// ================================================================================================================
	//  on scroll css translation
	//
	//  NOTES:
	//  window position is set with globalLib.ON_LOAD_HEIGHT and mainHeaderHeight
	// ================================================================================================================	
	
	/**
	 * @description 						checks if .onScroll-animate is between window top and bottom; <br>
	 *										if yes, then add addClass('in-view') to start CSS translateX
	 *
	 * @method onScrollCheck
	 *
	 */
	function onScrollCheck() {
		var windowTop = $(window).scrollTop() + mainHeaderHeight;		
		var windowBottom = windowTop + globalLib.ON_LOAD_HEIGHT;
		var elementPadding = 10;

		$.each($onScrollAnimate, function() {
			var $this = $(this);
			var thisHeight = $this.outerHeight();
			var thisTop = $this.offset().top;
			var thisBottom = thisTop + thisHeight;
		 
		 	// between window top and and bottom
			if (thisBottom - elementPadding >= windowTop && 
				thisTop + elementPadding <= windowBottom) {
				$this.addClass('in-view');
			} else {
				$this.removeClass('in-view');
			}
		});
	}
	// invoke and trigger
	$(window).on('scroll resize', onScrollCheck);
	$(window).trigger('scroll');

	
	// ================================================================================================================
	//  mobile menu and hamburger icon
	//
	//  NOTES:
	//  these are same-page anchor links, and so
	//  the same 2 sets of 2 open and close classes are triggered by 2 different events; 
	//  therefore, a lot of the below can be deleted if links lead to different pages, or 
	//  if on-canvas y-scrolling is disabled;
	//
	//  translate3d and 'position: fixed' force different behaviours in different browsers; 
	//  custom smooth scrolling is used to make the different browsers (mainly IE) to behave in the same way
	// ================================================================================================================
	
	/**
	 * @description 			 used when closing the off-canvas mobile menu; <br>
	 *							 also, removes both the open and close classes from the site container
	 * @method menuCloseReset 
	 * 
	 */
	function menuCloseReset() {
		$menuToggle.toggleClass('toggle-icon');
		$container.addClass('is-close');
			$container.removeClass('is-open').removeClass('is-close');		// reset
	}
	
	$menuToggle.on('click', function(){
		$container.toggleClass('is-open');
		$menuToggle.toggleClass('toggle-icon');
	});
	
	
	$offcanvasLinks.on('click', function(event){
		event.preventDefault();
		smoothScroll($.attr(this, 'href'));			// smooth scrolling override
		menuCloseReset();
	});
	
	$menuClose.on('click', function(){
		menuCloseReset();
	});
		
	
	// ================================================================================================================
	//  on-canvas: about z-layer popup
	//
	//  NOTES:
	//  no-scroll needs to be added to the body and not html to preserve scrolling location
	// ================================================================================================================	
	
	// open
	$about.on('click', function() {
		console.log('$about.on(click');
		$aboutPopup.addClass('is-visible');
		$body.addClass("no-scroll");
	});	
	
	
	// close 
	$aboutPopup.on('click', '.close', function(event){
		console.log('$aboutPopup.on(click, .close');
		event.preventDefault();
		$aboutPopup.removeClass('is-visible');
		$body.removeClass("no-scroll");
	});	
	
	// keyboard press override
	$(document).keyup(function(event){
		if(event.which == '27' && $aboutPopup.hasClass('is-visible')) {		// KEY = ESC
			$aboutPopup.removeClass('is-visible');
			$body.removeClass("no-scroll");
		}
	});

});
	
// ================================================================================================================
//  browser upgrade message
//
//  NOTES:
//  from: http://www.browser-update.org/#install
// ================================================================================================================

var $buoop = {vs:{i:9,f:-8,o:-8,s:7,c:-8},api:4}; 
function $buo_f(){ 
	var e = document.createElement("script"); 
	e.src = "//browser-update.org/update.min.js"; 
	document.body.appendChild(e);
}

try {
	document.addEventListener("DOMContentLoaded", $buo_f, false);
} catch(e) {
	window.attachEvent("onload", $buo_f);
}

}(window.jQuery, window, document));