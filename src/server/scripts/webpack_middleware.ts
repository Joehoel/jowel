import { Application } from "express";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";

import CONFIG, { Mode } from "./config";

const webpackConfig = require("/webpack.config.js");

/**
 * Setup webpack middleware for the given express application. It only adds the middleware when running in development mode, in which case it also finalizes the webpack config.
 *
 * @param app Express application for adding the middleware to
 */
export function setupWebpackMiddleware(app: Application) {
	if (CONFIG.MODE !== Mode.Development) return;

	console.info(`Using webpack middleware for development server`);

	for (const entryPoint in webpackConfig.entry) {
		webpackConfig.entry[entryPoint].unshift(
			"webpack-hot-middleware/client?reload=true&timeout=1000"
		);
	}

	webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

	const compiler = webpack(webpackConfig);

	app.use(
		webpackDevMiddleware(compiler, {
			publicPath: webpackConfig.output.publicPath,
			writeToDisk: true,
		})
	);

	app.use(webpackHotMiddleware(compiler));
}
