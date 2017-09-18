'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {

	entry: path.join(__dirname, 'main.jsx'),

	output: {
		path: path.join(__dirname, 'dist/'),
		filename: 'glo-ui-seed-app.min.js',
		publicPath: './'
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
			loader: ExtractTextPlugin.extract('css-loader!postcss-loader!sass-loader')
		}, {
			test: /\.(jpe?g|png|gif|svg|ico)$/,
			loader: 'file-loader?name=images/[name].[ext]'
		}, {
			test: /\.jsx$/,
			loader: 'babel-loader'
		}]
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: 'index.ejs',
			inject: 'body',
			filename: 'index.html',
			buildDate: new Date().toUTCString()
		}),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new ExtractTextPlugin('glo-ui-seed-app.min.css'),
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				warnings: false,
				screw_ie8: true
			}
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
		}),
		new CopyWebpackPlugin([
			{from: './images', to: './images'}
		])
	]

};
