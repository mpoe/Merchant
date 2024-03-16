// @ts-nocheck
var path = require('path');
const fs = require('fs'); // to check if the file exists
const { DefinePlugin } = require('webpack');

var DIST_DIR = path.resolve(__dirname, '../dist');
var SRC_DIR = path.resolve(__dirname, 'src');
var ASSETS_DIR = path.resolve(__dirname, 'assets');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
	// Check if the file exists, otherwise fall back to the production .env
	const currentPath = path.join(__dirname);
	const basePath = currentPath + '/.env';
	const envPath = basePath + '.' + env.ENVIRONMENT;
	const finalPath = fs.existsSync(envPath) ? envPath : basePath;

	const fileEnv = require('dotenv').config({ path: finalPath }).parsed;
	return {
		entry: SRC_DIR + '/app',
		output: {
			path: DIST_DIR,
			filename: 'bundle.js',
			publicPath: '/',
			clean: true,
		},
		module: {
			rules: [
				{
					test: /\.(js|jsx)$/,
					exclude: /node_modules/,
					loader: 'babel-loader'
				},
				{
					test: /\.tsx?$/,
					use: 'ts-loader',
					exclude: /node_modules/,
				},
				{
					test: /\.(png|svg|jpg|gif)$/,
					use: [
						'file-loader'
					]
				},
				{
					test: /\.css$/,
					use: ['style-loader', 'css-loader'],
				},
				{
					test: /\.(ogg|mp4|wav|mpe?g)$/i,
					use: 'file-loader'
				},
				{
					test: /\.scss$/,
					use: [
						"style-loader", // creates style nodes from JS strings
						"css-loader", // translates CSS into CommonJS
						"sass-loader" // compiles Sass to CSS, using Node Sass by default
					]
				}
			]
		},
		resolve: {
			alias: {
				'assets': ASSETS_DIR,
			},
			extensions: ['.tsx', '.ts', '.js', '.json']
		},
		mode: 'development',
		devServer: {
			static: DIST_DIR,
			historyApiFallback: true,
			compress: true,
			port: 9000
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: 'src/index.html'
			}),
			new DefinePlugin(fileEnv),
		]
	};
};
