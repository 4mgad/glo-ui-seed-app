'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

	devtool: 'inline-source-map',

	entry: [
		'webpack-hot-middleware/client?reload=true',
		path.join(__dirname, 'main.jsx')
	],

	output: {
		path: path.join(__dirname, 'dist/'),
		filename: 'glo-ui-seed-app.min.js',
		publicPath: '/'
	},

	resolve: {
		extensions: ['.js', '.jsx']
	},

	resolveLoader: {
		modules: ['node_modules'],
	},

	module: {
		rules: [{
			test: /\.s?css$/,
			loader: 'style-loader!css-loader?sourceMap!postcss-loader?sourceMap!sass-loader?sourceMap'
		}, {
			test: /\.(jpe?g|png|gif|svg|ico)$/,
			loader: 'url-loader?name=images/[name].[ext]'
		}, {
			test: /\.jsx$/,
			loader: 'babel-loader'
		}]
	},

	plugins: [
		new webpack.NormalModuleReplacementPlugin(
			/glo\/styles\.css$/,
			'glo/styles.scss'
		),
		new webpack.NormalModuleReplacementPlugin(
			/glo$/,
			'glo/index.jsx'
		),
		new HtmlWebpackPlugin({
			template: 'index.ejs',
			inject: 'body',
			filename: 'index.html',
			buildDate: new Date().toUTCString()
		}),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
		})
	]

};
