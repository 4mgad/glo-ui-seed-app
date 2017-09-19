/* eslint no-console: 0 */

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const devConfig = require('./webpack.config.dev.js');

const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 4000;
const app = express();

if (isProduction) {
	app.use(express.static(__dirname + '/dist'));
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, 'dist/index.html'));
	});
} else {
	const compiler = webpack(devConfig);
	const middleware = webpackMiddleware(compiler);
	app.use(middleware);
	app.use(webpackHotMiddleware(compiler));
	app.use(express.static(__dirname));
	app.get('*', (req, res) => {
		res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
		res.end();
	});
}

app.listen(port, '0.0.0.0', (err) => {
	if (err) {
		console.log(err);
	}
	console.info('==> Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
