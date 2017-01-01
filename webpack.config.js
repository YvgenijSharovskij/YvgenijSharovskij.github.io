var path = require('path');
// var ExtractTextPlugin = require('extract-text-webpack-plugin');

//function getEntrySources(sources) {
//    if (process.env.NODE_ENV !== 'production') {
//        sources.push('webpack-dev-server/client?http://localhost:7080/GitHub%20page/v9-7-5/index.html');
//    }
//
//    return sources;
//}

module.exports = {
//	devServer: {
//    	inline:true,
//    	port: 7080
//  	},
	
    entry: {
//        index: getEntrySources([
           index:  "./js/entry.js"
//        ])
    },
    output: {
        //path: "./js/",
		path: path.resolve(__dirname, "./js/"),
        filename: "bundle.js"
    },
    module: {
        loaders: [
//			 { test: /\.scss$/, loaders: ["style-loader", "css-loader", "sass-loader", ExtractTextPlugin.extract('css!sass')]},
//        	 { test: /\.css$/, loader: "style-loader!css-loader" },
//        	{ test: /\.(jpe?g|png|webp|svg)$/i, loader: "url-loader" },
//			{ test: /\.scss$/, loader: ExtractTextPlugin.extract('css!sass')}
//			{ test: /\.scss$/, loaders: [ 
//				"style-loader", 
//				"css-loader", 
//				"sass-loader",
//				// "css!sass?includePaths[]=./node_modules/compass-mixins/lib",
//				ExtractTextPlugin.extract('css!sass')
//				]
//			},
//            { test: /\.(jpe?g|png)$/i, loaders: [ 'file',  'webp' ] }

			
			
        ]
    }
//    plugins: [
//        new ExtractTextPlugin('stylesheets/style.css', {
//            allChunks: true
//        })
//    ]
};