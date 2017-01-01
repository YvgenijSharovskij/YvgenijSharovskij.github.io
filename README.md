# YvgenijSharovskij.github.io
main page


<h3>This web site uses:</h3>
- numerous workflows are available these days, with various package managers, module loaders, bundlers, 
            	 task runners and scaffolding tools; since this is a placeholder web site, it is compatible with 
                 several workflows: the nested dependency tree Node JS package manager, <a href="https://www.npmjs.com">NPM</a>,
                 <a href="https://bower.io">Bower</a>, which is based on a flat dependency tree, 
                 <a href="http://gruntjs.com">Grunt</a>, and <a href="https://webpack.github.io">Webpack</a>
                 
- Eric Meyer's <a href="http://meyerweb.com/eric/tools/css/reset">reset.css</a>

- <a href="https://html5boilerplate.com">HTML5 Boilerplate</a>

- SASS with <a href="http://compass-style.org">Compass</a> and <a href="http://bourbon.io">Bourbon</a>
- <a href="http://susy.oddbird.net">Susy grid</a> 
                 with <a href="http://breakpoint-sass.com">Breakpoints</a>
- <a href="https://github.com/jsdoc3/jsdoc">JsDoc</a> for JavaDoc-style JavaScript comments, 
            	 saved in the /js/doc folder; also see the non-minified scss- and js-files for detailed comments
      
      
 <h3>Graphics:</h3>
- as the Google's WebP image format is used 
            	 (based on the <a href="https://modernizr.com">Modernizr's</a> .webp class),
                 "AddType image/webp .webp" may need to be added to the server config-file
                 
- lossless PNG images were converted to the WebP format using the 
            	  <a href="https://www.npmjs.com/package/imagemin-webp">imagemin</a> <a href="https://nodejs.org">Node.js</a> 
                  plug-in; see the webp.js file in the root folder
                  
- SVG graphics were made in Adobe Illustrator and 
        	 	 compressed using <a href="http://petercollingridge.appspot.com/svg-optimiser">Peter Collingridge's optimiser</a>   
             
- non-SVG graphics were edited in Adobe PhotoShop; edited screenshots of Android Studio, 
        	 	 MS Excel, Adobe Dreamweaver, MS SQL Server Enterprise, Ubuntu command prompt and RStudio were used (fair use)
             
- an inline SVG sprite is used to allow re-use of the navigation icons and SVG CSS styles, as well as
                 to avoid additional HTTP/1 requests (HTTP/2 supports binary frames multiplexing through a single 
                 TCP connection)
                 
- two types of SVG fallbacks are utilised:
- for the navigation icons, a no-JavaScript HTML fallback using the <code class="html-style">&lt;image&gt;</code> tag
- for other graphics, a CSS background image to text fallback


<h3>Mobile design:</h3>
- even though pure-CSS3 mobile menus with <code class="css-value">flexbox</code> are becoming more common, they impose 
        	 	 multiple problems with regard to cross-browser compatibility; for 
             	 example <code class="css-selector">:target</code> can 
             	 be used, but it causes problems with, among other things, browser history; 
             	 <code class="css-selector">:checked</code> can be used as a workaround but, again, with 
             	 several <a href="http://caniuse.com/#search=%3Achecked">other issues</a>
               
- this website uses a simple off-canvas mobile menu, with separate off-canvas and on-canvas 
        	 	 Susy grids and translations
             
- note that applying a fixed position to a translated off-canvas menu does not give expected results,
             	 as defined by the <a href="https://www.w3.org/TR/css-transforms-1/#transform-rendering">transform property</a> itself;
             	 instead, a fixed wrapper for the off-canvas menu was used</li>
        	<li> in some browsers (notably IE) a transform on a fixed wrapper creates an
       		 	 extra 1 px margin of the element as it is translated; to fix this and prevent flickering,
             	 <code class="css-property">backface-visibility:</code> <code class="css-value">hidden</code> was applied on the translated elements
               
- as <code class="css-property">backface-visibility:</code> <code class="css-value">hidden</code>
        	 	 can cause fonts to appear thinner than usual, anti-aliased 
             	 fonts was used, c.f. _mixins.scss

      
<h3>Cross-browser support:</h3>
- IE is the bottleneck and support goes back to IE 9, which has relatively
        	 	 low <a href="http://caniuse.com/usage-table">user statistics</a>, by using 
             	 e.g. translate 2D instead of 3D; using 
                 <a href="https://github.com/julianshapiro/velocity">Velocity.js</a>, as in archive.html,
                 would be an improvement
                 
- another performance improvement would be to set a threshold timer
                 on function calls in order to either prevent repeated function calls within a short 
                 time-interval (a.k.a. throttling) or to wait for the last function invocation until running
                 it (a.k.a. debouncing); throttling and debouncing are handled differently across the common browsers
                 and even OSs; <a href="http://underscorejs.org/">Underscore.js</a> provides ready-made
                 throttling, debouncing and other useful functions
                 
- for simplicity and future development, a 
        	 	 popular <a href="https://cdn.polyfill.io/v2/polyfill.min.js polyfill">JavaScript polyfill</a> is loaded 
        	 	 from a CDN; however, the only polyfill used is 
             	 the <a href="https://gist.github.com/paulirish/1579671">request/cancel AnimationFrame polyfill</a> 
             	 for <code class="css-property">setTimeout()</code> and <code class="css-property">clearTimeout()</code>
            	 by Erik Möller, Paul Irish and Tino Zijdel, 
            	 which is included as comments in the non-minified main.js file
               
- instead of using HTML comments such as <code class="code-comment">[if lte IE 8]</code>,
        	 	 a <a href="http://www.browser-update.org">browser updater</a> based on pure-JavaScript is employed
      
