// conditional loading of the media query polyfill respond.min.js (https://github.com/scottjehl/Respond) 
// based on the Modernizr (https://github.com/Modernizr/Modernizr) YepNope.js test:
Modernizr.load({
	test: Modernizr.mq('only all'),
	nope: [ 'js/respond.min.js' ]
});

/*
Modernizr.load("stylesheet/style.css", [
  {
    test : Modernizr.touch,
    yep : [ 'javascript/touchscroll.js', 'javascript/ipad-scroll.js', 'javascript/mobile.js' ],
    load : [ 'javascript/ipad-default.js' ] // No need to specify this in 'yep' too
  }]);*/