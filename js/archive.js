/**
 * @fileOverview  archive.js, dev 
 * @version 1.0
 */
 
 
//'use strict';


(function($, window, document) {
	
	'use strict';

$(document).ready(function($){	

	// if (window.console) console.log('console.log init');

	var $projectOpen						= 	 	$('.project-open'),
		$projectOpenWidth				=	 	$('.project-open').outerWidth(),		// includes padding
		openLeftWidth						=		400,														// width of .open-left
		$body				 						=	 	$('body'),
		projectOpenLeftNew 	 		  = 	 	0,															// set on resize()
	  	projectOpenTopNew  	 		 = 	 	0,																// set on resize()
	  	projectOpenWidthNew			= 	 	0,															// set on resize()
//		$closeX 			 						=   	$('.close-x'),										// css "X" for closing
		tempId				 						=   	0,															// href anchor
		$projectContainerLinks			=		$('.projects-container a'),
		$onScrollAnimate 					= 		$('.onScroll-animate'),
		// hammer.js (without JQuery plugin):
		hammerElement 						= 		document.getElementById('project-open-container'),
		hammer 										= 		new Hammer(hammerElement);
		
		
	// ================================================================================================================
	//  project-open
	//
	// ================================================================================================================
		
	// open project
	$projectContainerLinks.on('click', function(){
		var id = $(this).attr('href'),
			projectItemImg = $(this).parent('.project-item').children('img');

		$body.addClass('overlay-layer');	// clickable overlay
		velocityProjectOpen(projectItemImg, openLeftWidth, $projectOpenWidth, 'open', id);
	});

	// close project
	$body.on('click', function(event){
		if($(event.target).is('.close-x') || 
		   $(event.target).is('body.overlay-layer') || 
		   $(event.target).is('.project-empty')) {	// since z-index: .project-empty > .overlay-layer
			closeProject(openLeftWidth, $projectOpenWidth);
		}
	});
	
	// keyboard press override
	$(document).keyup(function(event){
    	if($projectOpen.hasClass('is-visible') && event.which == '27') {	// KEY = ESC
			closeProject(openLeftWidth, $projectOpenWidth);
		}
	});
	
	// close on horizontal swipe
	hammer.on("swipe", function() {
    	if($projectOpen.hasClass('is-visible')) {	
		
			closeProject(openLeftWidth, $projectOpenWidth);
			
//			$projectOpen.velocity({
//			    'left': -10 +'px',
//			}, 300);
//			
			
		}
	});


	/**
	 * @description 										closes project-open
	 * @method closeProject 
	 * 
	 * @param {number} 	finalWidth		 		-	 		set css width of $projectOpen, <br>
	 *														passed to velocity()
	 *
	 * @param {object}  $projectOpenWidth 		- 	 		$('.project-open').outerWidth(), <br>
	 *							 	 	 					passed to velocity()
	 */
	function closeProject(finalWidth, $projectOpenWidth) { 
		var projectItemImg = $('.project-empty').find('img');

		if($projectOpen.hasClass('add-info')) {		// .add-info animation is started
			velocityProjectOpen(projectItemImg, finalWidth, $projectOpenWidth, 'close', tempId);
		} else {
			closeProjectQuick(projectItemImg, finalWidth, $projectOpenWidth);
		}
	}
	
	
	/**
	 * @description 										close with velocity('stop') before the project is expanded
	 * @method closeProjectQuick
	 * 
	 * @param {object} 	image		 			-	 		$('.project-empty').find('img')
	 *
	 * @param {number} 	finalWidth 				-	 		set css width of $projectOpen, <br>
	 *														passed to velocity()
	 *
	 * @param {object}  $projectOpenWidth 		- 	 		$('.project-open').outerWidth(), <br>
	 *							 	 	 					passed to velocity()
	 */
	function closeProjectQuick(image, finalWidth, $projectOpenWidth) { 
		var parentProjectItem = image.parent('.project-item'),
			topSelected = image.offset().top - $(window).scrollTop(),
			leftSelected = image.offset().left,
			widthSelected = image.width();

		$body.removeClass('overlay-layer');
		$projectOpen.velocity('stop').removeClass('add-info open-animate is-visible').css({
					'top': topSelected + 'px',
				    'left': leftSelected + 'px',
			    'width': 0 + 'px',
		});
		parentProjectItem.removeClass('project-empty');
	}

	/**
	 * @description 										adds an active class to anchor links on window.scroll()
	 * @method velocityProjectOpen
	 *
	 * @param {object} 	image		 			-	 		$('.project-empty').find('img')
	 *
	 * @param {number} 	finalWidth 				-	 		set css width of $projectOpen, <br>
	 *														passed to velocity()
	 *
	 * @param {object}  $projectOpenWidth 		- 	 		$('.project-open').outerWidth(), <br>
	 *							 	 	 					passed to velocity()
	 *
	 * @param {string} 	animationType		 	-	 		'open' or 'close' velocity() animation
	 *
	 * @param {number}  tempId		 			- 	 		attr('href') of $projectContainerLinks
	 *
	 */
	function velocityProjectOpen(image, finalWidth, $projectOpenWidth, animationType, tempId) {
		var parentProjectItem	 = 		image.parent('.project-item'),
			windowHeight		 = 		$(window).height(),
			topSelected 		 = 		image.offset().top - $(window).scrollTop(),
			leftSelected 		 = 		image.offset().left,
			widthSelected 		 = 		image.width(),
			heightSelected		 = 		image.height(),
			finalLeft			 = 		(finalWidth)/2,
			finalHeight			 = 		finalWidth*heightSelected/widthSelected,
			finalTop			 = 		(windowHeight - finalHeight)/2,
			closingScale		=		3;		// scale factor for closing animation
		
		
		if(Modernizr.mq('screen and (max-width: 40rem)')) {	// mobile 
//			resizeProjectOpen();
			projectOpenLeftNew =  ($(window).width())/8;
			projectOpenTopNew = ($(window).height())/8;
			projectOpenWidthNew = ($(window).width()*0.8 < $projectOpenWidth) 
							? $(window).width()*0.8 
							: $projectOpenWidth;
		}

		if(animationType == 'open') {
			parentProjectItem.addClass('project-empty');		// add empty placeholder
			$(''+tempId+'').css({							 	// set project dimensions
				'opacity' : 1,
			    'top': topSelected + 'px',
			    'left': leftSelected + 'px',
			    'width': widthSelected + 'px',
			}).velocity({										// animate project-left
			    'top': finalTop + 'px',
			    'left': finalLeft +'px',
			    'width': finalWidth +'px',
			}, 900, [400, 20], function(){					
				$(''+tempId+'').addClass('open-animate').velocity({ 
					//'top': projectOpenTopNew + 'px',
					'left': projectOpenLeftNew + 'px',
			    	'width': projectOpenWidthNew + 'px',
				}, 300, 'ease-in' ,function(){					// we must go deeper...
					$(''+tempId+'').addClass('add-info');		// project-right content, also animated
					//$('.project-label').addClass('is-hidden'); 		
				});
			}).addClass('is-visible');
		} else if(animationType == 'close') {		// tempId is not needed
			$projectOpen.removeClass('add-info').velocity({
			    'top': finalTop + 'px',
			    'left': finalLeft+'px',
			    'width': finalWidth + 'px',
			}, 300, 'ease-out', function() { 
				$projectOpen.removeClass('open-animate').velocity({
					'top': topSelected + 'px',
					'left': leftSelected + 'px',
					'width': widthSelected/closingScale + 'px',
					'opacity' : 0,
				}, 300, 'linear', function(){	
					$projectOpen.removeClass('is-visible');
						parentProjectItem.removeClass('project-empty');
				});	
			});
			$body.removeClass('overlay-layer');
			//$('.project-label').removeClass('is-hidden');		
		}
	}
	
	// ================================================================================================================
	//  on scroll css translation
	//
	//  NOTES:
	// // window position is set with globalLib.ON_LOAD_HEIGHT
	// ================================================================================================================	
	
	/*
	 * @description 						checks if .onScroll-animate is between window top and bottom; <br>
	 *										if yes, then add addClass('in-view') to start CSS translate
	 *
	 * @method onScrollCheck
	 *
	 */
	function onScrollCheck() {
		var windowTop = $(window).scrollTop(),	
			windowBottom = windowTop + $(window).height(),	
			elementPadding = 70;
				// var windowBottom = windowTop + globalLib.ON_LOAD_HEIGHT;

		$.each($onScrollAnimate, function() {
			var $this = $(this),
				thisHeight = $this.outerHeight(),
				thisTop = $this.offset().top,
				thisBottom = thisTop + thisHeight;
		 
		 	// between window top and and bottom
			if (thisBottom - elementPadding >= windowTop && 
				thisTop + elementPadding <= windowBottom) {
				$this.addClass('in-view');
			} /*else {
				$this.removeClass('in-view');
			}*/
		});
	}
	// invoke and trigger
	$(window).on('scroll resize reload', onScrollCheck);
	$(window).trigger('scroll');
	//$(window).on('resize', onScrollCheck).trigger('scroll');
	
	
	// ================================================================================================================
	//  $(window).resize() common
	//
	// ================================================================================================================	

	$(window).on('resize reload', function(){
			requestAnimationFrame(resizeProjectOpen);
			//$(window).trigger('scroll');
	});
	resizeProjectOpen();


	/**
	 * @description 								changes the 'top', 'left' and 'width' css values of $projectOpen; <br>
	 *												invoked on window.resize()
	 * @method resizeProjectOpen
	 * 
	 */
	function resizeProjectOpen() {
		projectOpenLeftNew = ($(window).width() - $projectOpen.width())/2;
		projectOpenTopNew = ($(window).height() - $projectOpen.height())/2;
		projectOpenWidthNew = ($(window).width()*0.8 < $projectOpenWidth) 
							? $(window).width()*0.8 
							: $projectOpenWidth;
		
		if(Modernizr.mq('screen and (max-width: 40rem)')) {	// mobile 
			projectOpenLeftNew =  $(window).width()/8;
			projectOpenTopNew = $(window).height()/8;  
		}
						
		$projectOpen.css({
		    'top': projectOpenTopNew +'px',
		    'left': projectOpenLeftNew +'px',
			'width': projectOpenWidthNew +'px'
		});
	} 
	
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