const webpack = require('webpack');
const path = require('path');

var ExtractTextPlugin = require("extract-text-webpack-plugin");
var BundleTracker = require('webpack-bundle-tracker');

module.exports = {
	entry: {
		'app': path.join(__dirname, 'src', 'app-client.js'),
		'page': path.join(__dirname, 'landspace_web', 'landspace_web', 'index.js')
	},
	output: {
		path: path.join(__dirname, 'landspace_web', 'static', 'bundles', 'js'),
		filename: '[name].js'
	},
	module: {
		loaders: [
			{ test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
			{ test: /\.(woff|woff2|eot|ttf)(\?.*$|$)/, exclude: /node_modules/, loader: 'url-loader?importLoaders=1&limit=100000&name=../fonts/[hash].[ext]' },
			{ test: /\.(png|jpe|jpg|svg)(\?.*$|$)/, exclude: /node_modules/, loader: 'url-loader?importLoaders=1&limit=100000&name=../img/[hash].[ext]' },
			{ test: /\.js$/, exclude: /(node_modules|static)/, loader: 'babel-loader?presets[]=es2015&presets[]=react' }
		]
	},
	plugins: [
		new BundleTracker({filename: './landspace_web/static/webpack-stats.json'}),
		// relative to js source directory
		new ExtractTextPlugin("../../../static/css/style.css"),
		new webpack.DefinePlugin({
		  'process.env': {
		    NODE_ENV: JSON.stringify('production')
		  }
		}),
		new webpack.optimize.CommonsChunkPlugin("init.js"),
		new webpack.optimize.DedupePlugin(),
 		new webpack.optimize.OccurenceOrderPlugin(),
 		new webpack.optimize.UglifyJsPlugin()
	]
};

// module.exports = {
// 	entry: path.join(__dirname, 'src', 'app-client.js'),
// 	resolve: {
// 		modulesDirectories: ['node_modules', 'shared', 'Ink-3.1.10'],
// 		extensions: ['', '.js', '.jsx', '.css']
// 	},
// 	output: {
// 		path: path.join(__dirname, 'src', 'static', 'js'),
// 		filename: 'bundle.js'
// 	},
// 	module: {
// 		loaders: [{
// 			test: path.join(__dirname, 'src'),
// 			loader: ['babel-loader'],
// 			query: {
// 				cacheDirectory: 'babel_cache',
// 				presets: ['react', 'es2015']
// 			}
// 		},
// 		{ 
// 			test: /\.css$/,
// 			loader: ExtractTextPlugin.extract({
//     	 		fallbackLoader: "style-loader",
//          		loader: "style-loader"
//          	})
//          }
//          ]
// 	},
// 	plugins: [
// 		new ExtractTextPlugin("styles.css"),
// 		new webpack.DefinePlugin({
// 			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
// 		}),
// 		new webpack.optimize.DedupePlugin(),
// 		new webpack.optimize.OccurenceOrderPlugin(),
// 		new webpack.optimize.UglifyJsPlugin({
// 			compress: { warnings: false },
// 			mangle: true,
// 			sourcemap: false,
// 			beautify: false,
// 			dead_code: true
// 		})
// 	]
// };


